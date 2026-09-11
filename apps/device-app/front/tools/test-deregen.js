const { deregen } = require('./lib/deregen');

const cases = [
  ['A: 单个 await + 使用结果', `
var x = { getBuffer: function () {
  var e = this;
  return i(m.mark(function t() {
    var n;
    return m.wrap(function (t) {
      for (; ; ) switch (t.prev = t.next) {
        case 0: return (t.next = 2, e.GetCutBuffer({ terminalId: e.id }));
        case 2: (n = t.sent).succeeded && (e.radioValue = n.data ? 0 : 1);
        case 4: case "end": return t.stop();
      }
    }, t);
  }))();
} };`],

  ['A: await 结果没人用', `
var x = { sleep: function () {
  return i(m.mark(function t() {
    return m.wrap(function (e) {
      for (; ; ) switch (e.prev = e.next) {
        case 0: return (e.next = 2, uni.$u.sleep());
        case 2: case "end": return e.stop();
      }
    }, t);
  }))();
} };`],

  ['A: 多次 await + return 值', `
var x = { go: function () {
  var e = this;
  return i(m.mark(function t() {
    var a, b;
    return m.wrap(function (t) {
      for (; ; ) switch (t.prev = t.next) {
        case 0: return (t.next = 2, e.first());
        case 2: a = t.sent; return (t.next = 5, e.second(a));
        case 5: b = t.sent; return t.abrupt("return", b.value);
        case 7: case "end": return t.stop();
      }
    }, t);
  }))();
} };`],

  ['B: 含条件跳转 —— 必须跳过', `
var x = { send: function () {
  var e = this;
  return i(m.mark(function t() {
    return m.wrap(function (t) {
      for (; ; ) switch (t.prev = t.next) {
        case 0:
          if (e.code) { t.next = 2; break; }
          return t.abrupt("return", toast("no code"));
        case 2: return (t.next = 4, e.Send());
        case 4: case "end": return t.stop();
      }
    }, t);
  }))();
} };`],

  ['C: 含 try/catch —— 必须跳过', `
var x = { risky: function () {
  return i(m.mark(function t() {
    return m.wrap(function (e) {
      for (; ; ) switch (e.prev = e.next) {
        case 0: e.prev = 0; return (e.next = 3, doIt());
        case 3: e.next = 8; break;
        case 5: e.prev = 5; e.t0 = e["catch"](0);
        case 8: case "end": return e.stop();
      }
    }, t, [[0, 5]]);
  }))();
} };`],
];

for (const [name, src] of cases) {
  const r = deregen(src);
  console.log(`\n===== ${name} =====`);
  console.log(`converted=${r.converted} skipped=${r.skipped}${r.error ? ' error=' + r.error : ''}`);
  console.log(r.code.trim());
}
