// 解析单个 webpack 模块函数：导出映射、顶层变量、require 依赖
const acorn = require('acorn');
const astring = require('astring');

function parse(src) {
  return acorn.parse('(' + src + ')', { ecmaVersion: 2022 }).body[0].expression;
}

function gen(n) { try { return astring.generate(n); } catch { return ''; } }

function parseModule(src) {
  const fn = parse(src);
  const [pModule, pExports, pRequire] = (fn.params || []).map((p) => p.name);
  const body = fn.body.body || [];
  const decls = {};        // 顶层 var 名 -> init 节点
  const exportsMap = {};   // 导出名 -> 本地变量名
  const requires = [];     // 依赖模块 id
  const assigns = {};      // t.default = X

  function scanRequires(node) {
    JSON.stringify(node, (k, v) => {
      if (v && v.type === 'CallExpression' && v.callee && v.callee.type === 'Identifier' &&
          v.callee.name === pRequire && v.arguments.length === 1 && v.arguments[0].type === 'Literal') {
        requires.push(String(v.arguments[0].value));
      }
      return v;
    });
  }
  scanRequires(fn);

  const walk = (stmts) => {
    for (const st of stmts) {
      if (st.type === 'VariableDeclaration') {
        for (const d of st.declarations) if (d.id.type === 'Identifier') decls[d.id.name] = d.init;
      } else if (st.type === 'ExpressionStatement') {
        const e = st.expression;
        const list = e.type === 'SequenceExpression' ? e.expressions : [e];
        for (const x of list) {
          // n.d(t,"b",function(){return a})
          if (x.type === 'CallExpression' && x.callee.type === 'MemberExpression' &&
              x.callee.object.name === pRequire && x.callee.property.name === 'd' &&
              x.arguments.length >= 3 && x.arguments[1].type === 'Literal') {
            const f = x.arguments[2];
            const r = f && f.body && (f.body.type === 'BlockStatement'
              ? (f.body.body[0] && f.body.body[0].argument)
              : f.body);
            if (r && r.type === 'Identifier') exportsMap[String(x.arguments[1].value)] = r.name;
          }
          // t.default = X   /  e.exports = {...}
          if (x.type === 'AssignmentExpression' && x.left.type === 'MemberExpression') {
            const o = x.left.object.name, p = x.left.property.name;
            if (o === pExports) assigns[p] = x.right;
            if (o === pModule && p === 'exports') assigns['module.exports'] = x.right;
          }
        }
      }
    }
  };
  walk(body);

  return { fn, params: { module: pModule, exports: pExports, require: pRequire },
           decls, exportsMap, requires: [...new Set(requires)], assigns, body, gen };
}

module.exports = { parseModule, parse, gen };
