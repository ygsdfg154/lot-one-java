# 铭智物联 v1.2.0 — 反编译还原工程

> 由 `assets/apps/__UNI__7115D8B/www/` 下的 uni-app 打包产物自动还原。
> 工具链在 `tools/`：webpack 拆包器 + Vue2 render function → template 反编译器 + 去压缩器（acorn/astring）。

## 一、原工程技术栈（已确认）

| 项 | 值 |
| --- | --- |
| 框架 | uni-app v2（Vue 2） |
| 编译器 | uni-v3（`compilerVersion: 3`，HBuilderX `4.75`） |
| 渲染 | `renderer: auto` — **46 个 nvue 原生页面** + 7 个 vue(WebView) 页面 |
| 状态管理 | Vuex 3.6.2（17 个 namespaced 模块 + persistedstate） |
| UI 库 | uView UI（`uni.$u`）+ uni-ui |
| 国际化 | vue-i18n，zh-Hans / en |
| 其它 | moment / dayjs / semver、高德地图 SDK |
| 分包 | 4 个：pagesCore / pagesFunc / pagesMore / pagesPay |

## 二、当前状态：**已跑通**

| 目标 | 状态 |
| --- | --- |
| `npm run build:app-plus` | ✅ 编译通过，产物 `dist/build/app-plus/` |
| `npm run dev:h5` | ✅ 可启动，默认 `http://localhost:8080/` |

产物结构与原始安装包逐项对应（同样的 `app-service.js` / `app-view.js` / `view.css` / 分包目录），体积同量级。

真机验证走 `build:app-plus` → HBuilderX 导入 `dist/build/app-plus` 运行。H5 只用来快速验证「能编译、页面结构对不对」。

### 环境要求

uni-app v2 工具链是 webpack 4 时代的产物，在 Node 22+ 上需要两个兼容开关（**已写进 npm scripts，无需手工处理**）：

- `--require ./scripts/node-compat.js` —— 补回 Node 22+ 移除的 `util.isRegExp` 等旧 API（`postcss-urlrewrite` 仍在用）
- `--openssl-legacy-provider` —— webpack 4 的 md4 哈希

用 Node 16/18 可以去掉这两个开关。

## 三、还原结果

| 产出 | 数量 | 说明 |
| --- | ---: | --- |
| 页面 SFC | 53 | `.nvue` / `.vue`，含 template + script + style |
| 业务组件 | 34 | `src/components/` |
| Vuex store | 18 | `src/store/index.js` + `modules/*.js` |
| 模板还原成功 | 158 / 159 | 唯一失败项是 `App.vue`（它本来就没有 template） |
| 带样式的 SFC | 77 | nvue 从样式对象还原，vue 从 app-view.js 按 `data-v-` 归位 |
| 去压缩为 ESM | 184 | 全部模块，**无一退回** |
| 独立校验通过 | 116 / 116 | 自由标识符全部能解析到 import 或已知全局 |
| API 接口 | 155 | `docs/api-list.md` |
| 原始模块转储 | 1730 | `.unpacked/`（svc 488 + view 247 + nvue 995） |

## 四、依赖处理

**已换成 npm 包**：`vue`、`vuex`、`vue-i18n`、`vuex-persistedstate`、`moment`、`dayjs`、`semver`

**uView 走 npm**：`pages.json` 的 easycom 指向 `uview-ui/components/...`。反编译出的 67 个 uView 组件副本存在 `docs/decompiled-uview/` 仅供比对，不参与构建。uni-ui 的 4 个组件保留在 `src/uni_modules/`。

**保留本地副本**：`@babel/runtime` 的 helper（interopRequireDefault / objectSpread 等）。它们是随包发出去的精确实现，换 npm 版只会引入版本差异，且没有可读性收益。

**`.unpacked/` 里实际只有约 115 个模块被引用**（共 1730 个），其余是死代码。依赖图见 `docs/depgraph.json`。

## 五、平台生成物 ≠ 项目源码

打包产物里混着 uni-app 编译器**按平台自动生成**的东西，它们不属于源码，原样搬进 `src/` 会在别的平台崩溃。已识别并处理：

| 类型 | 处理 |
| --- | --- |
| 平台引导文件（nvue-163.js / svc-56db.js / view-95f7.js） | 置空为 `module.exports = {}`，原文存 `docs/decompiled-bootstrap/` |
| `module.exports = Vue`（平台注入的全局） | 映射到 npm `vue` 包 |

引导文件原本做两件事：`uni.requireGlobal()` / `uni.restoreGlobal()` 还原 App 环境全局对象（app-plus 专有，H5 下抛错），以及 `__definePage(...)` 注册页面（现由 `pages.json` 承担）。

**验证**：置空后 `build:app-plus` 仍编译通过 —— 反证这部分确实由编译器自行生成。

## 六、还原到什么程度

**等同源码**

