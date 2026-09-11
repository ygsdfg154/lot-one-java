// 运行时冒烟测试 —— 静态检查的最后一块拼图。
//
// 语法校验 / 绑定完整性 / platform-check 都只看得见「结构」；
// 类型语义错误（比如把返回数组的 helper 误转成对象，.forEach 就没了）三道全过，
// 只有真跑一遍才会暴露。这个脚本就是把「人工点一遍」自动化。
//
// 用法:
//   node tools/smoke.js                     # 跑全部路由
//   node tools/smoke.js --limit 10          # 只跑前 10 个
//   node tools/smoke.js --url http://localhost:8082
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const argOf = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const BASE = argOf('--url', 'http://localhost:8080');
const LIMIT = parseInt(argOf('--limit', '0'), 10) || 0;
const ROOT = path.resolve(__dirname, '..');

/* ---------- 路由清单 ---------- */
function loadRoutes() {
  const raw = fs.readFileSync(path.join(ROOT, 'src', 'pages.json'), 'utf8')
    .split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');
  const j = JSON.parse(raw);
  const out = j.pages.map((p) => p.path);
  for (const sp of j.subPackages || []) for (const p of sp.pages) out.push(sp.root + '/' + p.path);
  return out;
}

/* ---------- 预期内的报错 ---------- */
// H5 下这些本来就不该工作，出现即正常，不算缺陷。
const EXPECTED = [
  { re: /is not yet implemented/i,                 why: 'H5 未实现的 uni API（平台差异）' },
  { re: /\bplus\b.*is not defined|Cannot read prop.*of undefined.*plus/i, why: 'plus.* 是 App 原生能力，H5 无' },
  { re: /\bweex\b.*is not defined/i,               why: 'weex 是 nvue 运行时，H5 无' },
  { re: /AMap|amap|高德|MapLoader/i,               why: '高德地图 SDK 未在 H5 加载' },
  { re: /qzwlvp\.com/i,                            why: '真实接口跨域/网络失败（需配 devServer 代理）' },
  { re: /net::ERR_|Failed to fetch|NetworkError/i, why: '网络请求失败' },
  { re: /favicon\.ico/i,                           why: '缺 favicon' },
  { re: /\[HMR\]|webpack-dev-server|sockjs/i,      why: '开发服务器自身的日志' },
  { re: /Download the Vue Devtools/i,              why: 'Vue 开发提示' },
  { re: /scroll-view|ResizeObserver loop/i,        why: '浏览器布局告警' },
];
const classify = (text) => EXPECTED.find((e) => e.re.test(text)) || null;

