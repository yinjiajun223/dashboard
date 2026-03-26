import './globals.css'

export const metadata = {
  title: '小龙虾控制台',
  description: '部署管理后台',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
