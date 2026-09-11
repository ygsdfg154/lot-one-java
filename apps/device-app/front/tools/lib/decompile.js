// Vue2 render function -> <template> 反编译器
// 支持 uni-app v3 的 _$s(idx,key,value) 包装（自动解包取第 3 个参数）
const acorn = require('acorn');
const astring = require('astring');

const SELF_CLOSING = new Set([
  'img', 'input', 'br', 'hr', 'image', 'meta', 'link', 'source',
]);

class Decompiler {
  constructor(opts = {}) {
    this.ctx = null;       // 渲染上下文变量名 (var e = this)
    this.h = new Set();    // createElement 别名
    this.warnings = [];
    this.opts = opts;
  }

  // ---------- 入口 ----------
  decompile(fnSource) {
    let src = fnSource.trim();
    if (!/^function/.test(src) && !/^\(/.test(src)) src = 'function(){' + src + '}';
    let ast;
    try {
      ast = acorn.parse('(' + src + ')', { ecmaVersion: 2022 });
    } catch (e) {
      this.warnings.push('parse error: ' + e.message);
      return null;
    }
    const fn = ast.body[0].expression;
    this.scanCtx(fn);
    const ret = this.findReturn(fn.body);
    if (!ret) { this.warnings.push('no return statement'); return null; }
    const nodes = this.node(ret.argument);
    return this.render(nodes, 0);
  }

  scanCtx(fn) {
    // var e = this, t = e.$createElement, n = e._self._c || t
    const body = fn.body.body || [];
    for (const st of body) {
      if (st.type !== 'VariableDeclaration') continue;
      for (const d of st.declarations) {
        if (!d.init) continue;
        if (d.init.type === 'ThisExpression') this.ctx = d.id.name;
        const s = this.raw(d.init);
        if (/\$createElement|_self\._c/.test(s)) this.h.add(d.id.name);
      }
    }
    if (!this.ctx) this.ctx = 'this';
    this.h.add('_c');
  }

  findReturn(node) {
    if (!node) return null;
    if (node.type === 'ReturnStatement') return node;
    const kids = node.body || node.consequent || [];
    const arr = Array.isArray(kids) ? kids : [kids];
    for (const k of arr) {
      const r = this.findReturn(k);
      if (r) return r;
    }
    return null;
  }

  raw(n) { try { return astring.generate(n); } catch { return ''; } }

  // ---------- helper 识别 ----------
  // e._v(...) / _v(...)
  isCtxObj(n) {
    return !!n && ((n.type === 'Identifier' && n.name === this.ctx) || n.type === 'ThisExpression');
  }

  callee(node) {
    if (node.type !== 'CallExpression') return null;
    const c = node.callee;
    if (c.type === 'Identifier') return { name: c.name, isCtx: this.h.has(c.name) };
    if (c.type === 'MemberExpression' && !c.computed && this.isCtxObj(c.object)) {
      return { name: c.property.name, isCtx: true };
    }
    // 单根节点的简单组件会把 createElement 内联成 (this._self._c || e)(...)，没有具名变量
    if (c.type === 'LogicalExpression' && /_self\._c|\$createElement/.test(this.raw(c))) {
      return { name: '_c', isCtx: true };
    }
    return null;
  }

  unwrapS(node) {
    if (!node) return node;
    // e._$s(0,"sc",VALUE) -> VALUE
    // e._$g(0,"sc")       -> 从逻辑层 bindings 里取回对应的值（uni-v3 双端编译）
    const c = this.callee(node);
    if (c && c.name === '_$s' && node.arguments.length >= 3) return this.unwrapS(node.arguments[2]);
    if (c && c.name === '_$g') {
      const b = this.opts.bindings && this.opts.bindings.get(bindKey(node.arguments[0], node.arguments[1]));
      if (b) return this.unwrapS(b);
      return { type: 'Literal', value: null, __opaque: true };
    }
    return node;
  }

  // ---------- 节点 -> IR ----------
  // 返回 IR 数组
  node(n) {
    if (!n) return [];
    n = this.unwrapS(n);
    switch (n.type) {
      case 'ArrayExpression': {
        let out = [];
        for (const el of n.elements) {
          if (!el) continue;
          if (el.type === 'SpreadElement') out = out.concat(this.node(el.argument));
          else out = out.concat(this.node(el));
        }
        return out;
      }
      case 'ConditionalExpression': return this.cond(n);
      case 'LogicalExpression': {
        // a && b  -> v-if
        if (n.operator === '&&') {
          const kids = this.node(n.right);
          if (kids.length === 1 && kids[0].kind === 'el') {
            kids[0].vif = this.expr(n.left);
            return kids;
          }
        }
        return [{ kind: 'text', text: `{{ ${this.expr(n)} }}` }];
      }
      case 'CallExpression': return this.call(n);
      case 'Literal':
        if (n.__opaque || n.value == null || n.value === '') return [];
        return [{ kind: 'text', text: this.escapeText(String(n.value)) }];
      default:
        return [{ kind: 'text', text: `{{ ${this.expr(n)} }}` }];
    }
  }

  cond(n) {
    const test = this.expr(n.test);
    const yes = this.node(n.consequent);
    const no = this.node(n.alternate);
    const out = [];
    if (yes.length) {
      const first = yes[0];
      if (first.kind === 'el') first.vif = test;
      else out.push({ kind: 'el', tag: 'block', attrs: [{ n: 'v-if', v: test }], children: yes, virtual: true });
      if (first.kind === 'el') out.push(...yes);
    } else if (no.length) {
      // cond ? _e() : X   -> v-if="!cond"
      const first = no[0];
      if (first.kind === 'el') { first.vif = `!(${test})`; out.push(...no); return out; }
    }
    if (no.length && yes.length) {
      const f = no[0];
      if (f.kind === 'el') f.velse = true;
      else out.push({ kind: 'el', tag: 'block', attrs: [{ n: 'v-else', v: null }], children: no, virtual: true });
      if (f.kind === 'el') out.push(...no);
    }
    return out;
  }

  call(n) {
    const c = this.callee(n);
    const a = n.arguments;
    if (!c) return [{ kind: 'text', text: `{{ ${this.expr(n)} }}` }];

    if (c.isCtx && this.h.has(c.name)) return [this.element(n)];

    switch (c.name) {
      case '_c': return [this.element(n)];
      case '_v': { // 文本节点
        const t = this.textOf(a[0]);
        return t === '' ? [] : [{ kind: 'text', text: t }];
      }
      case '_e': return []; // 空节点
      case '_l': { // v-for
        const list = this.expr(a[0]);
        const fn = a[1];
        let params = [];
        if (fn && (fn.type === 'FunctionExpression' || fn.type === 'ArrowFunctionExpression')) {
          params = fn.params.map((p) => (p.name || this.raw(p)));
        }
        // uni-app v3 会多注入一个 __i 索引参数，去掉尾部纯数字索引参数
        const useful = params.filter((p) => !/^\$?(_|__)?i\d*$/.test(p) || params.indexOf(p) < 2);
        const alias = useful.length > 1 ? `(${useful.join(', ')})` : (useful[0] || 'item');
        const body = fn ? this.findReturn(fn.body) : null;
        const kids = body ? this.node(body.argument) : [];
        for (const k of kids) if (k.kind === 'el') k.vfor = `${alias} in ${list}`;
        if (kids.length === 1) return kids;
        return [{ kind: 'el', tag: 'block', attrs: [{ n: 'v-for', v: `${alias} in ${list}` }], children: kids, virtual: true }];
      }
      case '_t': { // slot
        const name = a[0] && a[0].type === 'Literal' ? a[0].value : null;
        const fallback = a[1] ? this.node(a[1]) : [];
        const attrs = [];
        if (name && name !== 'default') attrs.push({ n: 'name', v: name });
        if (a[2] && a[2].type === 'ObjectExpression') {
          for (const p of a[2].properties) {
            const k = this.key(p);
            if (k === '_i') continue;
            attrs.push({ n: ':' + k, v: this.expr(p.value) });
          }
        }
        return [{ kind: 'el', tag: 'slot', attrs, children: fallback }];
      }
      case '_m': // 静态渲染函数
        return [{ kind: 'text', text: `<!-- staticRenderFn[${this.raw(a[0])}] -->` }];
      case '_s':
        return [{ kind: 'text', text: `{{ ${this.expr(a[0])} }}` }];
      case '_u':
        return []; // scopedSlots 由 element() 处理
      default:
        return [{ kind: 'text', text: `{{ ${this.expr(n)} }}` }];
    }
  }

  textOf(n) {
    if (!n) return '';
    n = this.unwrapS(n);
    if (n.type === 'Literal') return n.__opaque ? '' : this.escapeText(String(n.value ?? ''));
    if (n.type === 'BinaryExpression' && n.operator === '+') {
      return this.textOf(n.left) + this.textOf(n.right);
    }
    const c = this.callee(n);
    if (c && c.name === '_s') return `{{ ${this.expr(n.arguments[0])} }}`;
    return `{{ ${this.expr(n)} }}`;
  }

  escapeText(s) { return s.replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // ---------- 元素 ----------
  element(n) {
    const a = n.arguments;
    let tag = 'div';
    if (a[0]) {
      const t0 = this.unwrapS(a[0]);
      tag = t0.type === 'Literal' ? String(t0.value) : `component :is="${this.expr(t0)}"`;
      // uni-app 的 nvue 编译器会把内置组件加上 u- 前缀（<text> -> u-text、<web-view> -> u-web-view）。
      // 判据：该标签没有出现在本组件的 components 注册表里，就说明是内置的，要把前缀去掉，
      // 否则 easycom 会把它错误地解析成 uView 的同名组件。
      const reg = this.opts.registered;
      if (reg && /^u-[a-z]/.test(tag)) {
        const camel = tag.replace(/-(\w)/g, (_, c) => c.toUpperCase());
        if (!reg.has(camel) && !reg.has(tag)) tag = tag.slice(2);
      }
    }
    let dataNode = null, childNode = null;
    if (a[1] && this.unwrapS(a[1]).type === 'ObjectExpression') { dataNode = this.unwrapS(a[1]); childNode = a[2]; }
    else if (a[1]) { childNode = a[1]; }

    const el = { kind: 'el', tag, attrs: [], children: [] };
    if (dataNode) this.data(dataNode, el);
    if (childNode) el.children = this.node(childNode);

    // 静态文本只存在于视图层（app-view.js），按节点索引 _i 回填
    const tt = this.opts.textTemplates;
    if (tt && el.i != null && tt.has(el.i)) {
      const parts = tt.get(el.i);
      let text = '';
      for (const p of parts) {
        if (p.lit != null) text += this.escapeText(p.lit);
        else {
          const b = this.opts.bindings && this.opts.bindings.get(el.i + '::' + p.key);
          text += b ? `{{ ${this.expr(b)} }}` : '';
        }
      }
      const rest = el.children.filter((c) => c.kind !== 'text');
      el.children = text.trim() ? [{ kind: 'text', text }, ...rest] : rest;
    }
    return el;
  }

  key(p) {
    if (p.key.type === 'Identifier') return p.key.name;
    if (p.key.type === 'Literal') return String(p.key.value);
    return this.raw(p.key);
  }

  data(obj, el) {
    for (const p of obj.properties) {
      if (p.type !== 'Property') continue;
      const k = this.key(p);
      const v = this.unwrapS(p.value);
      switch (k) {
        case 'key':        el.attrs.push({ n: ':key', v: this.expr(v) }); break;
        case 'ref':        el.attrs.push(v.type === 'Literal' ? { n: 'ref', v: String(v.value) } : { n: ':ref', v: this.expr(v) }); break;
        case 'refInFor':   break;
        case 'slot':       el.attrs.push({ n: 'slot', v: v.type === 'Literal' ? String(v.value) : this.expr(v) }); break;
        case 'tag': case 'appendAsTree': break;
        case 'staticClass': {
          const cls = this.classLiteral(v);
          if (cls) el.attrs.push({ n: 'class', v: cls });
          break;
        }
        case 'class':      if (!v.__opaque) el.attrs.push({ n: ':class', v: this.expr(v) }); break;
        case 'staticStyle': {
          const s = this.styleLiteral(v);
          if (s) el.attrs.push({ n: 'style', v: s });
          break;
        }
        case 'style':      if (!v.__opaque) el.attrs.push({ n: ':style', v: this.expr(v) }); break;
        case 'attrs': case 'props': case 'domProps':
          this.attrsObj(v, el, k === 'domProps' ? '.' : '');
          break;
        case 'on':        this.onObj(v, el, '@'); break;
        case 'nativeOn':  this.onObj(v, el, '@', '.native'); break;
        case 'directives': this.directives(v, el); break;
        case 'model':     this.model(v, el); break;
        case 'scopedSlots': el.scopedSlots = this.scopedSlots(v); break;
        default: break;
      }
    }
  }

  classLiteral(v) {
    if (v.__opaque) return null;
    if (v.type === 'Literal') return String(v.value);
    if (v.type === 'ArrayExpression') {
      const parts = v.elements.filter(Boolean).map((e) => (e.type === 'Literal' ? String(e.value) : null));
      if (parts.every((x) => x !== null)) return parts.join(' ');
    }
    return null;
  }

  styleLiteral(v) {
    if (v.type !== 'ObjectExpression') return null;
    const out = [];
    for (const p of v.properties) {
      if (p.type !== 'Property') continue;
      const k = this.key(p).replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
      const val = p.value;
      out.push(`${k}: ${val.type === 'Literal' ? val.value : this.expr(val)}`);
    }
    return out.join('; ');
  }

  attrsObj(v, el, prefix) {
    if (v.type !== 'ObjectExpression') return;
    for (const p of v.properties) {
      if (p.type !== 'Property') continue;
      const k = this.key(p);
      if (k === '_i') { el.i = normIdx(this.unwrapS(p.value)); continue; } // uni-app v3 注入的节点索引
      const val = this.unwrapS(p.value);
      if (val.__opaque) { el.attrs.push({ n: ':' + k, v: '/* view-layer only */' }); continue; }
      if (val.type === 'Literal') {
        if (val.value === '') el.attrs.push({ n: k, v: null });            // <tag foo>
        else if (typeof val.value === 'string') el.attrs.push({ n: k, v: val.value });
        else el.attrs.push({ n: ':' + k, v: String(val.value) });          // :foo="true|1|null"
      } else if (val.type === 'UnaryExpression' && val.operator === '!' &&
                 val.argument.type === 'Literal' && (val.argument.value === 0 || val.argument.value === 1)) {
        el.attrs.push({ n: ':' + k, v: val.argument.value === 0 ? 'true' : 'false' });
      } else {
        el.attrs.push({ n: (prefix === '.' ? '.' : ':') + k, v: this.expr(val) });
      }
    }
  }

  onObj(v, el, sigil, suffix = '') {
    if (v.type !== 'ObjectExpression') return;
    for (const p of v.properties) {
      if (p.type !== 'Property') continue;
      const ev = this.key(p);
      const handlers = p.value.type === 'ArrayExpression' ? p.value.elements : [p.value];
      for (const hRaw of handlers) {
        if (!hRaw) continue;
        el.attrs.push({ n: sigil + ev + suffix, v: this.handler(hRaw) });
      }
    }
  }

  handler(h) {
    if (h.type === 'Identifier' || h.type === 'MemberExpression') return this.expr(h);
    if (h.type === 'FunctionExpression' || h.type === 'ArrowFunctionExpression') {
      const body = h.body;
      const stmts = body.type === 'BlockStatement' ? body.body : [{ type: 'ExpressionStatement', expression: body }];
      // 过滤掉编译器注入的事件转发
      const parts = [];
      for (const st of stmts) {
        if (st.type === 'ReturnStatement' && st.argument) parts.push(this.expr(st.argument));
        else if (st.type === 'ExpressionStatement') parts.push(this.expr(st.expression));
        else parts.push('/* ' + this.raw(st).replace(/\s+/g, ' ') + ' */');
      }
      let out = parts.join('; ');
      // e.$handleViewEvent(e) 之类的视图层桩
      if (/^\$handle(View)?Event/.test(out)) return out;
      return out;
    }
    return this.expr(h);
  }

  directives(v, el) {
    if (v.type !== 'ArrayExpression') return;
    for (const d of v.elements) {
      if (!d || d.type !== 'ObjectExpression') continue;
      let name = '', expression = null, value = null, arg = null, modifiers = [];
      for (const p of d.properties) {
        const k = this.key(p);
        if (k === 'name') name = p.value.value;
        else if (k === 'rawName') name = String(p.value.value).replace(/^v-/, '').split(/[:.]/)[0];
        else if (k === 'expression') expression = p.value.value;
        else if (k === 'value') value = p.value;
        else if (k === 'arg') arg = p.value.value;
        else if (k === 'modifiers' && p.value.type === 'ObjectExpression') {
          modifiers = p.value.properties.map((x) => this.key(x));
        }
      }
      const dn = 'v-' + name + (arg ? ':' + arg : '') + modifiers.map((m) => '.' + m).join('');
      el.attrs.push({ n: dn, v: expression != null ? expression : (value ? this.expr(value) : null) });
    }
  }

  model(v, el) {
    if (v.type !== 'ObjectExpression') return;
    let expression = null, value = null;
    for (const p of v.properties) {
      const k = this.key(p);
      if (k === 'expression') expression = p.value.value;
      if (k === 'value') value = p.value;
    }
    el.attrs.push({ n: 'v-model', v: expression != null ? expression : (value ? this.expr(value) : '') });
  }

  scopedSlots(v) {
    // _u([{key:"xxx", fn:function(props){return [...]}, proxy:true}])
    const out = [];
    const c = this.callee(v);
    let arr = null;
    if (c && c.name === '_u') arr = v.arguments[0];
    else if (v.type === 'ArrayExpression') arr = v;
    if (!arr || arr.type !== 'ArrayExpression') return out;
    for (const o of arr.elements) {
      if (!o || o.type !== 'ObjectExpression') continue;
      let name = 'default', fn = null;
      for (const p of o.properties) {
        const k = this.key(p);
        if (k === 'key') name = p.value.value;
        if (k === 'fn') fn = p.value;
      }
      if (!fn) continue;
      const params = (fn.params || []).map((p) => p.name || this.raw(p));
      const ret = this.findReturn(fn.body);
      const kids = ret ? this.node(ret.argument) : [];
      out.push({ name, scope: params[0] || null, children: kids });
    }
    return out;
  }

  // ---------- 表达式 ----------
  expr(n) {
    if (!n) return '';
    n = this.unwrapS(n);
    const cloned = this.strip(JSON.parse(JSON.stringify(n)));
    try { return astring.generate(cloned).replace(/\s+/g, ' ').trim(); }
    catch { return this.raw(n); }
  }

  // 去掉渲染上下文前缀: e.foo -> foo ; e._s(x) -> x ; e._f("k")(x) -> (x | k)
  strip(node) {
    const ctx = this.ctx;
    const bindings = this.opts.bindings;
    const isCtxObj = (x) => !!x && ((x.type === 'Identifier' && x.name === ctx) || x.type === 'ThisExpression');
    function walk(n, parent, key) {
      if (!n || typeof n !== 'object') return n;
      if (Array.isArray(n)) return n.map((x) => walk(x, parent, key));
      // e._$s(i,k,v) -> v
      if (n.type === 'CallExpression' && n.callee && n.callee.type === 'MemberExpression' &&
          isCtxObj(n.callee.object) &&
          n.callee.property && (n.callee.property.name === '_$s' || n.callee.property.name === '_$g')) {
        if (n.arguments[2]) return walk(n.arguments[2]);
        const b = bindings && bindings.get(bindKey(n.arguments[0], n.arguments[1]));
        if (b) return walk(JSON.parse(JSON.stringify(b)));
        return { type: 'Identifier', name: 'undefined' };
      }
      // e._s(x) -> x, e._n(x) -> x
      if (n.type === 'CallExpression' && n.callee && n.callee.type === 'MemberExpression' &&
          isCtxObj(n.callee.object) &&
          ['_s', '_n'].includes(n.callee.property && n.callee.property.name)) {
        return walk(n.arguments[0]);
      }
      for (const k of Object.keys(n)) {
        if (k === 'type' || k === 'start' || k === 'end') continue;
        n[k] = walk(n[k], n, k);
      }
      // e.foo -> foo
      if (n.type === 'MemberExpression' && !n.computed && isCtxObj(n.object)) {
        return { type: 'Identifier', name: n.property.name };
      }
      if (n.type === 'ThisExpression') return { type: 'Identifier', name: '$data' };
      // !0 / !1 -> true / false
      if (n.type === 'UnaryExpression' && n.operator === '!' && n.argument.type === 'Literal' &&
          (n.argument.value === 0 || n.argument.value === 1)) {
        return { type: 'Literal', value: n.argument.value === 0, raw: n.argument.value === 0 ? 'true' : 'false' };
      }
      // 字符串字面量统一用单引号，避免模板属性里出现 &quot;；同时还原 \uXXXX 转义
      if (n.type === 'Literal' && typeof n.value === 'string') {
        n.raw = "'" + n.value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
      }
      return n;
    }
    return walk(node);
  }

  // ---------- 输出 ----------
  render(nodes, indent) {
    const pad = '  '.repeat(indent);
    const out = [];
    for (const nd of nodes) {
      if (!nd) continue;
      if (nd.kind === 'text') {
        if (String(nd.text).trim()) out.push(pad + nd.text);
        continue;
      }
      out.push(this.renderEl(nd, indent));
    }
    return out.join('\n');
  }

  renderEl(el, indent) {
    const pad = '  '.repeat(indent);
    const attrs = [];
    if (el.vfor) attrs.push(`v-for="${el.vfor}"`);
    if (el.vif) attrs.push(`v-if="${this.attrEsc(el.vif)}"`);
    if (el.velse) attrs.push('v-else');
    // 同一个属性名只能出现一次。渲染函数里 slot 会同时挂在 data.slot 和 data.attrs.slot，
    // v-on 的多个处理函数也会展开成同名属性 —— 都要去重，否则模板编译器报 duplicate attribute。
    const seenAttr = new Set();
    for (const a of el.attrs || []) {
      if (seenAttr.has(a.n)) continue;
      seenAttr.add(a.n);
      if (a.v === null || a.v === undefined) attrs.push(a.n);
      else attrs.push(`${a.n}="${this.attrEsc(a.v)}"`);
    }
    const tag = el.tag;
    let head = `<${tag}`;
    if (attrs.length) {
      const oneLine = attrs.join(' ');
      if (oneLine.length + pad.length + tag.length < 100) head += ' ' + oneLine;
      else head += '\n' + attrs.map((x) => pad + '  ' + x).join('\n') + '\n' + pad;
    }
    const kids = [];
    for (const s of el.scopedSlots || []) {
      const tpl = { kind: 'el', tag: 'template', attrs: [{ n: `v-slot:${s.name}`, v: s.scope || null }], children: s.children };
      kids.push(tpl);
    }
    const allKids = kids.concat(el.children || []);
    if (!allKids.length) {
      if (SELF_CLOSING.has(tag)) return pad + head + ' />';
      return pad + head + `></${tag}>`;
    }
    const body = this.render(allKids, indent + 1);
    return pad + head + '>\n' + body + '\n' + pad + `</${tag}>`;
  }

  attrEsc(s) { return String(s).replace(/"/g, '&quot;'); }
}

// 节点索引可能是 "1-"+r 这类动态表达式，两次编译的局部变量名未必一致，做归一化
function normIdx(node) {
  if (!node) return '?';
  if (node.type === 'Literal') return String(node.value);
  try {
    const s = astring.generate(node);
    return s.replace(/\b[A-Za-z_$][\w$]*\b/g, '#');
  } catch { return '?'; }
}
function bindKey(idxNode, keyNode) {
  const k = keyNode && keyNode.type === 'Literal' ? String(keyNode.value) : '?';
  return normIdx(idxNode) + '::' + k;
}

// 从逻辑层(app-service) 的 render function 里收集所有 _$s(idx, key, value)
function collectBindings(src) {
  const map = new Map();
  let ast;
  try { ast = acorn.parse('(' + src + ')', { ecmaVersion: 2022 }); } catch { return map; }
  (function walk(n) {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) { n.forEach(walk); return; }
    if (n.type === 'CallExpression' && n.callee && n.callee.type === 'MemberExpression' &&
        n.callee.property && n.callee.property.name === '_$s' && n.arguments.length >= 3) {
      map.set(bindKey(n.arguments[0], n.arguments[1]), n.arguments[2]);
    }
    for (const k of Object.keys(n)) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      walk(n[k]);
    }
  })(ast);
  return map;
}

// 从视图层(app-view) 的 render function 里收集静态文本模板： _i -> [{lit}|{key:'t0-0'}]
function collectTextTemplates(src) {
  const map = new Map();
  let ast;
  try { ast = acorn.parse('(' + src + ')', { ecmaVersion: 2022 }); } catch { return map; }

  const idxOf = (dataNode) => {
    if (!dataNode || dataNode.type !== 'ObjectExpression') return null;
    for (const p of dataNode.properties) {
      const k = p.key && (p.key.name || p.key.value);
      if (k === '_i') return normIdx(p.value);
      if (k === 'attrs' && p.value.type === 'ObjectExpression') {
        for (const q of p.value.properties) {
          if ((q.key.name || q.key.value) === '_i') return normIdx(q.value);
        }
      }
    }
    return null;
  };
  const partsOf = (node, acc) => {
    if (!node) return;
    if (node.type === 'BinaryExpression' && node.operator === '+') { partsOf(node.left, acc); partsOf(node.right, acc); return; }
    if (node.type === 'Literal') { acc.push({ lit: String(node.value ?? '') }); return; }
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' &&
        node.callee.property && node.callee.property.name === '_$g' &&
        node.arguments[1] && node.arguments[1].type === 'Literal') {
      acc.push({ key: String(node.arguments[1].value) });
      return;
    }
    acc.push({ lit: '' });
  };

  (function walk(n) {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) { n.forEach(walk); return; }
    if (n.type === 'CallExpression' && n.arguments.length >= 2) {
      const idx = idxOf(n.arguments[1]);
      const kids = n.arguments[2];
      if (idx != null && kids && kids.type === 'ArrayExpression') {
        const acc = [];
        for (const c of kids.elements) {
          if (c && c.type === 'CallExpression' && c.callee.type === 'MemberExpression' &&
              c.callee.property && c.callee.property.name === '_v') {
            partsOf(c.arguments[0], acc);
          }
        }
        if (acc.length) map.set(idx, acc);
      }
    }
    for (const k of Object.keys(n)) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      walk(n[k]);
    }
  })(ast);
  return map;
}

function decompileRender(src, opts) {
  const d = new Decompiler(opts);
  const tpl = d.decompile(src);
  return { template: tpl, warnings: d.warnings };
}

module.exports = { decompileRender, Decompiler, collectBindings, collectTextTemplates };
