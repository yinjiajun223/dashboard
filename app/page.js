'use client'

import { useState, useEffect } from 'react'

// 模拟数据（实际会用 Gist API）
const mockCronJobs = [
  { id: '1', name: '恋爱纪念日-2周年', schedule: '2026-04-16 09:00', status: 'idle', nextRun: '21天后' },
  { id: '2', name: '恋爱纪念日-每年', schedule: '每年4月16日 09:00', status: 'idle', nextRun: '21天后' },
]

const mockDeployments = [
  { id: '1', name: '示例网站', url: 'https://example.vercel.app', date: '2026-03-26', status: 'success' },
]

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [cronJobs, setCronJobs] = useState([])
  const [deployments, setDeployments] = useState([])
  const [loading, setLoading] = useState(false)

  // 登录
  const handleLogin = (e) => {
    e.preventDefault()
    if (password === '5201314') {
      setIsLoggedIn(true)
      localStorage.setItem('dashboard_password', password)
    } else {
      alert('密码错误')
    }
  }

  // 检查登录状态
  useEffect(() => {
    const saved = localStorage.getItem('dashboard_password')
    if (saved === '5201314') {
      setIsLoggedIn(true)
    }
  }, [])

  // 加载数据
  useEffect(() => {
    if (isLoggedIn) {
      setCronJobs(mockCronJobs)
      setDeployments(mockDeployments)
    }
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
          <h1 className="text-2xl font-bold mb-6 text-center">🦞 小龙虾后台</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 mb-4 focus:border-orange-500 focus:outline-none"
          />
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 p-3 rounded font-bold">
            登录
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* 顶部导航 */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">🦞 小龙虾控制台</h1>
          <button
            onClick={() => { setIsLoggedIn(false); localStorage.removeItem('dashboard_password') }}
            className="text-gray-400 hover:text-white"
          >
            退出
          </button>
        </div>
      </nav>

      {/* 标签页 */}
      <div className="max-w-6xl mx-auto mt-6 px-6">
        <div className="flex gap-4 border-b border-gray-700 pb-2">
          {['dashboard', 'cron', 'deployments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-t ${
                activeTab === tab
                  ? 'bg-gray-800 text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'dashboard' && '📊 总览'}
              {tab === 'cron' && '⏰ 定时任务'}
              {tab === 'deployments' && '🚀 部署记录'}
            </button>
          ))}
        </div>

        {/* 内容区 */}
        <div className="bg-gray-800 rounded-b rounded-tr p-6 mt-2">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="text-3xl font-bold text-orange-500">{cronJobs.length}</div>
                <div className="text-gray-400 mt-2">定时任务</div>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-500">{deployments.length}</div>
                <div className="text-gray-400 mt-2">部署项目</div>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-500">1</div>
                <div className="text-gray-400 mt-2">运行中项目</div>
              </div>
            </div>
          )}

          {activeTab === 'cron' && (
            <div>
              <h2 className="text-xl font-bold mb-4">定时任务列表</h2>
              {cronJobs.length === 0 ? (
                <p className="text-gray-400">暂无定时任务</p>
              ) : (
                <div className="space-y-3">
                  {cronJobs.map((job) => (
                    <div key={job.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="font-bold">{job.name}</div>
                        <div className="text-gray-400 text-sm mt-1">{job.schedule}</div>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-900 text-green-400 px-2 py-1 rounded text-sm">
                          {job.status}
                        </span>
                        <div className="text-gray-400 text-sm mt-1">{job.nextRun}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'deployments' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">部署记录</h2>
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm">
                  + 新建部署
                </button>
              </div>
              {deployments.length === 0 ? (
                <p className="text-gray-400">暂无部署记录</p>
              ) : (
                <div className="space-y-3">
                  {deployments.map((dep) => (
                    <div key={dep.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="font-bold">{dep.name}</div>
                        <a href={dep.url} target="_blank" className="text-blue-400 text-sm hover:underline">
                          {dep.url}
                        </a>
                        <div className="text-gray-400 text-sm mt-1">{dep.date}</div>
                      </div>
                      <span className="bg-green-900 text-green-400 px-2 py-1 rounded text-sm">
                        {dep.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
