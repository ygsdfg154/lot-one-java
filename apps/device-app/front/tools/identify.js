// 识别 .unpacked 里的模块属于哪个 npm 包
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];

// 每条规则：[npm 规范路径, 判定函数]
const RULES = [
  ['@babel/runtime/helpers/interopRequireDefault', (s) => /__esModule\s*\?\s*\w+\s*:\s*\{\s*default\s*:/.test(s) && s.length < 500],
  ['@babel/runtime/helpers/interopRequireWildcard', (s) => /getOwnPropertyDescriptor/.test(s) && /WeakMap/.test(s) && /__esModule/.test(s) && s.length < 2500],
  ['@babel/runtime/helpers/defineProperty', (s) => /Object\.defineProperty\(\w+,\s*\w+,\s*\{\s*value:/.test(s) && /enumerable:\s*!0/.test(s) && s.length < 900],
  ['@babel/runtime/helpers/asyncToGenerator', (s) => /function\s+\w+\(\w+,\s*\w+,\s*\w+,\s*\w+,\s*\w+,\s*\w+,\s*\w+\)/.test(s) && /Promise/.test(s) && /\.next\b/.test(s) && s.length < 2200],
  ['@babel/runtime/helpers/typeof', (s) => /Symbol\.iterator/.test(s) && /typeof/.test(s) && s.length < 900],
  ['@babel/runtime/helpers/classCallCheck', (s) => /Cannot call a class as a function/.test(s)],
  ['@babel/runtime/helpers/createClass', (s) => /descriptor\.enumerable\s*=\s*descriptor\.enumerable/.test(s) || /"prototype"/.test(s) && /writable:\s*!1/.test(s) && s.length < 1500],
  ['@babel/runtime/helpers/toConsumableArray', (s) => /Invalid attempt to spread non-iterable instance/.test(s)],
  ['@babel/runtime/helpers/slicedToArray', (s) => /Invalid attempt to destructure non-iterable instance/.test(s)],
  ['@babel/runtime/helpers/inherits', (s) => /Super expression must either be null or a function/.test(s)],
  ['@babel/runtime/helpers/possibleConstructorReturn', (s) => /Derived constructors may only return object or undefined/.test(s)],
  ['@babel/runtime/helpers/getPrototypeOf', (s) => /Object\.setPrototypeOf\s*\?\s*Object\.getPrototypeOf/.test(s) && s.length < 700],
  ['@babel/runtime/helpers/regeneratorRuntime', (s) => /regeneratorRuntime/.test(s) && /GeneratorFunction/.test(s)],
  ['regenerator-runtime', (s) => /regeneratorRuntime\s*=/.test(s) && s.length < 1200],
  ['moment', (s) => /moment/.test(s) && /_isAMomentObject/.test(s)],
  ['vuex', (s) => /mapGetters/.test(s) && /mapMutations/.test(s) && /installModule/.test(s)],
  ['vue', (s) => /__patch__/.test(s) && /\$createElement/.test(s) && /observe/.test(s) && s.length > 50000],
  ['vue-i18n', (s) => /VueI18n/.test(s) || (/\$t\b/.test(s) && /fallbackLocale/.test(s) && /_localeChainCache/.test(s))],
  ['vuex-persistedstate', (s) => /persistedstate/i.test(s) || (/subscribe/.test(s) && /getState/.test(s) && /setState/.test(s) && /paths/.test(s) && s.length < 8000)],
  ['crypto-js', (s) => /CryptoJS/.test(s) || (/WordArray/.test(s) && /sigBytes/.test(s))],
  ['dayjs', (s) => /dayjs/.test(s)],
];

function listMods(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== '__runtime.js');
}

const result = {};
for (const space of ['svc', 'view', 'nvue']) {
  const dir = path.join(OUT, '.unpacked', space);
  const map = {};
  let hit = 0;
  for (const f of listMods(dir)) {
    const s = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const [pkg, test] of RULES) {
      let ok = false;
      try { ok = test(s); } catch { ok = false; }
      if (ok) { map[f.replace(/\.js$/, '')] = pkg; hit++; break; }
    }
  }
  result[space] = map;
  const byPkg = {};
  for (const [id, pkg] of Object.entries(map)) (byPkg[pkg] = byPkg[pkg] || []).push(id);
  console.log(`\n== ${space} ==  已识别 ${hit} / ${listMods(dir).length}`);
  for (const [pkg, ids] of Object.entries(byPkg).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${pkg.padEnd(50)} ${ids.length} 个: ${ids.slice(0, 6).join(',')}`);
  }
}
fs.writeFileSync(path.join(OUT, 'docs', 'npm-map.json'), JSON.stringify(result, null, 2));
