import { ArrowLeft, Package, Wrench, Brain, Search, Globe, MessageSquare, Rocket, Calendar, Shield, Database, Code, FileText, Map, Camera, Video, BookOpen, Mail, Shopping, Cloud, Terminal, Cpu, Sparkles } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

// 技能列表及其中文描述
const skills = [
  { name: "agent-browser", icon: Globe, desc: "浏览器自动化 - 通过 AI 控制浏览器进行自动化操作", category: "tools" },
  { name: "ai-notes-ofvideo", icon: Video, desc: "视频 AI 笔记 - 自动提取视频中的关键信息生成笔记", category: "efficiency" },
  { name: "baidu-baike-data", icon: BookOpen, desc: "百度百科数据 - 查询和获取百度百科词条信息", category: "data" },
  { name: "baidu-scholar-search-skill", icon: Search, desc: "百度学术搜索 - 搜索学术论文和研究资料", category: "academic" },
  { name: "baidu-search", icon: Search, desc: "百度搜索 - 使用百度搜索引擎查找信息", category: "search" },
  { name: "brainstorming", icon: Brain, desc: "头脑风暴 - 创造性思考和问题解决", category: "thinking" },
  { name: "brave-search", icon: Search, desc: "Brave 搜索 - 使用 Brave 搜索 API 进行网络搜索", category: "search" },
  { name: "competitor-alternatives", icon: Package, desc: "竞品对比 - 竞品分析和替代方案对比", category: "business" },
  { name: "copywriting", icon: MessageSquare, desc: "文案撰写 - 广告文案和销售文案撰写", category: "marketing" },
  { name: "dashboard-changelog", icon: FileText, desc: "更新日志 - 部署控制台更新日志管理", category: "tools" },
  { name: "deepresearch-conversation", icon: Search, desc: "深度研究 - 深入研究和分析复杂话题", category: "research" },
  { name: "executing-plans", icon: Rocket, desc: "执行计划 - 按照计划执行复杂任务", category: "tools" },
  { name: "find-skills", icon: Search, desc: "技能查找 - 查找和安装新技能", category: "tools" },
  { name: "marketing-ideas", icon: Lightbulb, desc: "营销创意 - 营销策略和增长 ideas", category: "marketing" },
  { name: "mcporter", icon: Package, desc: "MCP 管理器 - 管理 MCP 服务器和工具", category: "dev" },
  { name: "permission-manager", icon: Shield, desc: "权限管理 - 用户权限和资源限制管理", category: "admin" },
  { name: "react", icon: Code, desc: "React 开发 - React 19 全栈开发", category: "dev" },
  { name: "self-improving", icon: Brain, desc: "自我改进 - 自我反思和持续学习", category: "ai" },
  { name: "self-improving-agent", icon: Sparkles, desc: "自我改进代理 - 捕获错误并持续优化", category: "ai" },
  { name: "seo-audit", icon: Search, desc: "SEO 审计 - 网站搜索引擎优化诊断", category: "marketing" },
  { name: "shadcn", icon: Code, desc: "shadcn/ui - 组件库和 UI 开发", category: "dev" },
  { name: "skill-creator", icon: Wrench, desc: "技能创建 - 创建新的 AI 技能", category: "tools" },
  { name: "skillhub-preference", icon: Package, desc: "技能市场偏好 - 技能安装偏好设置", category: "tools" },
  { name: "skill-vetter", icon: Shield, desc: "技能审查 - 安装前安全检查", category: "security" },
  { name: "social-content", icon: MessageSquare, desc: "社交内容 - 社交媒体内容创作", category: "marketing" },
  { name: "travel", icon: Map, desc: "旅行管理 - 旅行规划和记忆", category: "life" },
  { name: "travel-destination-brochure", icon: Map, desc: "旅行手册 - 目的地介绍和视频生成", category: "travel" },
  { name: "travel-itinerary-planner", icon: Calendar, desc: "行程规划 - 自动生成旅行计划", category: "travel" },
  { name: "travel-manager", icon: Map, desc: "旅行经理 - 综合旅行规划和管理", category: "travel" },
  { name: "web", icon: Globe, desc: "Web 开发 - 网站构建和部署", category: "dev" },
  { name: "web-deploy-github", icon: Rocket, desc: "GitHub 部署 - 自动部署到 GitHub Pages", category: "dev" },
  { name: "website-generator", icon: Globe, desc: "网站生成器 - AI 快速生成网站", category: "dev" },
]

// MCP 服务器列表（待添加）
const mcpServers = []

const categoryColors = {
  "tools": "bg-blue-500/20 text-blue-500",
  "efficiency": "bg-green-500/20 text-green-500",
  "data": "bg-purple-500/20 text-purple-500",
  "academic": "bg-yellow-500/20 text-yellow-500",
  "search": "bg-gray-500/20 text-gray-500",
  "thinking": "bg-pink-500/20 text-pink-500",
  "business": "bg-orange-500/20 text-orange-500",
  "marketing": "bg-red-500/20 text-red-500",
  "research": "bg-indigo-500/20 text-indigo-500",
  "dev": "bg-cyan-500/20 text-cyan-500",
  "admin": "bg-slate-500/20 text-slate-500",
  "ai": "bg-violet-500/20 text-violet-500",
  "security": "bg-red-600/20 text-red-600",
  "life": "bg-emerald-500/20 text-emerald-500",
  "travel": "bg-teal-500/20 text-teal-500",
}

// 添加缺失的 Lightbulb 图标
function Lightbulb({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
      <path d="M9 18h6"/>
      <path d="M10 22h4"/>
    </svg>
  )
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Package className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold">技能中心</h1>
                <p className="text-sm text-muted-foreground">Skills & MCP</p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 技能统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-purple-500">{skills.length}</div>
            <div className="text-sm text-muted-foreground">总技能数</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-blue-500">{new Set(skills.map(s => s.category)).size}</div>
            <div className="text-sm text-muted-foreground">分类数</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-green-500">{mcpServers.length}</div>
            <div className="text-sm text-muted-foreground">MCP 服务器</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-orange-500">0</div>
            <div className="text-sm text-muted-foreground">MCP 已连接</div>
          </div>
        </div>

        {/* MCP 服务器列表 */}
        <div className="rounded-lg border bg-card overflow-hidden mb-8">
          <div className="bg-muted/50 p-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium">MCP 服务器</span>
            </div>
            <span className="text-xs text-muted-foreground">{mcpServers.length} 个</span>
          </div>
          {mcpServers.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Cpu className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>暂无 MCP 服务器</p>
              <p className="text-sm mt-1">安装 MCP 服务器后将在此显示</p>
            </div>
          ) : (
            <div className="divide-y">
              {mcpServers.map((server, i) => (
                <div key={i} className="p-4">
                  <div className="font-medium">{server.name}</div>
                  <div className="text-sm text-muted-foreground">{server.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 技能列表 */}
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="bg-muted/50 p-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">技能列表</span>
            </div>
            <span className="text-xs text-muted-foreground">{skills.length} 个技能</span>
          </div>
          <div className="divide-y">
            {skills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <div key={i} className="p-4 hover:bg-muted/30">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-muted rounded-lg flex-shrink-0">
                      <Icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium font-mono text-sm">{skill.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${categoryColors[skill.category] || 'bg-muted'}`}>
                          {skill.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{skill.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>🦞 部署控制台 v2.0 - 技能中心</p>
        </div>
      </footer>
    </div>
  )
}
