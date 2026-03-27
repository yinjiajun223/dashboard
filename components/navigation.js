"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, Rocket, Clock, Server, FileText, Menu, X, Sun, Moon, GitCommit, Package } from "lucide-react"

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/deployments", label: "部署", icon: Rocket },
  { href: "/cron", label: "定时", icon: Clock },
  { href: "/server", label: "服务器", icon: Server },
  { href: "/logs", label: "日志", icon: FileText },
  { href: "/changelog", label: "更新", icon: GitCommit },
  { href: "/skills", label: "技能", icon: Package },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    // 从本地存储加载主题
    const saved = localStorage.getItem("theme")
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle("dark", saved === "dark")
    }
    // 默认已经是深色，由 layout.js 设置
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <div className="flex items-center gap-2">
      <nav className={`
        ${isOpen ? 'absolute right-0 top-full mt-2 w-48 bg-card border rounded-lg shadow-lg p-2 z-50' : 'hidden'}
        md:flex md:items-center md:gap-1
      `}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* 主题切换 */}
      <button
        onClick={toggleTheme}
        className="p-2 hover:bg-muted rounded-lg transition-colors"
        title={theme === "dark" ? "切换亮色" : "切换深色"}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700" />
        )}
      </button>

      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 hover:bg-muted rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  )
}

export { navItems }
