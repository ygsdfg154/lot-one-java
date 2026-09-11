// 作用域分析：找出「自由标识符」——即没有被任何外层声明绑定的引用。
// 压缩器会把 e/t/n/a 这类字母同时用作模块参数和内层局部变量，
// 不做作用域分析就会把内层的同名局部变量误判成悬空引用。
const FN = /^(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/;

function patternNames(node, out) {
  if (!node) return;
  switch (node.type) {
    case 'Identifier': out.push(node.name); break;
    case 'ObjectPattern': for (const p of node.properties) patternNames(p.value || p.argument, out); break;
    case 'ArrayPattern': for (const e of node.elements) patternNames(e, out); break;
    case 'AssignmentPattern': patternNames(node.left, out); break;
    case 'RestElement': patternNames(node.argument, out); break;
    default: break;
  }
}

// 收集某个函数体内被提升的 var / function 声明（不进入嵌套函数）
function hoistedVars(body, out) {
  const visit = (n) => {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) { n.forEach(visit); return; }
    if (FN.test(n.type)) {
      if (n.type === 'FunctionDeclaration' && n.id) out.push(n.id.name);
      return;                                   // 不进入嵌套函数
    }
    if (n.type === 'VariableDeclaration' && n.kind === 'var') {
      for (const d of n.declarations) patternNames(d.id, out);
    }
    if (n.type === 'ClassDeclaration' && n.id) out.push(n.id.name);
    for (const k of Object.keys(n)) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      visit(n[k]);
    }
  };
  visit(body);
}

// 块级声明（let / const / class / 块内函数声明）
function blockDecls(stmts, out) {
  for (const st of stmts || []) {
    if (st.type === 'VariableDeclaration' && st.kind !== 'var') {
      for (const d of st.declarations) patternNames(d.id, out);
    }
    if (st.type === 'FunctionDeclaration' && st.id) out.push(st.id.name);
    if (st.type === 'ClassDeclaration' && st.id) out.push(st.id.name);
  }
}

function collectFree(programAst) {
  const free = new Map();   // name -> {count, nodes:[]}
  const note = (n) => {
    if (!free.has(n.name)) free.set(n.name, { count: 0, nodes: [] });
    const e = free.get(n.name);
    e.count++;
    if (e.nodes.length < 3) e.nodes.push(n);
  };

  const mkScope = (parent) => ({ names: new Set(), parent });
  const bound = (scope, name) => {
    for (let s = scope; s; s = s.parent) if (s.names.has(name)) return true;
    return false;
  };

  // 模块作用域
  const root = mkScope(null);
  const rootNames = [];
  hoistedVars(programAst.body, rootNames);
  blockDecls(programAst.body, rootNames);
  for (const st of programAst.body) {
    if (st.type === 'ImportDeclaration') for (const sp of st.specifiers) rootNames.push(sp.local.name);
    if (st.type === 'ExportNamedDeclaration' && st.declaration) {
      if (st.declaration.type === 'VariableDeclaration') {
        for (const d of st.declaration.declarations) patternNames(d.id, rootNames);
      } else if (st.declaration.id) rootNames.push(st.declaration.id.name);
    }
  }
  rootNames.forEach((n) => root.names.add(n));

  const visit = (node, scope, parent, key) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach((x) => visit(x, scope, parent, key)); return; }

    if (FN.test(node.type)) {
      const s = mkScope(scope);
      const names = [];
      (node.params || []).forEach((p) => patternNames(p, names));
      if (node.type === 'FunctionExpression' && node.id) names.push(node.id.name);
      if (node.body && node.body.type === 'BlockStatement') {
        hoistedVars(node.body.body, names);
        blockDecls(node.body.body, names);
      }
      names.forEach((n) => s.names.add(n));
      // 参数默认值在新作用域里求值
      (node.params || []).forEach((p) => visit(p, s, node, 'params'));
      visit(node.body, s, node, 'body');
      return;
    }

    if (node.type === 'BlockStatement' && parent && !FN.test(parent.type)) {
      const s = mkScope(scope);
      const names = [];
      blockDecls(node.body, names);
      names.forEach((n) => s.names.add(n));
      node.body.forEach((x) => visit(x, s, node, 'body'));
      return;
    }

    if (node.type === 'CatchClause') {
      const s = mkScope(scope);
      const names = [];
      patternNames(node.param, names);
      blockDecls(node.body.body, names);
      names.forEach((n) => s.names.add(n));
      visit(node.body, s, node, 'body');
      return;
    }

    if (node.type === 'Identifier') {
      const isProp = parent && parent.type === 'MemberExpression' && key === 'property' && !parent.computed;
      const isKey = parent && parent.type === 'Property' && key === 'key' && !parent.computed;
      const isDecl = parent && /Declarator|FunctionDeclaration|ClassDeclaration/.test(parent.type) && key === 'id';
      const isLabel = parent && /Labeled|Break|Continue/.test(parent.type);
      const isSpecifier = parent && /Specifier/.test(parent.type);
      if (!isProp && !isKey && !isDecl && !isLabel && !isSpecifier && !bound(scope, node.name)) note(node);
      return;
    }

    for (const k of Object.keys(node)) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      visit(node[k], scope, node, k);
    }
  };

  programAst.body.forEach((st) => visit(st, root, programAst, 'body'));
  return free;
}

