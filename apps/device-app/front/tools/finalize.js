// 生成 pages.json / manifest.json / locale / static / API 清单 / 模块索引 / README
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { unpack } = require('./unpack');
const { scan } = require('./lib/apiscan');
const { parseModule } = require('./lib/modparse');

const WWW = process.argv[2];
const OUT = process.argv[3];
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); };
const log = console.log;

/* ---------- 1. __uniConfig ---------- */
const sandbox = { service: { register() {} }, console, Math, Object, Date };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(WWW, 'app-config-service.js'), 'utf8'), sandbox);
const cfg = sandbox.__uniConfig;
const routes = sandbox.__uniRoutes;
const appManifest = JSON.parse(fs.readFileSync(path.join(WWW, 'manifest.json'), 'utf8'));

/* ---------- 2. pages.json ---------- */
const routeByPath = {};
for (const r of routes) routeByPath[r.path.replace(/^\//, '')] = r;

const subRoots = (cfg.subPackages || []).map((s) => s.root);
const inSub = (p) => subRoots.find((r) => p === r || p.startsWith(r + '/'));

const mkStyle = (route) => {
  const s = { ...(route && route.window ? route.window : {}) };
  if (route && route.meta && route.meta.isNVue) s.__nvue = true;   // 仅作标记，稍后删掉
  return s;
};

const mainPages = [], subPages = {};
for (const p of cfg.pages) {
  const r = routeByPath[p];
  const style = mkStyle(r);
  const isNvue = !!style.__nvue; delete style.__nvue;
  const root = inSub(p);
  const entry = { path: root ? p.slice(root.length + 1) : p, style };
  if (isNvue) entry.style.__comment_nvue = '该页面源码为 .nvue';
  (root ? (subPages[root] = subPages[root] || []) : mainPages).push(entry);
}

const pagesJson = {
  pages: mainPages,
  subPackages: subRoots.map((root) => ({ root, pages: subPages[root] || [] })),
  globalStyle: cfg.window || {},
  tabBar: cfg.tabBar,
  // uView 组件走 npm 包（uview-ui 官方 easycom 规则）。
  // 反编译出来的那份副本已挪到 docs/decompiled-uview/ 仅供比对。
  easycom: {
    autoscan: true,
    custom: {
      '^u--(.*)': 'uview-ui/components/u--$1/u--$1.vue',
      '^up-(.*)': 'uview-ui/components/u-$1/u-$1.vue',
      '^u-([^-].*)': 'uview-ui/components/u-$1/u-$1.vue',
      // uni-ui 用的是反编译出来的本地副本，后缀是 .nvue（来自 nvue 编译空间），
      // easycom 的 autoscan 只认 .vue，所以必须显式给规则，否则报 Unknown custom element。
      '^uni-(.*)': '@/uni_modules/uni-ui/components/uni-$1/uni-$1.nvue',
    },
  },
};
if (cfg.locale) pagesJson.locale = cfg.locale;
if (cfg.fallbackLocale) pagesJson.fallbackLocale = cfg.fallbackLocale;
W(path.join(OUT, 'pages.json'),
  '// 由打包产物 app-config-service.js 中的 __uniConfig / __uniRoutes 还原\n' +
  '// nvue 页面已在 style 里用 __comment_nvue 标注，实际源码后缀为 .nvue\n' +
  JSON.stringify(pagesJson, null, 2) + '\n');
log('pages.json: 主包 %d 页 / 分包 %d 个', mainPages.length, subRoots.length);

/* ---------- 3. manifest.json ---------- */
const plus = appManifest.plus || {};
const manifest = {
  name: appManifest.name,
  appid: appManifest.id,
  description: appManifest.description,
  versionName: appManifest.version && appManifest.version.name,
  versionCode: appManifest.version && appManifest.version.code,
  transformPx: false,
  locale: appManifest.locale,
  fallbackLocale: appManifest.fallbackLocale,
  'app-plus': {
    usingComponents: plus.usingComponents,
    nvueCompiler: plus.nvueCompiler,
    nvueStyleCompiler: cfg.nvueStyleCompiler,
    compilerVersion: plus.compilerVersion,
    splashscreen: plus.splashscreen,
    modules: appManifest.permissions,
    distribute: {
      android: { permissions: [] },
      ios: {},
      sdkConfigs: {},
    },
    optimization: plus.optimization,
    safearea: plus.safearea,
    statusbar: plus.statusbar,
    popGesture: plus.popGesture,
    'uni-app': plus['uni-app'],
    nvue: (plus['uni-app'] || {}).nvue,
    nvueLaunchMode: (plus['uni-app'] || {}).nvueLaunchMode,
    renderer: cfg.renderer,
    allowsInlineMediaPlayback: plus.allowsInlineMediaPlayback,
    channel: plus.channel,
  },
  // H5 平台配置：原包完全没有这一段（该 App 从未做过 H5 构建），
  // 这里补一个骨架，填上 Key 后浏览器里的 <map> 才能渲染。
  h5: {
    __说明: [
      '这一段是反编译工具补的骨架，原包 manifest.json 里没有 h5 配置。',
      'amap.key 必须是高德开放平台的「Web端(JS API)」类型 Key —— ',
      'App 端用的是 Android/iOS SDK Key，两者不能互用。',
      '留空时 <map> 不渲染，控制台会提示 [system] Map key not configured.',
      '连带影响：mapContext 为 null，首页 onShow 里的 addMarkers/removeMarkers 会报错。',
    ].join(''),
    sdkConfigs: {
      maps: {
        amap: {
          key: 'fc9232a479afd34ea3f25bd5a596db58',   // 高德 Web端(JS API) Key（由项目方提供）
          securityJsCode: '',   // 安全密钥：2021-12 之后申请的 Key 需要填，否则报 INVALID_USER_SCODE
        },
      },
    },
  },
  __原始manifest: '完整原文见 docs/manifest.origin.json（含 confusion 签名、adid 等打包期字段）',
};
W(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
W(path.join(OUT, 'docs', 'manifest.origin.json'), JSON.stringify(appManifest, null, 2) + '\n');
W(path.join(OUT, 'docs', '__uniConfig.json'), JSON.stringify(cfg, (k, v) => (typeof v === 'function' ? undefined : v), 2));
W(path.join(OUT, 'docs', '__uniRoutes.json'), JSON.stringify(routes, null, 2));

/* ---------- 4. locale ---------- */
let nLocale = 0;
for (const [k, v] of Object.entries(cfg.locales || {})) {
  W(path.join(OUT, 'locale', k + '.json'), JSON.stringify(v, null, 2) + '\n');
  nLocale++;
}
log('locale: %d 个语言包', nLocale);

/* ---------- 5. static ---------- */
function copyDir(src, dst) {
  let n = 0;
  for (const f of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, f.name), d = path.join(dst, f.name);
    if (f.isDirectory()) n += copyDir(s, d);
    else { fs.mkdirSync(path.dirname(d), { recursive: true }); fs.copyFileSync(s, d); n++; }
  }
  return n;
}
let nStatic = 0;
if (fs.existsSync(path.join(WWW, 'static'))) nStatic = copyDir(path.join(WWW, 'static'), path.join(OUT, 'static'));
if (fs.existsSync(path.join(WWW, 'assets'))) nStatic += copyDir(path.join(WWW, 'assets'), path.join(OUT, 'static', '_assets'));
log('static: %d 个文件', nStatic);

/* ---------- 6. API 清单 ---------- */
const spaces = { svc: [], view: [], nvue: [] };
const walkDir = (d, acc) => {
  for (const f of fs.readdirSync(path.join(WWW, d), { withFileTypes: true })) {
    const rel = d + '/' + f.name;
    if (f.isDirectory()) { walkDir(rel, acc); continue; }
    if (f.name.endsWith('.js')) acc.push(rel);
  }
};
const nvueFiles = [];
for (const d of ['pages', 'pagesCore', 'pagesFunc', 'pagesMore', 'pagesPay']) walkDir(d, nvueFiles);
spaces.svc = ['app-service.js', ...nvueFiles.filter((f) => f.endsWith('app-sub-service.js'))];
spaces.nvue = nvueFiles.filter((f) => !f.endsWith('app-sub-service.js'));
spaces.view = ['app-view.js'];

const apis = new Map();
const moduleIndex = { svc: [], view: [], nvue: [] };
for (const [space, files] of Object.entries(spaces)) {
  const mods = {}, from = {};
  for (const f of files) {
    try {
      const r = unpack(path.join(WWW, f));
      for (const [id, fn] of Object.entries(r.modules)) {
        const src = typeof fn === 'function' ? fn.toString() : String(fn);
        if (!mods[id] || mods[id].length < src.length) mods[id] = src;
        (from[id] = from[id] || []).push(f);
      }
    } catch { /* ignore */ }
  }
  for (const [id, src] of Object.entries(mods)) {
    for (const rec of scan(src, { space, module: id })) {
      const key = rec.method + ' ' + rec.url;
      if (!apis.has(key)) apis.set(key, { ...rec, modules: new Set(), bundles: new Set() });
      const e = apis.get(key);
      e.modules.add(space + ':' + id);
      for (const b of from[id] || []) e.bundles.add(b);
      if (!e.data && rec.data) e.data = rec.data;
    }
    // 模块索引
    let exportsNames = [];
    try {
      const pm = parseModule(src);
      exportsNames = [...new Set([...Object.keys(pm.exportsMap), ...Object.keys(pm.assigns)])]
        .filter((x) => x !== 'module.exports');
    } catch { /* ignore */ }
    moduleIndex[space].push({ id, size: src.length, exports: exportsNames, bundles: [...new Set(from[id] || [])].length });
  }
}

const apiList = [...apis.values()].map((a) => ({
  method: a.method,
  url: a.url,
  data: a.data || null,
  header: a.header || null,
  modules: [...a.modules],
  usedByBundles: [...a.bundles],
})).sort((x, y) => x.url.localeCompare(y.url) || x.method.localeCompare(y.method));

// baseURL
const cfgSrc = fs.readFileSync(path.join(WWW, 'app-service.js'), 'utf8');
const bases = [...new Set([...cfgSrc.matchAll(/https?:\/\/[a-zA-Z0-9.\-]+(?:\/[\w\-./]*)?/g)].map((m) => m[0]))]
  .filter((u) => !/feross|momentjs|github|bit\.ly|w3\.org|schemas|jquery/.test(u));

W(path.join(OUT, 'docs', 'api-list.json'), JSON.stringify({ baseUrlCandidates: bases, count: apiList.length, apis: apiList }, null, 2));

const byPrefix = {};
for (const a of apiList) {
  const seg = a.url.split('/').filter(Boolean)[0] || '(root)';
  const g = a.url.startsWith('/v2/') ? 'v2/' + (a.url.split('/')[2] || '') : seg;
  (byPrefix[g] = byPrefix[g] || []).push(a);
}
const md = [];
md.push('# API 接口清单');
md.push('');
md.push(`> 从打包产物中静态提取，共 **${apiList.length}** 个接口（按 \`METHOD + URL\` 去重）。`);
md.push('> `{...}` 表示该段是运行时拼接的变量，尖括号内为反编译出的表达式。');
md.push('');
md.push('## 服务端地址');
md.push('');
for (const b of bases) md.push('- `' + b + '`');
md.push('');
md.push('## 接口一览');
md.push('');
for (const g of Object.keys(byPrefix).sort()) {
  md.push(`### ${g}`);
  md.push('');
  md.push('| Method | URL | 请求参数 | 出现位置 |');
  md.push('| --- | --- | --- | --- |');
  for (const a of byPrefix[g]) {
    const params = a.data ? a.data.map((d) => '`' + d.replace(/\|/g, '\\|') + '`').join('<br>') : '';
    const where = a.usedByBundles.slice(0, 3).map((b) => '`' + b + '`').join('<br>') +
      (a.usedByBundles.length > 3 ? `<br>…(+${a.usedByBundles.length - 3})` : '');
    md.push(`| ${a.method} | \`${a.url}\` | ${params} | ${where} |`);
  }
  md.push('');
}
W(path.join(OUT, 'docs', 'api-list.md'), md.join('\n'));
log('API 清单: %d 个接口', apiList.length);

/* ---------- 7. 模块索引 ---------- */
const mi = ['# webpack 模块索引', '',
  '`.unpacked/<space>/<id>.js` 是从 bundle 里原样拆出的模块（已格式化，`require` 已重写为可解析路径）。', '',
  '- **svc** — `app-service.js` + 各分包 `app-sub-service.js`（逻辑层，Vue 页面的 script/template）',
  '- **view** — `app-view.js`（视图层，静态文本与组件 CSS）',
  '- **nvue** — 46 个 nvue 页面 bundle（原生渲染页面，共享同一套模块 id）', ''];
for (const sp of ['svc', 'view', 'nvue']) {
  mi.push(`## ${sp}（${moduleIndex[sp].length} 个模块）`, '');
  mi.push('| id | 大小 | 导出 | 被几个 bundle 引用 |');
  mi.push('| --- | ---: | --- | ---: |');
  for (const m of moduleIndex[sp].sort((a, b) => b.size - a.size).slice(0, 200)) {
    mi.push(`| \`${m.id}\` | ${m.size} | ${m.exports.slice(0, 8).join(', ')} | ${m.bundles} |`);
  }
  if (moduleIndex[sp].length > 200) mi.push(`| … | | 其余 ${moduleIndex[sp].length - 200} 个见 modules.json | |`);
  mi.push('');
}
W(path.join(OUT, 'docs', 'modules.md'), mi.join('\n'));
W(path.join(OUT, 'docs', 'modules.json'), JSON.stringify(moduleIndex, null, 2));

/* ---------- 7b. 工程脚手架 ---------- */
// 依赖版本从 LICENSE 注释和 bundle 内容里认出来的，见 docs/modules.md
const pkg = {
  name: 'qzapp',
  version: appManifest.version.name,
  description: appManifest.description,
  scripts: {
    'dev:app': 'HBuilderX 运行到 App，或 uni-app CLI: cross-env UNI_PLATFORM=app-plus vue-cli-service uni-serve',
    'build:app': 'cross-env UNI_PLATFORM=app-plus vue-cli-service uni-build',
  },
  dependencies: {
    // 以下版本号来自打包产物里的 LICENSE 注释 / 运行时特征，未必与原工程完全一致
    vue: '^2.6.14',
    vuex: '^3.6.2',
    'vue-i18n': '^8.28.2',
    moment: '^2.30.1',
    'uview-ui': '^2.0.36',
    'vuex-persistedstate': '^4.1.0',
    dayjs: '^1.11.13',
    semver: '^7.6.3',
    'regenerator-runtime': '^0.14.1',
  },
  __注意: '这是根据打包产物推断出来的，不是原始 package.json。@dcloudio/* 系列依赖请按 HBuilderX 版本 4.75 对应的 uni-app CLI 模板补齐。',
};
W(path.join(OUT, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');

W(path.join(OUT, 'uni.scss'), `// [反编译] 原始 uni.scss 已不可恢复 —— SCSS 变量在编译期就被求值展开了。
// 下面是从产物 CSS 里统计出来的高频颜色，按需改成变量后再用。
// 主题色（来自 common/config.js 的 primaryColor / titleColor）：
$uni-color-primary: #6081C7;

@import 'uview-ui/theme.scss';
`);

W(path.join(OUT, '.gitignore'), 'node_modules/\nunpackage/\ndist/\n');

/* ---------- 8. 路由文档 ---------- */
const rmd = ['# 页面路由', '', '| # | 路由 | 渲染方式 | 标题 | 特性 |', '| ---: | --- | --- | --- | --- |'];
routes.forEach((r, i) => {
  const w = r.window || {}, m = r.meta || {};
  const feats = [m.isTabBar && 'tabBar', m.isQuit && '首页', w.navigationStyle === 'custom' && '自定义导航',
    w.enablePullDownRefresh && '下拉刷新'].filter(Boolean).join('、');
  rmd.push(`| ${i + 1} | \`${r.path}\` | ${m.isNVue ? '**nvue**' : 'vue'} | ${w.navigationBarTitleText || ''} | ${feats} |`);
});
W(path.join(OUT, 'docs', 'routes.md'), rmd.join('\n'));
log('done');
