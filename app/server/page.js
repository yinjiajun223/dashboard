import { Terminal, Server, ArrowLeft, Cpu, HardDrive, Activity, Clock } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

// 服务器数据 (静态示例 - 实际可以从API获取)
const serverData = {
  hostname: "instance-9rhp2rf3",
  os: "Linux 6.8.0-71-generic (x64)",
  uptime: "23:14",
  cpu: "1核 (平均负载 0.08)",
  memory: { total: "3.8Gi", used: "1.2Gi", available: "2.7Gi", percent: 32 },
  disk: { total: "50G", used: "11G", available: "37G", percent: 22 },
  ports: [
    { port: 80, name: "旅行网站", status: "running" },
    { port: 8080, name: "控制台", status: "running" },
    { port: 18789, name: "OpenClaw Gateway", status: "running" },
  ],
  services: [
    { name: "OpenClaw Gateway", pid: 13774, cpu: 0.6, mem: 16.2, status: "running" },
    { name: "Next.js Dashboard", pid: 41727, cpu: 0.4, mem: 2.3, status: "running" },
    { name: "heyeAgent", pid: 1626, cpu: 0.1, mem: 1.8, status: "running" },
  ]
}

export default function ServerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Server className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold">服务器状态</h1>
                <p className="text-sm text-muted-foreground">Server Status</p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 系统信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5" /> 系统信息
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">主机名</span>
                <span>{serverData.hostname}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">操作系统</span>
                <span>{serverData.os}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">运行时间</span>
                <span>{serverData.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CPU</span>
                <span>{serverData.cpu}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HardDrive className="w-5 h-5" /> 资源使用
            </h3>
            
            {/* 内存 */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>内存</span>
                <span>{serverData.memory.used} / {serverData.memory.total} ({serverData.memory.percent}%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${serverData.memory.percent}%` }} />
              </div>
            </div>

            {/* 磁盘 */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>磁盘</span>
                <span>{serverData.disk.used} / {serverData.disk.total} ({serverData.disk.percent}%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${serverData.disk.percent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* 端口 */}
        <div className="p-6 rounded-lg border bg-card mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" /> 端口状态
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serverData.ports.map((p) => (
              <div key={p.port} className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg">:{p.port}</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-500">
                    {p.status === "running" ? "运行中" : "停止"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{p.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 进程 */}
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" /> 进程列表
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">服务</th>
                  <th className="text-left py-2 px-3">PID</th>
                  <th className="text-left py-2 px-3">CPU</th>
                  <th className="text-left py-2 px-3">内存</th>
                  <th className="text-left py-2 px-3">状态</th>
                </tr>
              </thead>
              <tbody>
                {serverData.services.map((svc, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 px-3">{svc.name}</td>
                    <td className="py-2 px-3 font-mono text-muted-foreground">{svc.pid}</td>
                    <td className="py-2 px-3">{svc.cpu}%</td>
                    <td className="py-2 px-3">{svc.mem}%</td>
                    <td className="py-2 px-3">
                      <span className="text-green-500">● 运行中</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