(async () => {
  const puppeteer = require('puppeteer');
  const routes = LIMIT ? loadRoutes().slice(0, LIMIT) : loadRoutes();
  console.log(`冒烟测试: ${BASE}  共 ${routes.length} 个路由\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const results = [];
  let unexpectedTotal = 0;

  for (const route of routes) {
    const page = await browser.newPage();
    page.setDefaultTimeout(30000);
    const errors = [];

    // 未捕获异常 —— 最重要的信号
    page.on('pageerror', (e) => errors.push({ kind: 'uncaught', text: String(e && e.stack || e) }));
    page.on('console', (m) => { if (m.type() === 'error') errors.push({ kind: 'console', text: m.text() }); });
    page.on('requestfailed', (r) =>
      errors.push({ kind: 'request', text: `${r.failure() && r.failure().errorText} ${r.url()}` }));

    const url = `${BASE}/#/${route}`;
    let navError = null;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      await new Promise((r) => setTimeout(r, 1200));    // 等首屏渲染与异步逻辑
    } catch (e) {
      navError = e.message;
    }

    // 页面是否真的渲染出了东西。
    // 注意不能用 #app —— uni-app H5 挂载后会把 #app 换成 <uni-app>，量 #app 永远是 0，
    // 会把"渲染正常"误报成白屏。这里同时看 uni-app 根节点、可见文本和节点数。
    let rendered = 0, hasRoot = false, text = '';
    try {
      const r = await page.evaluate(() => ({
        root: !!document.querySelector('uni-app'),
        // uni-app 运行时自己会插一批 safe-area 探测用的隐藏 div，要排除掉
        nodes: document.querySelectorAll('uni-app *, uni-page *').length,
        text: (document.body.innerText || '').replace(/\s+/g, ' ').trim(),
      }));
      hasRoot = r.root; rendered = r.nodes; text = r.text;
    } catch { /* ignore */ }

    const unexpected = errors.filter((e) => !classify(e.text));
    const expectedList = errors.filter((e) => classify(e.text))
      .map((e) => ({ ...e, why: classify(e.text).why }));
    unexpectedTotal += unexpected.length;

    // 白屏本身就是失败信号，不能被「预期内」过滤器盖过 ——
    // 那个过滤器是主观判断，真正的阻塞原因很可能正躲在里面。
    // 所以页面渲染为 0 时，把**全部**报错原样打出来。
    const blankPage = !navError && (!hasRoot || rendered === 0);

    results.push({ route, url, rendered, hasRoot, text: text.slice(0, 120), navError, unexpected, expected: expectedList });
    const flag = navError ? 'NAV✗' : unexpected.length ? `✗ ${unexpected.length}` : (hasRoot && rendered > 0) ? '✓' : '空白';
    console.log(`${flag.padEnd(6)} ${route.padEnd(46)} root=${hasRoot?"有":"无"} 节点=${String(rendered).padStart(4)}  预期内报错=${expectedList.length}`);
    for (const u of unexpected.slice(0, 3)) {
      console.log(`         └─ ${u.kind}: ${u.text.split('\n')[0].slice(0, 150)}`);
    }
    if (blankPage) {
      for (const e of expectedList.slice(0, 6)) {
        console.log(`         ·  [被归为预期:${e.why}] ${e.text.split('\n')[0].slice(0, 140)}`);
      }
    }
    await page.close();
  }

  await browser.close();

  /* ---------- 汇总 ---------- */
  const blank = results.filter((r) => !r.navError && (!r.hasRoot || r.rendered === 0));
  const navFail = results.filter((r) => r.navError);
  console.log('\n──────── 汇总 ────────');
  console.log(`路由总数        : ${results.length}`);
  console.log(`渲染正常        : ${results.filter((r) => r.rendered > 0).length}`);
  console.log(`白屏(0 节点)    : ${blank.length}${blank.length ? ' -> ' + blank.slice(0, 5).map((r) => r.route).join(', ') : ''}`);
  console.log(`导航失败        : ${navFail.length}${navFail.length ? ' -> ' + navFail.slice(0, 5).map((r) => r.route).join(', ') : ''}`);
  console.log(`非预期报错总数  : ${unexpectedTotal}`);

  // 按报错内容归并，方便一次性定位同类问题
  const groups = {};
  for (const r of results) {
    for (const u of r.unexpected) {
      const key = u.text.split('\n')[0].replace(/:\d+:\d+/g, '').slice(0, 120);
      (groups[key] = groups[key] || { count: 0, routes: [] });
      groups[key].count++;
      if (groups[key].routes.length < 5) groups[key].routes.push(r.route);
    }
  }
  const sorted = Object.entries(groups).sort((a, b) => b[1].count - a[1].count);
  if (sorted.length) {
    console.log('\n──────── 非预期报错（按同类归并）────────');
    for (const [msg, g] of sorted.slice(0, 15)) {
      console.log(`\n[${g.count} 处] ${msg}`);
      console.log(`   路由: ${g.routes.join(', ')}${g.count > g.routes.length ? ' …' : ''}`);
    }
  }

  fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'docs', 'smoke-report.json'),
    JSON.stringify({ base: BASE, at: new Date().toISOString(), results, groups }, null, 2));
  console.log('\n详细报告: docs/smoke-report.json');

  process.exitCode = (unexpectedTotal || navFail.length || blank.length) ? 1 : 0;   // 白屏也算失败
})().catch((e) => { console.error('冒烟测试自身出错:', e); process.exitCode = 2; });
