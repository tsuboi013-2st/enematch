'use client';

import Link from 'next/link';
import { useState } from 'react';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';

export default function Home() {
  const [searchType, setSearchType] = useState<string>('all');
  const [searchArea, setSearchArea] = useState<string>('');

  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);
  const recentProperties = properties.slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchType !== 'all') query.append('type', searchType);
    if (searchArea) query.append('prefecture', searchArea);
    window.location.href = `/properties?${query.toString()}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold inline-block">
                ✨ 完全無料のマッチングプラットフォーム
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              エネルギー資産を<br />
              簡単に売買できる
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              系統用蓄電所・太陽光発電所の売買なら<br className="md:hidden" />エネマッチ
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
                    物件種別
                  </label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-gray-800"
                  >
                    <option value="all">すべて</option>
                    <option value="battery">系統用蓄電池</option>
                    <option value="solar">太陽光発電</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2 text-left">
                    エリア
                  </label>
                  <select
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-gray-800"
                  >
                    <option value="">全国</option>
                    <option value="北海道">北海道</option>
                    <option value="青森県">青森県</option>
                    <option value="岩手県">岩手県</option>
                    <option value="宮城県">宮城県</option>
                    <option value="福島県">福島県</option>
                    <option value="茨城県">茨城県</option>
                    <option value="栃木県">栃木県</option>
                    <option value="群馬県">群馬県</option>
                    <option value="千葉県">千葉県</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="新潟県">新潟県</option>
                    <option value="長野県">長野県</option>
                    <option value="静岡県">静岡県</option>
                    <option value="愛知県">愛知県</option>
                    <option value="三重県">三重県</option>
                    <option value="岐阜県">岐阜県</option>
                    <option value="京都府">京都府</option>
                    <option value="大阪府">大阪府</option>
                    <option value="兵庫県">兵庫県</option>
                    <option value="岡山県">岡山県</option>
                    <option value="広島県">広島県</option>
                    <option value="山口県">山口県</option>
                    <option value="福岡県">福岡県</option>
                    <option value="鹿児島県">鹿児島県</option>
                    <option value="宮崎県">宮崎県</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-primary-600 hover:to-accent-600 shadow-lg"
                  >
                    🔍 物件を検索
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600 text-left">
                <Link href="/properties" className="text-primary-600 hover:text-primary-700 font-medium">
                  詳細検索はこちら →
                </Link>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">30+</div>
                <div className="text-sm text-white/80">掲載物件</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">1,250+</div>
                <div className="text-sm text-white/80">登録ユーザー</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold mb-1">¥0</div>
                <div className="text-sm text-white/80">完全無料</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Space */}
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">【広告掲載スペース - Google AdSense】</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ⭐ 注目の物件
            </h2>
            <p className="text-gray-600">
              高利回り・プレミアム物件をピックアップ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/properties"
              className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600"
            >
              すべての物件を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              物件カテゴリー
            </h2>
            <p className="text-gray-600">
              お探しの物件種別からお選びください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Battery - Tokko */}
            <Link
              href="/properties?type=battery&category=tokko"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 text-primary-600 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600">
                    系統用蓄電池（特高）
                  </h3>
                  <p className="text-sm text-gray-500">特高連系 30MW以上</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                大規模蓄電所、容量市場・需給調整市場で安定収益
              </p>
              <div className="text-primary-600 font-semibold">
                {properties.filter(p => p.type === 'battery' && p.category === 'tokko').length}件
              </div>
            </Link>

            {/* Battery - Kouatsu */}
            <Link
              href="/properties?type=battery&category=kouatsu"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 text-primary-600 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600">
                    系統用蓄電池（高圧）
                  </h3>
                  <p className="text-sm text-gray-500">高圧連系 1-10MW</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                VPP・需給調整市場参入に最適な規模
              </p>
              <div className="text-primary-600 font-semibold">
                {properties.filter(p => p.type === 'battery' && p.category === 'kouatsu').length}件
              </div>
            </Link>

            {/* Solar - Mega */}
            <Link
              href="/properties?type=solar&category=mega"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-accent-100 text-accent-600 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-accent-600">
                    メガソーラー
                  </h3>
                  <p className="text-sm text-gray-500">1MW以上</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                大規模太陽光発電所、高FIT案件多数
              </p>
              <div className="text-accent-600 font-semibold">
                {properties.filter(p => p.type === 'solar' && p.category === 'mega').length}件
              </div>
            </Link>

            {/* Solar - Kouatsu */}
            <Link
              href="/properties?type=solar&category=kouatsu"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-accent-100 text-accent-600 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-accent-600">
                    高圧太陽光
                  </h3>
                  <p className="text-sm text-gray-500">50kW-1MW</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                中規模太陽光、管理しやすい人気サイズ
              </p>
              <div className="text-accent-600 font-semibold">
                {properties.filter(p => p.type === 'solar' && p.category === 'kouatsu').length}件
              </div>
            </Link>

            {/* Solar - Teipatsu */}
            <Link
              href="/properties?type=solar&category=teipatsu"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-accent-100 text-accent-600 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-accent-600">
                    低圧太陽光
                  </h3>
                  <p className="text-sm text-gray-500">50kW未満</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                個人投資家に人気、手軽に始められる
              </p>
              <div className="text-accent-600 font-semibold">
                {properties.filter(p => p.type === 'solar' && p.category === 'teipatsu').length}件
              </div>
            </Link>

            {/* Rights */}
            <Link
              href="/properties?status=rights"
              className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 text-orange-600 rounded-lg p-3 mr-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600">
                    権利案件
                  </h3>
                  <p className="text-sm text-gray-500">土地+ID</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                開発用地・ID取得済み、カスタマイズ可能
              </p>
              <div className="text-orange-600 font-semibold">
                {properties.filter(p => p.status === 'rights').length}件
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              最新の物件
            </h2>
            <p className="text-gray-600">
              新着物件をいち早くチェック
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {recentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/properties"
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900"
            >
              新着物件一覧 →
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              エネマッチが選ばれる理由
            </h2>
            <p className="text-gray-600">
              完全無料で使いやすい、安心のマッチングプラットフォーム
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">完全無料</h3>
              <p className="text-gray-600">
                会員登録・物件掲載・問い合わせ、すべて0円。広告収益モデルで運営しています。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="bg-accent-100 text-accent-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">豊富な物件数</h3>
              <p className="text-gray-600">
                系統用蓄電所から太陽光発電所まで、全国の物件を網羅。希望の案件が見つかります。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">安心の取引</h3>
              <p className="text-gray-600">
                詳細な物件情報・収益シミュレーター完備。売主・買主双方が納得できる取引をサポート。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            今すぐ無料で始めましょう
          </h2>
          <p className="text-xl mb-8 text-white/90">
            会員登録は1分で完了。物件の検索・掲載がすぐにできます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 shadow-lg"
            >
              無料会員登録
            </Link>
            <Link
              href="/properties"
              className="bg-primary-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-800 border-2 border-white shadow-lg"
            >
              物件を探す
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
