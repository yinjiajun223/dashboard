import { Terminal, ArrowLeft, CheckCircle, Plus, Rocket } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

function getChangelog() {
  try {
    const { readFileSync, existsSync } = require('fs')
    const changelogPath = '/tmp/dashboard-changelog.json'
    
    if (existsSync(changelogPath)) {
      const content = readFileSync(changelogPath, 'utf8')
      return JSON.parse(content)
    }
  } catch (e) {
    // ignore
  }
  
  // 默认数据
  return [
    { date: "2026-03-27", time: "09:24", type: "fix", title: "解决定时任务重复问题", desc: "删除系统crontab重复任务，保留OpenClaw内置cron", author: "小龙虾" },
    { date: "2026-03-27", time: "09:51", type: "feature", title: "恢复部署服务", desc: "恢复80/8080端口服务，设置开机自启", author: "小龙虾" },
    { date: "2026-03-27", time: "09:53", type: "feature", title: "自动主题切换", desc: "白天light/晚上dark，根据时间自动切换", author: "小龙虾" },
  ]
}

const changelog = getChangelog()

const typeColors = {
  feature: "bg-blue-500/20 text-blue-500",
  fix: "bg-green-500/20 text-green-500",
  update: "bg-purple-500/20 text-purple-500",
}

const typeLabels = {
  feature: "新功能",
  fix: "问题修复",
  update: "更新优化",
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Rocket className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold">更新日志</h1>
                <p className="text-sm text-muted-foreground">Changelog</p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border bg-card overflow-hidden">
          <div className="bg-muted/50 p-3 border-b flex items-center justify-between">
            <span className="text-sm font-medium">更新历史</span>
            <span className="text-xs text-muted-foreground">{changelog.length} 条记录</span>
          </div>
          <div className="divide-y">
            {changelog.map((item, i) => (
              <div key={i} className="p-4 hover:bg-muted/30">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{item.title}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${typeColors[item.type] || 'bg-muted'}`}>
                        {typeLabels[item.type] || item.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{item.date} {item.time}</span>
                      <span>by {item.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>🦞 部署控制台 v2.0 - 更新日志</p>
        </div>
      </footer>
    </div>
  )
}
