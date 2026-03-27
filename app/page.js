import { Terminal, Rocket, Clock, Activity, Server } from "lucide-react"
import Link from "next/link"
import { Navigation, navItems } from "@/components/navigation"

const deploys = [
  { id: 1, name: "厦门旅行攻略", url: "http://106.12.56.109/", status: "success", time: "2026-03-26 18:32" },
  { id: 2, name: "部署控制台", url: "http://106.12.56.109:8080/", status: "success", time: "2026-03-26 18:32" }
]

// 动态获取定时任务
async function getCronJobs() {
  try {
    const res = await fetch('http://localhost:8080/api/cron', { cache: 'no-store' })
    const data = await res.json()
    return data.jobs || []
  } catch {
    return []  // 默认值
  }
}

// 解析 cron 表达式为可读文本
function parseCron(expr, jobName = '') {
  if (!expr) return ''
  
  // 一次性任务（日期格式，如 2026-04-16 09:00）
  if (expr.includes('-') && !expr.includes('*')) {
    const match = expr.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})/)
    if (match) {
      return `${match[2]}月${match[3]}日 ${match[4]}:${match[5]}`
    }
    return expr
  }
  
  // 解析 cron 表达式 (分 时 日 月 周)
  const parts = expr.split(' ')
  if (parts.length >= 2) {
    const min = parts[0].padStart(2, '0')
    const hour = parts[1].padStart(2, '0')
    const time = `${hour}:${min}`
    
    // 工作日格式 (1-5 = 周一到周五)
    if (parts[4] === '1-5') {
      return `每天 ${time} (工作日)`
    }
    // 每年某月某日 (如 0 9 16 4 *)
    if (parts[2] !== '*' && parts[3] !== '*') {
      return `${parts[3]}月${parts[2]}日 ${time}`
    }
    // 简单格式：每天
    if (parts[4] === '*') {
      return `每天 ${time}`
    }
  }
  return expr
}

export default async function HomePage() {
  const cronJobs = await getCronJobs()
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">部署控制台</h1>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/deployments" className="p-6 rounded-lg border bg-card hover:bg-accent/20 transition-colors">
            <div className="flex items-center gap-3">
              <Rocket className="w-8 h-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{deploys.length}</div>
                <div className="text-sm text-muted-foreground">部署项目</div>
              </div>
            </div>
          </Link>
          
          <Link href="/cron" className="p-6 rounded-lg border bg-card hover:bg-accent/20 transition-colors">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{cronJobs.length}</div>
                <div className="text-sm text-muted-foreground">定时任务</div>
              </div>
            </div>
          </Link>

          <Link href="/server" className="p-6 rounded-lg border bg-card hover:bg-accent/20 transition-colors">
            <div className="flex items-center gap-3">
              <Server className="w-8 h-8 text-cyan-500" />
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">服务端口</div>
              </div>
            </div>
          </Link>

          <Link href="/logs" className="p-6 rounded-lg border bg-card hover:bg-accent/20 transition-colors">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">最近日志</div>
              </div>
            </div>
          </Link>
        </div>

        {/* 快捷入口 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <div className="space-y-2">
              {deploys.map(d => (
                <a key={d.id} href={d.url} target="_blank" className="flex items-center justify-between p-3 rounded bg-muted/50 hover:bg-muted transition-colors">
                  <span>{d.name}</span>
                  <span className="text-xs text-green-500">✓ 运行中</span>
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-4">即将执行</h3>
            <div className="space-y-2">
              {cronJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between p-3 rounded bg-muted/50">
                  <span>{job.name}</span>
                  <span className="text-xs text-muted-foreground">{parseCron(job.schedule)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>🦞 部署控制台 v2.0</p>
        </div>
      </footer>
    </div>
  )
}
