// 扫描所有模块，抽取 HTTP 接口调用
const acorn = require('acorn');
const astring = require('astring');

const gen = (n) => { try { return astring.generate(n).replace(/\s+/g, ' '); } catch { return '?'; } };

// 把 "/v2/terminal/".concat(id) 之类还原成 /v2/terminal/{id}
function urlPattern(node) {
  if (!node) return null;
  if (node.type === 'Literal') return typeof node.value === 'string' ? node.value : null;
  if (node.type === 'TemplateLiteral') {
    let s = '';
    node.quasis.forEach((q, i) => {
      s += q.value.cooked;
      if (node.expressions[i]) s += '{' + gen(node.expressions[i]) + '}';
    });
    return s;
  }
  if (node.type === 'BinaryExpression' && node.operator === '+') {
    const l = urlPattern(node.left), r = urlPattern(node.right);
    if (l === null && r === null) return null;
    return (l === null ? '{' + gen(node.left) + '}' : l) + (r === null ? '{' + gen(node.right) + '}' : r);
  }
  // "x".concat(a, "y", b)
  if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' &&
      node.callee.property && node.callee.property.name === 'concat') {
    let s = urlPattern(node.callee.object);
    if (s === null) s = '{' + gen(node.callee.object) + '}';
    for (const a of node.arguments) {
      const p = urlPattern(a);
      s += p === null ? '{' + gen(a) + '}' : p;
    }
    return s;
  }
  return null;
}

function scan(src, meta) {
  const found = [];
  let ast;
  try { ast = acorn.parse('(' + src + ')', { ecmaVersion: 2022 }); } catch { return found; }

  (function walk(n, stack) {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) { n.forEach((x) => walk(x, stack)); return; }
    if (n.type === 'ObjectExpression') {
      const props = {};
      for (const p of n.properties) {
        if (p.type !== 'Property') continue;
        props[p.key.name || p.key.value] = p.value;
      }
      if (props.url) {
        const url = urlPattern(props.url);
        if (url && /^\/[\w{]/.test(url)) {
          const rec = {
            url,
            method: props.method && props.method.type === 'Literal' ? String(props.method.value).toUpperCase() : 'GET',
            ...meta,
          };
          if (props.data && props.data.type === 'ObjectExpression') {
            rec.data = props.data.properties.filter((p) => p.type === 'Property')
              .map((p) => (p.key.name || p.key.value) + ': ' + gen(p.value));
          } else if (props.data) rec.data = ['<' + gen(props.data) + '>'];
          if (props.loading) rec.loading = gen(props.loading) === '!0';
          if (props.header && props.header.type === 'ObjectExpression') {
            rec.header = props.header.properties.filter((p) => p.type === 'Property')
              .map((p) => (p.key.name || p.key.value) + ': ' + gen(p.value));
          }
          found.push(rec);
        }
      }
    }
    for (const k of Object.keys(n)) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      walk(n[k], stack);
    }
  })(ast, []);
  return found;
}

module.exports = { scan, urlPattern };
