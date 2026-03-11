'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { properties, Property } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    category: searchParams.get('category') || 'all',
    status: searchParams.get('status') || 'all',
    prefecture: searchParams.get('prefecture') || '',
    minPrice: '',
    maxPrice: '',
    minCapacity: '',
    maxCapacity: '',
    minYield: '',
    fitPrice: 'all',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    let filtered = [...properties];

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status);
    }

    // Prefecture filter
    if (filters.prefecture) {
      filtered = filtered.filter(p => p.prefecture === filters.prefecture);
    }

    // Price filter
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice) * 10000;
      filtered = filtered.filter(p => p.price >= minPrice);
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice) * 10000;
      filtered = filtered.filter(p => p.price <= maxPrice);
    }

    // Capacity filter
    if (filters.minCapacity) {
      filtered = filtered.filter(p => {
        const capacity = p.capacityUnit === 'MW' ? p.capacity * 1000 : p.capacity;
        return capacity >= parseFloat(filters.minCapacity);
      });
    }
    if (filters.maxCapacity) {
      filtered = filtered.filter(p => {
        const capacity = p.capacityUnit === 'MW' ? p.capacity * 1000 : p.capacity;
        return capacity <= parseFloat(filters.maxCapacity);
      });
    }

    // Yield filter
    if (filters.minYield) {
      filtered = filtered.filter(p => p.yield >= parseFloat(filters.minYield));
    }

    // FIT price filter
    if (filters.fitPrice !== 'all') {
      const fitValue = parseInt(filters.fitPrice);
      filtered = filtered.filter(p => p.fitPrice === fitValue);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'yield-desc':
        filtered.sort((a, b) => b.yield - a.yield);
        break;
      case 'capacity-desc':
        filtered.sort((a, b) => {
          const aCapacity = a.capacityUnit === 'MW' ? a.capacity * 1000 : a.capacity;
          const bCapacity = b.capacityUnit === 'MW' ? b.capacity * 1000 : b.capacity;
          return bCapacity - aCapacity;
        });
        break;
    }

    setFilteredProperties(filtered);
  }, [filters, sortBy]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      category: 'all',
      status: 'all',
      prefecture: '',
      minPrice: '',
      maxPrice: '',
      minCapacity: '',
      maxCapacity: '',
      minYield: '',
      fitPrice: 'all',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">物件検索</h1>
          <p className="text-white/90">全{properties.length}件の物件から理想の案件を見つけましょう</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">ホーム</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-800 font-medium">物件検索</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">絞り込み検索</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  リセット
                </button>
              </div>

              <div className="space-y-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    物件種別
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                  >
                    <option value="all">すべて</option>
                    <option value="battery">系統用蓄電池</option>
                    <option value="solar">太陽光発電</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    カテゴリー
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                  >
                    <option value="all">すべて</option>
                    {filters.type === 'battery' || filters.type === 'all' ? (
                      <>
                        <option value="tokko">特高</option>
                        <option value="kouatsu">高圧</option>
                      </>
                    ) : null}
                    {filters.type === 'solar' || filters.type === 'all' ? (
                      <>
                        <option value="mega">メガソーラー</option>
                        <option value="kouatsu">高圧</option>
                        <option value="teipatsu">低圧</option>
                      </>
                    ) : null}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    案件状態
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                  >
                    <option value="all">すべて</option>
                    <option value="completed">完成案件</option>
                    <option value="rights">権利案件</option>
                  </select>
                </div>

                {/* Prefecture */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    都道府県
                  </label>
                  <select
                    value={filters.prefecture}
                    onChange={(e) => handleFilterChange('prefecture', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                  >
                    <option value="">全国</option>
                    <option value="北海道">北海道</option>
                    <option value="福島県">福島県</option>
                    <option value="茨城県">茨城県</option>
                    <option value="栃木県">栃木県</option>
                    <option value="群馬県">群馬県</option>
                    <option value="千葉県">千葉県</option>
                    <option value="新潟県">新潟県</option>
                    <option value="長野県">長野県</option>
                    <option value="岐阜県">岐阜県</option>
                    <option value="静岡県">静岡県</option>
                    <option value="愛知県">愛知県</option>
                    <option value="三重県">三重県</option>
                    <option value="兵庫県">兵庫県</option>
                    <option value="岡山県">岡山県</option>
                    <option value="山口県">山口県</option>
                    <option value="福岡県">福岡県</option>
                    <option value="宮崎県">宮崎県</option>
                    <option value="鹿児島県">鹿児島県</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    価格帯（万円）
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="下限"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                    />
                    <span className="text-gray-500">〜</span>
                    <input
                      type="number"
                      placeholder="上限"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Capacity Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    容量（kW）
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="下限"
                      value={filters.minCapacity}
                      onChange={(e) => handleFilterChange('minCapacity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                    />
                    <span className="text-gray-500">〜</span>
                    <input
                      type="number"
                      placeholder="上限"
                      value={filters.maxCapacity}
                      onChange={(e) => handleFilterChange('maxCapacity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Yield */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    利回り（%以上）
                  </label>
                  <input
                    type="number"
                    placeholder="例: 10"
                    value={filters.minYield}
                    onChange={(e) => handleFilterChange('minYield', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                  />
                </div>

                {/* FIT Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    FIT価格
                  </label>
                  <select
                    value={filters.fitPrice}
                    onChange={(e) => handleFilterChange('fitPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                  >
                    <option value="all">指定なし</option>
                    <option value="40">40円/kWh</option>
                    <option value="36">36円/kWh</option>
                    <option value="32">32円/kWh</option>
                    <option value="24">24円/kWh</option>
                    <option value="21">21円/kWh</option>
                    <option value="18">18円/kWh</option>
                    <option value="14">14円/kWh</option>
                  </select>
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full mt-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium"
              >
                条件をクリア
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-gray-700">
                  <span className="font-bold text-primary-600 text-lg">{filteredProperties.length}</span>
                  <span className="ml-1">件の物件が見つかりました</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">並び替え:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-sm"
                    >
                      <option value="newest">新着順</option>
                      <option value="price-asc">価格が安い順</option>
                      <option value="price-desc">価格が高い順</option>
                      <option value="yield-desc">利回りが高い順</option>
                      <option value="capacity-desc">容量が大きい順</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  条件に合う物件が見つかりませんでした
                </h3>
                <p className="text-gray-500 mb-6">
                  検索条件を変更してお試しください
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 font-medium"
                >
                  条件をリセット
                </button>
              </div>
            )}

            {/* Ad Space */}
            <div className="mt-8 bg-white rounded-xl shadow-md p-8 text-center border-2 border-dashed border-gray-300">
              <p className="text-gray-400 text-sm">【広告掲載スペース】</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
