import './globals.css'

export const metadata = {
  title: '小龙虾控制台',
  description: '部署管理后台',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 用户手动设置过主题，优先使用
                var userTheme = localStorage.getItem('theme');
                if (userTheme) {
                  document.documentElement.classList.add(userTheme);
                  return;
                }
                
                // 根据时间自动判断主题：白天(6:00-18:00)用日间模式
                var hour = new Date().getHours();
                var theme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
