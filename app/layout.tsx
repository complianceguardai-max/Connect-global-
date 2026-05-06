import './globals.css'
export const metadata = { title: 'ConnectGlobal AI', description: 'One Interface' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
