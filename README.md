# Phone Size Visualizer

## 访问网址
```
https://phonesize-six.vercel.app/
https://phonesize.pages.dev/
```

> 在电脑屏幕上以真实物理尺寸渲染手机大小的纯前端工具。

## 核心原理

通过屏幕 PPI（Pixels Per Inch）将手机的物理尺寸（mm）转换为 CSS 像素：

```
cssPixels = (phoneMm / 25.4) * ppi / devicePixelRatio
```

校准精度直接决定显示效果，提供三种校准路径覆盖不同用户场景。

## 功能

| 功能 | 说明 |
|------|------|
| PPI 校准 | 直接输入 / 屏幕尺寸计算 / 银行卡物理校准 |
| 手机库 | 356 款机型，17 个品牌，模糊搜索 |
| 自定义尺寸 | 输入任意宽高（mm） |
| 横竖屏 | 一键旋转，所有显示同步切换 |
| 多机对比 | 最多 6 款叠加，彩色虚线区分，支持增删清空 |
| 国际化 | 中 / 英双语，`localStorage` 记忆偏好 |
| 移动端检测 | 手机访问显示彩蛋提示 |

## 技术栈

- 零依赖，纯 HTML / CSS / JavaScript
- 无构建工具，无框架，直接运行
- 响应式布局（移动端检测后拦截）

## 开发方式

本项目 100% Vibe Coding，使用Clauce Code CLI接入小米mimo模型。

开发过程：提出想法 → AI 实现 → 测试反馈 → 修复调整 → 循环打磨

## 项目结构

```
├── index.html      # DOM 结构，校准弹窗 + 主界面
├── style.css       # 样式，含过渡动画和响应式
├── app.js          # 校准逻辑、渲染引擎、对比系统、i18n
├── phones.js       # 手机数据库（PHONES 数组）
└── README.md
```

## 快速开始

```bash
# 本地运行（任选一种）
python3 -m http.server 8080
npx serve .
open index.html

# 或直接双击 index.html
```

## 部署

静态站点，无后端依赖，支持任意托管平台：

- **GitHub Pages** — 推送后在仓库 Settings > Pages 启用
- **Vercel** — `vercel --prod`
- **Netlify** — 拖拽项目文件夹即可

## License

MIT
