# 部署控制台 (Deployment Console)

基于 Next.js 的服务器部署管理面板，支持部署项目管理、定时任务调度、日志查看等功能。

## 功能特性

- 📊 **仪表盘** - 服务器状态概览
- 🚀 **部署管理** - 部署项目列表与状态
- ⏰ **定时任务** - Cron 任务管理与调度
- 📝 **日志查看** - 实时日志输出
- 🖥️ **服务器信息** - 系统资源监控
- 💡 **技能中心** - 查看已安装的技能
- 📜 **更新日志** - 版本更新记录

## 技术栈

- Next.js 14 (App Router)
- Tailwind CSS
- Lucide Icons

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
npm start
```

## 目录结构

```
dashboard/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   ├── changelog/         # 更新日志页面
│   ├── cron/              # 定时任务页面
│   ├── deployments/       # 部署管理页面
│   ├── logs/              # 日志页面
│   ├── server/            # 服务器信息页面
│   ├── skills/            # 技能中心页面
│   ├── layout.js          # 根布局
│   ├── page.js            # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
├── lib/                   # 工具库
├── public/                # 静态资源
└── package.json           # 项目配置
```

## 部署

支持 Vercel 一键部署，或自托管：

```bash
npm run build
npm start
```

默认端口：8080

## 许可证

MIT
