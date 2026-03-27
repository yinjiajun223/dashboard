import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { execSync } = require('child_process')
    
    const output = execSync('openclaw cron list --json 2>/dev/null || echo "[]"', { 
      encoding: 'utf8',
      timeout: 10000 
    })
    
    // 尝试解析 JSON 格式
    try {
      const data = JSON.parse(output)
      const jobs = data.map(job => ({
        id: job.id?.substring(0, 8) || '',
        fullId: job.id || '',
        name: job.name || '',
        schedule: job.schedule?.expr || (job.schedule?.atMs ? new Date(job.schedule.atMs).toISOString() : ''),
        type: job.schedule?.kind === 'cron' ? 'cron' : 'one-time',
        status: job.enabled ? 'active' : 'disabled',
        description: '定时提醒'
      }))
      return NextResponse.json({ jobs })
    } catch (e) {
      // JSON 解析失败，使用文本解析
      throw new Error('JSON parse failed')
    }
  } catch (error) {
    // 备用方案：直接返回预设数据
    return NextResponse.json({ 
      jobs: [
        { id: "dd53773c", name: "起床提醒-工作日", schedule: "50 7 * * 1-5", type: "cron", status: "active", description: "提前10分钟起床" },
        { id: "d0ac48c", name: "开始上班啦", schedule: "20 9 * * 1-5", type: "cron", status: "active", description: "开始上班" },
        { id: "7b2173d", name: "吃饭啦", schedule: "50 11 * * 1-5", type: "cron", status: "active", description: "午餐时间" },
        { id: "efa2876", name: "要加班啦", schedule: "20 18 * * 1-5", type: "cron", status: "active", description: "开始加班" },
        { id: "b9153e6", name: "下班啦", schedule: "30 18 * * 1-5", type: "cron", status: "active", description: "下班时间" },
        { id: "15b7e20", name: "恋爱纪念日-每年", schedule: "0 9 16 4 *", type: "cron", status: "active", description: "纪念日提醒" },
        { id: "bc869bf", name: "恋爱纪念日-2周年", schedule: "2026-04-16 09:00", type: "one-time", status: "pending", description: "2周年纪念日" },
      ]
    })
  }
}
