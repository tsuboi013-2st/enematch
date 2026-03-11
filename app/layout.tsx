import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'エネマッチ - 系統用蓄電所・太陽光発電所マッチングプラットフォーム',
  description: '完全無料！系統用蓄電所・太陽光発電所の売買マッチングサイト。高圧・特高蓄電池、メガソーラーから低圧太陽光まで、豊富な案件を掲載。',
  keywords: '系統用蓄電所, 太陽光発電, メガソーラー, 再生可能エネルギー, 売買, マッチング, FIT',
  openGraph: {
    title: 'エネマッチ - 完全無料のエネルギー資産マッチング',
    description: '系統用蓄電所・太陽光発電所の売買プラットフォーム',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
