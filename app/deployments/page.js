import { Terminal, Rocket, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

const deployments = [
  { 
    id: 1, 
    name: "厦门旅行攻略", 
    url: "http://106.12.56.109/", 
    description: "厦门4天3夜旅游攻略网页",
    status: "success", 
    time: "2026-03-26 18:32",
    type: "static"
  },
  { 
    id: 2, 
    name: "部署控制台", 
    url: "http://106.12.56.109:8080/", 
    description: "部署记录管理后台 (Next.js)",
    status: "success", 
    time: "2026-03-26 18:32",
    type: "nextjs"
  }
]

export default function DeploymentsPage() {
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
                <h1 className="text-xl font-bold">部署记录</h1>
                <p className="text-sm text-muted-foreground">Deployments</p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {deployments.map((deploy) => (
            <div key={deploy.id} className="p-6 rounded-lg border bg-card hover:bg-accent/10 transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{deploy.name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      deploy.status === "success" 
                        ? "bg-green-500/20 text-green-500" 
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}>
                      {deploy.status === "success" ? "已部署" : "部署中"}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                      {deploy.type}
                    </span>
                  </div>
                  <a 
                    href={deploy.url} 
                    target="_blank" 
                    className="text-sm text-primary hover:underline block"
                  >
                    {deploy.url}
                  </a>
                  <p className="text-sm text-muted-foreground">{deploy.description}</p>
                  <p className="text-xs text-muted-foreground">部署时间: {deploy.time}</p>
                </div>
              </div>
            </div>
          ))}
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
