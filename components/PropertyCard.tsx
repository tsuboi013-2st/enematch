'use client';

import Link from 'next/link';
import { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
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
      return property.category === 'tokko' ? '蓄電池（特高）' : '蓄電池（高圧）';
    } else {
      if (property.category === 'mega') return 'メガソーラー';
      if (property.category === 'kouatsu') return '高圧太陽光';
      return '低圧太陽光';
    }
  };

  const getStatusLabel = () => {
    return property.status === 'completed' ? '完成案件' : '権利案件';
  };

  const getTypeColor = () => {
    return property.type === 'battery' ? 'bg-primary-100 text-primary-700' : 'bg-accent-100 text-accent-700';
  };

  const getStatusColor = () => {
    return property.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700';
  };

  return (
    <Link href={`/properties/${property.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          {property.featured && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ⭐ 注目
            </div>
          )}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <span className={`${getTypeColor()} px-3 py-1 rounded-full text-xs font-bold`}>
              {getTypeLabel()}
            </span>
            <span className={`${getStatusColor()} px-3 py-1 rounded-full text-xs font-bold`}>
              {getStatusLabel()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 hover:text-primary-600">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-xs mb-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.prefecture} {property.city}
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="bg-gray-50 rounded p-2">
              <div className="text-gray-500 text-xs">容量</div>
              <div className="font-bold text-gray-800">
                {property.capacity}{property.capacityUnit}
              </div>
            </div>
            {property.fitPrice > 0 && (
              <div className="bg-gray-50 rounded p-2">
                <div className="text-gray-500 text-xs">FIT</div>
                <div className="font-bold text-gray-800">
                  {property.fitPrice}円/kWh
                </div>
              </div>
            )}
            {property.yield > 0 && (
              <div className="bg-gray-50 rounded p-2">
                <div className="text-gray-500 text-xs">利回り</div>
                <div className="font-bold text-primary-600">
                  {property.yield}%
                </div>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">価格</div>
                <div className="text-xl font-bold text-gray-800">
                  {formatPrice(property.price)}
                </div>
              </div>
              <div className="text-primary-600 font-semibold text-sm">
                詳細を見る →
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
