import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">エネマッチ</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              系統用蓄電所・太陽光発電所の<br />
              売買マッチングプラットフォーム
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">物件を探す</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/properties?type=battery&category=tokko" className="hover:text-white">系統用蓄電池（特高）</Link></li>
              <li><Link href="/properties?type=battery&category=kouatsu" className="hover:text-white">系統用蓄電池（高圧）</Link></li>
              <li><Link href="/properties?type=solar&category=mega" className="hover:text-white">太陽光（メガソーラー）</Link></li>
              <li><Link href="/properties?type=solar&category=kouatsu" className="hover:text-white">太陽光（高圧）</Link></li>
              <li><Link href="/properties?type=solar&category=teipatsu" className="hover:text-white">太陽光（低圧）</Link></li>
              <li><Link href="/properties?status=rights" className="hover:text-white">権利案件</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-lg">サービス</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/register" className="hover:text-white">無料会員登録</Link></li>
              <li><Link href="/properties/new" className="hover:text-white">物件を掲載する</Link></li>
              <li><Link href="/guide" className="hover:text-white">ご利用ガイド</Link></li>
              <li><Link href="/about" className="hover:text-white">サービス案内</Link></li>
              <li><Link href="/faq" className="hover:text-white">よくある質問</Link></li>
              <li><Link href="/contact" className="hover:text-white">お問い合わせ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-lg">運営情報</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/company" className="hover:text-white">会社概要</Link></li>
              <li><Link href="/terms" className="hover:text-white">利用規約</Link></li>
              <li><Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link></li>
              <li><Link href="/legal" className="hover:text-white">特定商取引法に基づく表記</Link></li>
            </ul>
            <div className="mt-6">
              <p className="text-gray-400 text-xs">
                〒100-0001<br />
                東京都千代田区千代田1-1<br />
                TEL: 03-1234-5678<br />
                Email: info@enematch.jp
              </p>
            </div>
          </div>
        </div>

        {/* Ad space notice */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm">【広告掲載スペース】</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2026 EneMatch (エネマッチ). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
