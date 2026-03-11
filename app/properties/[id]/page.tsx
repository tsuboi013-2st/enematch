'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { properties } from '@/data/properties';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const property = properties.find(p => p.id === resolvedParams.id);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Simulator state
  const [simulatorData, setSimulatorData] = useState({
    initialInvestment: property?.price || 0,
    annualRevenue: 0,
    annualCost: 0,
    years: 20,
  });

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">物件が見つかりません</h1>
        <Link href="/properties" className="text-primary-600 hover:text-primary-700">
          物件一覧に戻る →
        </Link>
      </div>
    );
  }

  // Calculate simulator results
  const calculateSimulator = () => {
    if (property.yield > 0) {
      const annualRevenue = (property.price * property.yield) / 100;
      setSimulatorData(prev => ({
        ...prev,
        annualRevenue: annualRevenue,
        annualCost: annualRevenue * 0.15, // Assume 15% operating cost
      }));
    }
  };

  useEffect(() => {
  calculateSimulator();
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 100000000) {
      return `${(price / 100000000).toFixed(1)}億円`;
    } else if (price >= 10000) {
      return `${(price / 10000).toFixed(0)}万円`;
    }
    return `${price.toLocaleString()}円`;
  };

  const getTypeLabel = () => {
    if (property.type === 'battery') {
      return property.category === 'tokko' ? '系統用蓄電池（特高）' : '系統用蓄電池（高圧）';
    } else {
      if (property.category === 'mega') return 'メガソーラー';
      if (property.category === 'kouatsu') return '高圧太陽光';
      return '低圧太陽光';
    }
  };

  const relatedProperties = properties
    .filter(p => p.id !== property.id && (p.type === property.type || p.prefecture === property.prefecture))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">ホーム</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/properties" className="hover:text-primary-600">物件検索</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-800 font-medium truncate">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="relative h-96 bg-gray-200">
                <img
                  src={property.images[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    ⭐ 注目物件
                  </div>
                )}
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((currentImage - 1 + property.images.length) % property.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentImage((currentImage + 1) % property.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {property.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                        currentImage === idx ? 'border-primary-500' : 'border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  property.type === 'battery' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700'
                }`}>
                  {getTypeLabel()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  property.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {property.status === 'completed' ? '完成案件' : '権利案件'}
                </span>
                {property.insurance && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    保険加入済
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {property.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.prefecture} {property.city}
              </div>

              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">物件価格</div>
                    <div className="text-4xl font-bold text-primary-600">
                      {formatPrice(property.price)}
                    </div>
                  </div>
                  {property.yield > 0 && (
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">想定利回り</div>
                      <div className="text-3xl font-bold text-green-600">
                        {property.yield}%
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">容量</div>
                  <div className="text-lg font-bold text-gray-800">
                    {property.capacity}{property.capacityUnit}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">土地面積</div>
                  <div className="text-lg font-bold text-gray-800">
                    {property.landArea.toLocaleString()}m²
                  </div>
                </div>
                {property.fitPrice > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">FIT価格</div>
                    <div className="text-lg font-bold text-gray-800">
                      {property.fitPrice}円/kWh
                    </div>
                  </div>
                )}
                {property.annualGeneration && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">年間発電量</div>
                    <div className="text-lg font-bold text-gray-800">
                      {(property.annualGeneration / 1000).toLocaleString()}MWh
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">物件概要</h3>
                <p className="text-gray-700">{property.description}</p>
              </div>
            </div>

            {/* Equipment Details */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">設備詳細</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.panelMaker && (
                  <div className="border-b border-gray-200 pb-3">
                    <div className="text-sm text-gray-500">{property.type === 'battery' ? '蓄電池メーカー' : 'パネルメーカー'}</div>
                    <div className="font-semibold text-gray-800">{property.panelMaker}</div>
                  </div>
                )}
                {property.panelModel && (
                  <div className="border-b border-gray-200 pb-3">
                    <div className="text-sm text-gray-500">型番</div>
                    <div className="font-semibold text-gray-800">{property.panelModel}</div>
                  </div>
                )}
                {property.inverterMaker && (
                  <div className="border-b border-gray-200 pb-3">
                    <div className="text-sm text-gray-500">{property.type === 'battery' ? 'PCSメーカー' : 'パワコンメーカー'}</div>
                    <div className="font-semibold text-gray-800">{property.inverterMaker}</div>
                  </div>
                )}
                {property.inverterModel && (
                  <div className="border-b border-gray-200 pb-3">
                    <div className="text-sm text-gray-500">型番</div>
                    <div className="font-semibold text-gray-800">{property.inverterModel}</div>
                  </div>
                )}
                {property.monitoringSystem && (
                  <div className="border-b border-gray-200 pb-3">
                    <div className="text-sm text-gray-500">監視システム</div>
                    <div className="font-semibold text-gray-800">{property.monitoringSystem}</div>
                  </div>
                )}
                <div className="border-b border-gray-200 pb-3">
                  <div className="text-sm text-gray-500">保険</div>
                  <div className="font-semibold text-gray-800">
                    {property.insurance ? '加入済み' : '未加入'}
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Simulator */}
            {property.yield > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📊 収益シミュレーター</h2>
                
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-6 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">初期投資額</div>
                      <div className="text-2xl font-bold text-gray-800">
                        {formatPrice(property.price)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">年間収益（想定）</div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(simulatorData.annualRevenue)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">投資回収期間</div>
                      <div className="text-2xl font-bold text-accent-600">
                        {(property.price / simulatorData.annualRevenue).toFixed(1)}年
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">20年間の総収益</div>
                        <div className="font-bold text-lg text-gray-800">
                          {formatPrice(simulatorData.annualRevenue * 20)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">運用コスト（想定15%）</div>
                        <div className="font-bold text-lg text-gray-800">
                          {formatPrice(simulatorData.annualCost * 20)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  ※ 本シミュレーターは簡易試算です。実際の収益は日射量・設備劣化・市場価格等により変動します。
                </div>
              </div>
            )}

            {/* Seller Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">売主情報</h2>
              <div className="flex items-start gap-4">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {property.sellerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-gray-800 mb-1">{property.sellerName}</div>
                  <div className="text-sm text-gray-600 mb-3">{property.sellerContact}</div>
                  <div className="text-xs text-gray-500">
                    掲載日: {new Date(property.createdAt).toLocaleDateString('ja-JP')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="space-y-4">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-primary-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-primary-600 shadow-lg"
                >
                  📧 この物件について問い合わせる
                </button>
                
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-full px-6 py-3 rounded-lg font-semibold border-2 ${
                    isFavorite
                      ? 'bg-red-50 border-red-500 text-red-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isFavorite ? '❤️ お気に入り登録済み' : '🤍 お気に入りに追加'}
                </button>

                <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
                  🔗 この物件をシェア
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3">物件ID: {property.id}</div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">📱 ログインで便利機能</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ お気に入り登録・比較</li>
                    <li>✓ メッセージング</li>
                    <li>✓ 新着アラート設定</li>
                  </ul>
                  <Link
                    href="/register"
                    className="block mt-3 bg-accent-500 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-accent-600"
                  >
                    無料会員登録
                  </Link>
                </div>
              </div>

              {/* Ad Space */}
              <div className="mt-6 bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-xs">【広告枠】</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">関連物件</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((prop) => (
                <Link key={prop.id} href={`/properties/${prop.id}`} className="block">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden">
                    <div className="relative h-48 bg-gray-200">
                      <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">
                        {prop.title}
                      </h3>
                      <div className="text-xl font-bold text-primary-600">
                        {formatPrice(prop.price)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">物件について問い合わせ</h3>
            <p className="text-gray-600 mb-4">
              この機能を利用するには会員登録が必要です。
            </p>
            <div className="space-y-3">
              <Link
                href="/register"
                className="block bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary-600"
              >
                無料会員登録
              </Link>
              <Link
                href="/login"
                className="block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-200"
              >
                ログイン
              </Link>
              <button
                onClick={() => setShowContactModal(false)}
                className="block w-full text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