- `pages.json`、`manifest.json`、`locale/*.json`、`static/` —— 打包产物里就是明文，100% 一致
- `docs/api-list.md` —— 接口路径、方法、请求字段名都是静态提取的真值

**语义等价、但不是原始写法**

- **template**：由 render function 反编译得到。标签、属性、事件、`v-if` / `v-for` / `v-model` / 插槽都还原了，但缩进、属性顺序、注释是重新生成的。
- **v-for 循环变量名**是压缩后的（`v-for="(t, r) in list"`），模板内引用一致，改名时整段一起改。
- **script**：已转成正常 ESM（import/export、对象展开、布尔字面量都已还原），但函数内部局部变量仍是 `e`/`t`/`n`。
- **style**：nvue 从编译后的样式对象反查；vue 从 `app-view.js` 按 `[data-v-xxx]` 归位。原始 SCSS 变量/嵌套/mixin 不可恢复。

**确定丢失**

- 原始 `.vue` 的目录划分与文件名（组件名从 `components: {}` 注册表反查，页面名来自路由表）
- 注释、SCSS 源码、TypeScript 类型、局部变量名

## 七、去压缩的安全线

每个模块过两道门：

1. **语法校验** —— 产物必须能以 ESM 解析
2. **绑定完整性校验（作用域感知）** —— 被消解掉声明的名字不允许还有「自由引用」。内层同名局部变量不算 —— 压缩器会把 `e`/`t`/`n` 同时用作模块形参和局部变量，不做作用域分析就会大量误判。

任一道没过就**退回原始 webpack 包装形式**并在文件头注明原因。宁可丑，不能静默改坏。

`tools/verify.js` 是独立于去压缩器的第二套校验，不复用它的任何判断。

## 八、regenerator 状态机

| 类别 | 原始数 | 处理 |
| --- | ---: | --- |
| A 纯顺序 await | 434 | ✅ 全部自动改回 `async/await` |
| B 含条件跳转 | 168 | 保持原样（需重建 if/else 控制流） |
| C 含 try/catch | 10 | 保持原样 |

转换方式是把 `asyncToGenerator(mark(F))` 整体换成等价 async 函数，**不动外层函数、不动 `var e = this` 捕获** —— 两者都返回 Promise，调用点无论 `(...)()` 还是 `.apply(...)` 都不受影响。

`tools/test-deregen.js` 有 5 个用例，含两个**必须拒绝转换**的负向用例。

**B 类为什么不转**：需要从跳转表重建控制流，做错了不报错、只让分支悄悄走岔。现在工程能跑起来了，可以逐个改并实测。

## 九、已修复的原包 bug

`getBuffer()` 引用了从未声明的 `alarmOn`，运行到该行抛 `ReferenceError`（全包只出现 2 次，无任何声明）。

依据是同文件紧邻的兄弟方法 `getOnOffParam()` 写的是 `= n.data ? 0 : 1`，而这里是 `(!!n.data, ... = alarmOn ? 0 : 1)` —— 作者本意是 `const alarmOn = !!n.data`，漏了赋值。因 `!!x ? 0:1` 与 `x ? 0:1` 等价，修复直接对齐兄弟方法的写法。

记录在 `tools/patches.js`，重新生成后跑一次即可复原。

## 十、标准工作流

```bash
node tools/restore.js  ../www src      # 拆包 + 还原 + 去压缩 + async/await
node tools/finalize.js ../www src      # pages.json / manifest / static / 文档
node tools/patches.js  src             # 源码级修复（alarmOn 等）
node tools/verify.js   src             # 绑定完整性（必须 0 问题）
node tools/resolvecheck.js .           # 导入路径解析（必须 0 失败）
node tools/report.js   .               # 重新生成本文件
npm run build:app-plus                 # 端到端验证
```

> `finalize.js` 会把 docs 写到 `src/docs`，需手工上移到 `code/docs`。

## 十一、⚠️ src/ 已经是工作副本

工程现在能编译能跑，`src/` 应当作为你们的工作目录。**再跑 `restore.js` 会覆盖手工修改** —— 除非把改动像 `alarmOn` 那样登记进 `tools/patches.js`。

## 十二、已知遗留

1. **178 个 regenerator 状态机**未改回 async/await（168 个含条件跳转、10 个含 try/catch），每个文件头都标了数量
2. **`.unpacked/` 的 1730 个模块是原样搬运**，未做语义分析。已处理掉三类平台相关问题（动态 require、平台引导文件、平台全局 `Vue`），但可能还有其它平台差异只在运行时暴露 —— 建议按主流程实际点一遍
3. H5 下高德地图、`plus.*`、扫码等原生能力不可用，属预期行为，不是还原缺陷
4. 联调需要给 `vue.config.js` 配 devServer 代理（接口在 `http://h5.akbee.com/v1`，浏览器直连会跨域）
