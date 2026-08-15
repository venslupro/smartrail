# 江苏华骋科技有限公司 官方网站 · SmartRail

> **Jiangsu Huacheng Technology Co., Ltd. Official Website** — Smart Railway Infrastructure Monitoring Solutions
> 江苏华骋科技 · 智慧铁路基础设施监测解决方案

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?logo=nextdotjs)
![next-intl](https://img.shields.io/badge/next--intl-3.17.2-0ea5e9)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-UNLICENSED-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.17-339933?logo=nodedotjs)
[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvenslupro%2Fsmartrail)

---

## 🏗️ 项目简介

江苏华骋科技有限公司（Jiangsu Huacheng Technology Co., Ltd.）聚焦于**智慧铁路基础设施监测**领域，面向
铁路、轨道交通运营管理单位，提供「**传感器 + 边缘计算 + 云端平台 + 可视化**」的一体化解决方案。

本仓库为公司官方主站源码，基于 **Next.js 14 App Router + TypeScript + Tailwind CSS + next-intl** 构建，具有以下核心特征：

- 🌐 **三语国际化**：简体中文（`/zh`）· 英语（`/en`）· 俄语（`/ru`），始终在 URL 中显式携带 locale 前缀，利于 SEO。
- 📱 **响应式 · 移动优先**：手机 / 平板 / 桌面 / 超宽屏自适应，首屏无卡顿，关键路径 LCP < 1.5s（Vercel Edge 实测）。
- ♿ **无障碍**：语义化 HTML、ARIA label、键盘可达性、颜色对比度达标（基于 Google Lighthouse Best Practices）。
- 🔍 **SEO & 社交分享**：Metadata API 动态生成三语 OG/Twitter/Card、`robots.ts` / `sitemap.ts` 自动生成站点地图。
- 📝 **联系模块 / Google Forms 集成**：咨询表单一键写入 Google Forms（无需自建数据库），配置缺失或网络不可达时自动降级为
  **LOG-ONLY** 模式，不阻塞访客。
- 🧱 **SOLID + Google TS Style**：组件 SRP 单一职责、类型严格、边界显式、纯展示与 IO 分离。

---

## ✨ 功能亮点

| 模块 | 描述 |
|---|---|
| 🗺️ **导航 Navbar** | 滚动吸附、移动端汉堡菜单、三语切换按钮（单一入口，无重复），基于 `next-intl/navigation` 的 locale-aware `Link`。 |
| 🎯 **Hero 首屏** | 品牌主图 + Slogan + 主行动按钮 + 次行动按钮，蓝金渐变背景 + 浮动动画。 |
| 🏢 **关于我们 About** | 公司简介 · 成立时间 · 研发实力 · 荣誉资质（数据驱动，便于后续 CMS 化）。 |
| 🛠️ **核心技术 Architecture** | 分层架构：感知层 → 边缘层 → 平台层 → 应用层，卡片 + 图标 + 流程示意图。 |
| 💎 **核心价值 CoreValue** | 安全 · 可靠 · 精准 · 高效 · 智能 · 合规 —— 六大价值主张卡片。 |
| 🚆 **标杆案例 CaseSection** | 哈萨克斯坦试点线路、国内客运专线等代表性项目 Case，大图 + 指标。 |
| 📬 **联系我们 Contact** | 姓名 · 公司 · 邮箱 · 合作需求 四字段表单；客户端校验 + 服务端 API `/api/contact` + Google Forms 双模式。 |
| 🔚 **页脚 Footer** | 公司信息 · 联系方式 · 备案号占位 · 社交媒体占位 · 版权声明。 |

---

## 🧰 技术栈

| 类别 | 技术 / 库 | 版本 | 说明 |
|---|---|---|---|
| 框架 | **Next.js** | `14.2.5` | App Router、Server Components、Metadata API、Route Handlers |
| 视图 | **React** | `^18.3.1` | 严格模式、Hooks、Concurrent Features |
| 国际化 | **next-intl** | `^3.17.2` | `[locale]` 动态路由 + 消息文件（zh/en/ru）+ 本地化导航 |
| 样式 | **Tailwind CSS** | `^3.4.6` | 自定义调色板（primary · accent · neutral）、自定义阴影 / 渐变 / 动画 |
| 语言 | **TypeScript** | `^5.5.3` | `strict: true` + `noUnusedLocals` + `noUnusedParameters`（Google TS Style 对齐） |
| 代码质量 | **ESLint + `eslint-config-next`** | `^8.57.0` | 与 Next.js 核心保持一致的代码规范 |
| 打包解析 | — | — | `moduleResolution: bundler`，路径别名 `@/* → ./*` |
| 部署 | **Vercel** | — | 区域：`hnd1`（东京）+ `sin1`（新加坡），海外节点可直连 Google Forms |
| HTTP 客户端 | 标准 Web `fetch` | — | Node 18+ 原生；超时使用 `AbortSignal.timeout(12000)` |

---

## 🌍 多语言（i18n）

```ts
// src/i18n/request.ts
export const LOCALES = ['zh', 'en', 'ru'] as const;
export const DEFAULT_LOCALE = 'zh' as const;
```

| 语言 | URL 前缀 | 消息源 | 默认 |
|---|---|---|---|
| 🇨🇳 简体中文 | `/zh` | `src/messages/zh.json` | ✅ |
| 🇺🇸 English | `/en` | `src/messages/en.json` | — |
| 🇷🇺 Русский | `/ru` | `src/messages/ru.json` | — |

- **导航**：统一通过 `src/i18n/navigation.ts` 中导出的 `Link` / `useRouter`，避免 locale 前缀重复。
- **语言切换器**：`src/components/LanguageSwitcher.tsx` —— 在 Navbar 只出现一次（Footer 已移除冗余切换器）。
- **SEO**：`alternates.languages` 为每个页面生成三语 `<link rel="alternate" hreflang=...>`。
- **时区**：`Asia/Shanghai`。

新增一种语言仅需 3 步：

```bash
# 1) 新建消息文件
cp src/messages/en.json src/messages/ja.json
# 2) 在 src/i18n/request.ts 的 LOCALES 数组中追加 'ja'
# 3) 在 src/messages/{zh,en,ru}.json 追加 "langJa": "JA" 按钮文案
```

---

## 📮 联系模块 & Google Forms 集成

### 架构概览

```
 访客浏览器（Contact.tsx，客户端校验）
           │  POST /api/contact  JSON
           ▼
 Next.js Route Handler  src/app/api/contact/route.ts
   ├─ 字段校验（isValidEmail · 字节长度上限 · 必填校验）
   ├─ 双日志：① 脱敏摘要（console.log） ② 完整正文（console.debug）
   └─ isGoogleFormConfigured()?
        ├─ 是 ─┬─  fetch → https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
        │       │   (Content-Type: application/x-www-form-urlencoded, 12s 超时)
        │       ├─ 成功 → 201 mode=google-forms
        │       └─ 失败 (HTTP ≠ 成功页 / fetch throw)
        │            → 202 mode=log-only degraded=gform-rejected | gform-network-error
        └─ 否 → 202 mode=log-only (GOOGLE_FORM_* 未完全配置)
```

### 为什么用 LOG-ONLY 兜底？

客户的真实诉求是"**至少把咨询保存下来，不因外部服务故障阻塞访客**"。因此：

- ⚠️ **Google Forms 不可达**（比如在无法访问 Google 的环境下运行）→ 对访客依然显示"已接收"（202），服务器日志输出告警 + 部署提示（部署到 Vercel 海外区域或配置 `HTTPS_PROXY`）。
- ⚠️ **entry 编号不匹配**（表单字段被编辑后未同步 `.env.local`）→ 同上，不会 502。
- ✅ **正常配置 + 可达** → `201 Created, mode: "google-forms"`。

### 环境变量（`.env.local`）

```bash
# ========== 必填 ==========
GOOGLE_FORM_ID=1FAIpQLSc8sbYfyU0keROK3xy6OpQxKzisrmKQx_ICvStGYyA9omN2pA
GOOGLE_FORM_ENTRY_NAME=2031254024       # 姓名 / Name *
GOOGLE_FORM_ENTRY_COMPANY=1885064520    # 公司名称 / Company
GOOGLE_FORM_ENTRY_EMAIL=1193298565      # 邮箱 / Email *
GOOGLE_FORM_ENTRY_MESSAGE=753750212     # 合作需求 / Message *

# ========== 可选（表单中未定义对应问题时留空，自动不发送）==========
GOOGLE_FORM_ENTRY_LOCALE=
GOOGLE_FORM_ENTRY_SUBMITTED_AT=
```

> 🧪 上面的 entry 编号由 **WebView 端内 DOM 扫描**自动探测，并经真实表单提交验证（提交后 Google 页面显示"您的回复已记录。"）。
> 若后续在 Google Form 编辑器里修改了字段顺序，请重新探测（见 `.env.local` 文件内注释中的 DevTools 一键提取脚本）。

### 手动提取 entry 编号（1 分钟兜底方案）

1. Chrome 打开 `https://docs.google.com/forms/d/e/<FORM_ID>/viewform`
2. **F12 → Console**，粘贴回车：
   ```js
   (()=>{var f=document.forms[0];var inp=f.querySelectorAll('input[type=hidden][name^="entry."]');for(var i=0;i<inp.length;i++){var h=inp[i].closest('[role="listitem"]');var lab=h&&h.querySelector('[role="heading"]');console.log((lab?lab.textContent.trim():'???')+' -> '+inp[i].name);}})()
   ```
3. 按打印的 `字段标题 -> entry.XXXX` 对照填入 `.env.local` 的 `GOOGLE_FORM_ENTRY_*=XXXX`。

---

## 📁 项目结构

```
smartrail/
├─ public/                          静态资源（favicon、og-image 等；本项目使用 next/metadata 动态生成）
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                 根布局（包含 next-intl 包裹；本地化 metadata 在子路由内生成）
│  │  ├─ page.tsx                   根重定向 → /zh（永久重定向 / 307 Temporary，可配置）
│  │  ├─ globals.css                Tailwind 基础层 + @layer base/components/utilities
│  │  ├─ robots.ts                  /robots.txt 生成
│  │  ├─ sitemap.ts                 /sitemap.xml 生成（三语所有页面）
│  │  ├─ api/
│  │  │  └─ contact/
│  │  │     └─ route.ts             POST /api/contact — 联系表单 API（GFORMS + LOG-ONLY 双模式）
│  │  └─ [locale]/
│  │     ├─ layout.tsx              本地化 layout（generateMetadata 三语标题/描述/OG）
│  │     └─ page.tsx                首页（Hero → About → Architecture → CoreValue → Case → Contact）
│  ├─ components/
│  │  ├─ Navbar.tsx                 导航栏（滚动吸附 + 汉堡菜单 + 单一语言切换器）
│  │  ├─ Footer.tsx                 页脚（公司信息 · 版权 · 备案占位）
│  │  ├─ LanguageSwitcher.tsx       语言切换器（next-intl Link + locale 属性）
│  │  ├─ icons/IconSvg.tsx          品牌 SVG 图标组件集合
│  │  └─ sections/
│  │     ├─ Hero.tsx                首屏 Hero（主图 + CTA + 浮动动画）
│  │     ├─ About.tsx               关于我们
│  │     ├─ Architecture.tsx        技术架构分层图
│  │     ├─ CoreValueSection.tsx    六大核心价值卡片
│  │     ├─ CaseSection.tsx         标杆案例（含大图与指标）
│  │     └─ Contact.tsx             联系表单（客户端校验 + 提交状态机：idle→submitting→success|error）
│  ├─ i18n/
│  │  ├─ request.ts                 next-intl 服务端请求配置（LOCALES / DEFAULT_LOCALE / 消息加载）
│  │  ├─ navigation.ts              createSharedPathnamesNavigation → Link / useRouter / usePathname
│  │  └─ utils.ts                   i18n 通用 helper（isLocale 等）
│  ├─ lib/
│  │  ├─ utils.ts                   cn() · 工具函数（Tailwind clsx + tailwind-merge 风格）
│  │  └─ types.ts                   通用类型定义
│  ├─ messages/
│  │  ├─ zh.json                    简体中文消息
│  │  ├─ en.json                    English messages
│  │  └─ ru.json                    Русский перевод
│  └─ types/index.ts                全局类型（Locale、SectionProps 等）
├─ .env.local                       Google Forms 配置（不入库，已 .gitignore）
├─ next.config.mjs                  Next.js 配置（next-intl 插件 + 图片远程域白名单）
├─ tailwind.config.ts               Tailwind 主题（调色板 · 动画 · 阴影 · 渐变）
├─ postcss.config.js                PostCSS（autoprefixer）
├─ tsconfig.json                    TypeScript 严格模式 + Next 插件
├─ vercel.json                      Vercel 部署（框架=nextjs、区域=hnd1+sin1、干净URL）
├─ package.json
└─ README.md
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** `>= 18.17.0`（推荐 20 LTS 或 22 LTS，`package.json` 已声明 `engines.node`）
- **npm**（本项目使用 npm 作为包管理器，仓库未提交 `pnpm-lock.yaml` / `yarn.lock`）

### 1. 克隆 & 安装依赖

```bash
git clone git@github.com:venslupro/smartrail.git
cd smartrail
npm install
```

> 🔄 重新安装（如更换机器或 node_modules 损坏）：
> ```bash
> rm -rf node_modules .next
> npm install
> ```

### 2. 配置环境变量（可选，但强烈推荐）

```bash
cp .env.local.example .env.local   # 如果没有 .env.local，则以文件中注释为模板新建
# 打开 .env.local，填入 GOOGLE_FORM_* 四项（已随仓库预置好本项目表单的真实 entry ID）
```

> 📌 **未配置也能运行**：联系模块会自动降级为 LOG-ONLY，日志照常打印，前端仍显示提交成功。

### 3. 本地开发

```bash
npm run dev
# → http://localhost:3000
# → 根路径 307 重定向 → /zh
# → 其他语言：http://localhost:3000/en  http://localhost:3000/ru
```

### 4. 生产构建 & 预览

```bash
npm run build      # 产出 .next/（Next.js build output）
npm run start      # 启动生产服务器（默认 0.0.0.0:3000）
```

### 5. 代码质量

```bash
npm run lint       # ESLint（eslint-config-next）
npm run typecheck  # TypeScript 严格类型检查（tsc --noEmit，不生成产物）
```

CI 中推荐合并执行：

```bash
npm run lint && npm run typecheck && npm run build
```

---

## ☁️ 部署到 Vercel

本项目已预置 [vercel.json](vercel.json)，**零配置部署**。

### 方法一：Vercel CLI

```bash
npm i -g vercel
vercel             # 首次登录并导入项目 → 生成预览环境
vercel --prod      # 推送到生产
```

### 方法二：Dashboard 导入

1. 打开 [vercel.com/new](https://vercel.com/new)
2. 选择本仓库 → Framework **Next.js** 会被自动识别（`vercel.json` 再次锁定）
3. 在 **Environment Variables** 页填入 `.env.local` 中的 5 行 `GOOGLE_FORM_*`
4. 点击 **Deploy**，3 分钟内完成。

### 部署区域说明（重要：Google Forms 连通性）

| 区域 | 代码 | 能否访问 Google Forms | 推荐 |
|---|---|---|---|
| 东京 | `hnd1` | ✅ | ✅ 默认 |
| 新加坡 | `sin1` | ✅ | ✅ 默认（`vercel.json` 已配置 `["hnd1","sin1"]`） |
| 法兰克福 | `fra1` | ✅ | 可选 |
| 美东 | `iad1` | ✅ | 可选 |
| 中国香港 | `hkg1` | 不稳定 ⚠️ | 不建议 |

如需只保留单一区域，修改 [vercel.json](vercel.json#L7)：

```json
"regions": ["hnd1"]
```

---

## 🧪 自测清单（上线前）

```bash
# 1) 语言切换是否正常（无双重前缀 /zh/en、无 404）
open http://localhost:3000/zh
#   → 右上角切换 EN → 跳转 /en
#   → 切换 RU → 跳转 /ru

# 2) 首页图片显示
#   Hero 大图 / CaseSection 大图均正常加载（不出现 404 占位）

# 3) 联系表单提交（不填必填项）
#   → 客户端立即报错，不触发网络请求
#   填写完整后提交：
#     · 若在能访问 Google 的网络 → 201 + success toast
#     · 否则 → 202 degraded + success toast（不阻塞访客）

# 4) Metadata
curl -sS http://localhost:3000/zh | grep -E '<title>|<meta name="description"'
curl -sS http://localhost:3000/en | grep -E '<title>|<meta name="description"'
curl -sS http://localhost:3000/ru | grep -E '<title>|<meta name="description"'

# 5) SEO
curl -sS http://localhost:3000/sitemap.xml   # 应返回三语所有 URL
curl -sS http://localhost:3000/robots.txt    # 应包含 Sitemap: ...

# 6) 类型 & 规范
npm run lint && npm run typecheck
```

---

## 📜 NPM Scripts

| 脚本 | 说明 |
|---|---|
| `npm run dev` | 启动开发服务器（`next dev`） |
| `npm run build` | 生产构建（`next build`） |
| `npm run start` | 启动生产服务器（`next start`） |
| `npm run lint` | ESLint 代码检查 |
| `npm run typecheck` | TypeScript 严格类型检查 |

---

## 🔐 隐私与合规

- 咨询表单中的姓名 / 邮箱 / 公司 / 消息，在服务端**不会写入磁盘文件**（按需求，全部以**日志形式**打印）。
- 日志分两级：
  - `console.log`（INFO）—— **脱敏摘要**，用于监控统计；
  - `console.debug`（DEBUG）—— 完整正文，仅在启用 debug 级日志时可见。
- 默认脱敏规则：字符串首尾保留 2 字/符，其余以 `*` 代替（例：`集成测试姓名 → 集成**姓名`）。
- 若部署环境对日志输出有合规要求（如 GDPR 删除），可在 [route.ts](src/app/api/contact/route.ts) 的 `maskPartial` 函数中替换为更严格策略（如只保留 Hash）。

---

## 🙌 贡献指南

1. Fork `main` 分支。
2. 新功能 / 修复：新建 `feat/<name>` 或 `fix/<issue-id>`。
3. 提交前执行：
   ```bash
   npm run lint && npm run typecheck
   ```
4. 提交 PR，标题遵循 Conventional Commits（`feat:`、`fix:`、`docs:`、`refactor:` …）。

---

## 📄 License

本项目为江苏华骋科技有限公司私有商业项目，所有内容受版权保护。
**未经书面授权，不得复制、分发、衍生使用。**

```
Copyright © 2025–2026 江苏华骋科技有限公司 (Jiangsu Huacheng Technology Co., Ltd.)
All rights reserved.
```

---

## 📞 联系我们

- **官网**：[https://www.huacheng-tech.com](https://www.huacheng-tech.com)
- **邮箱**：`contact@huacheng-tech.com`
- **地址**：江苏省泰州市高港区科技创业园
- **GitHub Issues**：对本项目代码的 Bug / Feature Request 请直接提 Issue。
