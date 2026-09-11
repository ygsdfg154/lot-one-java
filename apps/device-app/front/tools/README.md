# 反编译工具链

用法（在本目录执行，需要 Node 18+）：

```bash
npm install                # 安装 acorn / astring
WWW=../../__UNI__7115D8B/www
node restore.js  "$WWW" ../   # 拆包 + 还原 SFC + 转储模块
node finalize.js "$WWW" ../   # pages.json / manifest / locale / static / API 清单
node report.js   ../          # README.md
```

| 文件 | 作用 |
| --- | --- |
| `unpack.js` | 在 VM 里劫持 webpack bootstrap，把 bundle 拆成模块函数（不执行业务代码） |
| `lib/modparse.js` | 解析单个模块：导出映射、顶层变量、require 依赖 |
| `lib/analyze.js` | 识别组件装配点 / 组件名 / 页面注册 / 样式模块 / CSS 文本 |
| `lib/decompile.js` | Vue2 render function → `<template>`；支持 uni-v3 的 `_$s`/`_$g` 双端合并 |
| `lib/apiscan.js` | 从 AST 里抽取 `{url, method, data}` 形态的接口调用 |
| `restore.js` | 主流程：拆包 → 分析 → 命名 → 生成 SFC → 转储 |
| `finalize.js` | 工程配置与文档生成 |
| `report.js` | 还原报告 |