/**
 * 找出所有「确实解析到最外层那个绑定」的同名标识符节点。
 *
 * 压缩器会疯狂复用 e/t/n 这些字母：模块的 require 形参叫 n，某个内层函数的形参也叫 n。
 * 把 n(<字符串>) 一律当成模块引用去重写，就会把内层的普通函数调用改坏
 * —— regenerator-runtime 内部就有 `function n(n, r){...}` 且调用 `n("end")`。
 * 只有没被任何内层声明遮蔽的引用，才是真正的模块 require。
 */
function unshadowedRefs(rootFn, name) {
  const hits = new Set();
  const mkScope = (parent, names) => ({ names: new Set(names), parent });
  const shadowed = (scope) => {
    for (let s = scope; s; s = s.parent) if (s.names.has(name)) return s.__isRoot !== true;
    return false;
  };

  const rootNames = [];
  (rootFn.params || []).forEach((p) => patternNames(p, rootNames));
  if (rootFn.body && rootFn.body.type === 'BlockStatement') {
    hoistedVars(rootFn.body.body, rootNames);
    blockDecls(rootFn.body.body, rootNames);
  }
  const root = mkScope(null, rootNames);
  root.__isRoot = true;

  const visit = (node, scope, parent, key) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach((x) => visit(x, scope, parent, key)); return; }

    if (FN.test(node.type) && node !== rootFn) {
      const names = [];
      (node.params || []).forEach((p) => patternNames(p, names));
      if (node.type === 'FunctionExpression' && node.id) names.push(node.id.name);
      if (node.body && node.body.type === 'BlockStatement') {
        hoistedVars(node.body.body, names);
        blockDecls(node.body.body, names);
      }
      const s = mkScope(scope, names);
      (node.params || []).forEach((p) => visit(p, s, node, 'params'));
      visit(node.body, s, node, 'body');
      return;
    }
    if (node.type === 'BlockStatement' && parent && !FN.test(parent.type)) {
      const names = []; blockDecls(node.body, names);
      const s = mkScope(scope, names);
      node.body.forEach((x) => visit(x, s, node, 'body'));
      return;
    }
    if (node.type === 'CatchClause') {
      const names = []; patternNames(node.param, names); blockDecls(node.body.body, names);
      visit(node.body, mkScope(scope, names), node, 'body');
      return;
    }
    if (node.type === 'Identifier') {
      if (node.name === name && !shadowed(scope)) hits.add(node);
      return;
    }
    for (const k of Object.keys(node)) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      visit(node[k], scope, node, k);
    }
  };
  visit(rootFn.body, root, rootFn, 'body');
  return hits;
}

module.exports = { collectFree, unshadowedRefs };
