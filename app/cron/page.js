"use client"

import { useState, useEffect } from "react"
import { Terminal, Clock, Calendar, Heart, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function CronPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从 API 获取定时任务
    fetch('/api/cron')
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []))
      .catch(() => {
        // 如果API失败，使用静态数据
        setJobs([
          { id: "dd53773c", name: "起床提醒-工作日", schedule: "工作日 7:50", type: "cron", status: "active", description: "提前10分钟提醒该起床了" },
          { id: "d0ac48c", name: "开始上班啦", schedule: "工作日 9:20", type: "cron", status: "active", description: "提醒开始上班" },
          { id: "7b2173d", name: "吃饭啦", schedule: "工作日 11:50", type: "cron", status: "active", description: "午餐时间到啦" },
          { id: "efa2876", name: "要加班啦", schedule: "工作日 18:20", type: "cron", status: "active", description: "开始加班啦" },
          { id: "b9153e6", name: "下班啦", schedule: "工作日 18:30", type: "cron", status: "active", description: "下班时间到" },
          { id: "15b7e20e", name: "恋爱纪念日-每年", schedule: "每年 4月16日 09:00", type: "cron", status: "active", description: "恋爱纪念日提醒" },
          { id: "bc869bf4", name: "恋爱纪念日-2周年", schedule: "2026-04-16 09:00", type: "one-time", status: "pending", description: "2周年纪念日" },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const getJobIcon = (name) => {
    if (name.includes("起床") || name.includes("上班") || name.includes("下班") || name.includes("加班")) {
      return <Clock className="w-5 h-5 text-blue-400" />
    }
    if (name.includes("吃饭") || name.includes("午餐")) {
      return <Clock className="w-5 h-5 text-orange-400" />
    }
    if (name.includes("恋爱") || name.includes("纪念日")) {
      return <Heart className="w-5 h-5 text-pink-400" />
    }
    return <Calendar className="w-5 h-5 text-purple-400" />
  }

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
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold">定时任务</h1>
                <p className="text-sm text-muted-foreground">Cron Jobs ({jobs.length})</p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="p-6 rounded-lg border bg-card hover:bg-accent/10 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      {getJobIcon(job.name)}
                      <h3 className="text-lg font-semibold">{job.name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        job.status === "active" 
                          ? "bg-green-500/20 text-green-500" 
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}>
                        {job.status === "active" ? "运行中" : "等待中"}
                      </span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                        {job.type === "cron" ? "循环" : "一次性"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>调度: {job.schedule}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">ID: {job.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>🦞 部署控制台 v2.0</p>
        </div>
      </footer>
    </div>
  )
}
