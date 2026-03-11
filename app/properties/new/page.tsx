'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    status: 'completed',
    title: '',
    prefecture: '',
    city: '',
    price: '',
    capacity: '',
    capacityUnit: 'kW',
    yield: '',
    fitPrice: '',
    landArea: '',
    annualGeneration: '',
    panelMaker: '',
    panelModel: '',
    inverterMaker: '',
    inverterModel: '',
    monitoringSystem: '',
    insurance: false,
    description: '',
    sellerName: '',
    sellerContact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual property registration logic
    alert('物件が登録されました！（デモ版）');
    router.push('/properties');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">物件種別の選択</h2>
      
      {/* Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          物件タイプ <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
            formData.type === 'battery'
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="type"
              value="battery"
              checked={formData.type === 'battery'}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-4xl mb-3">🔋</div>
              <div className="font-bold text-lg text-gray-800 mb-1">系統用蓄電池</div>
              <div className="text-sm text-gray-600">BESS / 蓄電所</div>
            </div>
          </label>
          <label className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
            formData.type === 'solar'
              ? 'border-accent-500 bg-accent-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="type"
              value="solar"
              checked={formData.type === 'solar'}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-4xl mb-3">☀️</div>
              <div className="font-bold text-lg text-gray-800 mb-1">太陽光発電</div>
              <div className="text-sm text-gray-600">ソーラー発電所</div>
            </div>
          </label>
        </div>
      </div>

      {/* Category */}
      {formData.type && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            カテゴリー <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value="">選択してください</option>
            {formData.type === 'battery' && (
              <>
                <option value="tokko">特高（30MW以上）</option>
                <option value="kouatsu">高圧（1-10MW）</option>
              </>
            )}
            {formData.type === 'solar' && (
              <>
                <option value="mega">メガソーラー（1MW以上）</option>
                <option value="kouatsu">高圧（50kW-1MW）</option>
                <option value="teipatsu">低圧（50kW未満）</option>
              </>
            )}
          </select>
        </div>
      )}

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          案件状態 <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            formData.status === 'completed'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="status"
              value="completed"
              checked={formData.status === 'completed'}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-bold text-gray-800 mb-1">完成案件</div>
              <div className="text-xs text-gray-600">稼働中・即買収可能</div>
            </div>
          </label>
          <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            formData.status === 'rights'
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="status"
              value="rights"
              checked={formData.status === 'rights'}
              onChange={handleChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-bold text-gray-800 mb-1">権利案件</div>
              <div className="text-xs text-gray-600">土地+ID取得済み</div>
            </div>
          </label>
        </div>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!formData.type || !formData.category}
        className="w-full bg-primary-500 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        次へ →
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">基本情報</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          物件タイトル <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          placeholder="例: 【高圧】千葉県市原市 980kW FIT32円 完成案件"
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            都道府県 <span className="text-red-500">*</span>
          </label>
          <select
            name="prefecture"
            value={formData.prefecture}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value="">選択</option>
            <option value="千葉県">千葉県</option>
            <option value="茨城県">茨城県</option>
            <option value="栃木県">栃木県</option>
            <option value="群馬県">群馬県</option>
            <option value="静岡県">静岡県</option>
            <option value="愛知県">愛知県</option>
            <option value="福岡県">福岡県</option>
            <option value="鹿児島県">鹿児島県</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            市区町村 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
            placeholder="例: 市原市"
          />
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          価格（円） <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          placeholder="例: 245000000"
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.price && `約${(parseInt(formData.price) / 10000).toLocaleString()}万円`}
        </p>
      </div>

      {/* Capacity */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            容量 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
            placeholder="例: 980"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">単位</label>
          <select
            name="capacityUnit"
            value={formData.capacityUnit}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          >
            <option value="kW">kW</option>
            <option value="MW">MW</option>
          </select>
        </div>
      </div>

      {/* Land Area */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          土地面積（m²） <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="landArea"
          value={formData.landArea}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          placeholder="例: 13500"
        />
      </div>

      {/* Yield and FIT (for completed properties) */}
      {formData.status === 'completed' && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              想定利回り（%）
            </label>
            <input
              type="number"
              step="0.1"
              name="yield"
              value={formData.yield}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              placeholder="例: 12.5"
            />
          </div>
          {formData.type === 'solar' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                FIT価格（円/kWh）
              </label>
              <select
                name="fitPrice"
                value={formData.fitPrice}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              >
                <option value="">選択</option>
                <option value="40">40円/kWh</option>
                <option value="36">36円/kWh</option>
                <option value="32">32円/kWh</option>
                <option value="24">24円/kWh</option>
                <option value="21">21円/kWh</option>
                <option value="18">18円/kWh</option>
                <option value="14">14円/kWh</option>
              </select>
            </div>
          )}
        </>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
        >
          ← 戻る
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!formData.title || !formData.prefecture || !formData.city || !formData.price || !formData.capacity}
          className="flex-1 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          次へ →
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">設備詳細・売主情報</h2>

      {/* Equipment */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {formData.type === 'battery' ? '蓄電池メーカー' : 'パネルメーカー'}
          </label>
          <input
            type="text"
            name="panelMaker"
            value={formData.panelMaker}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
            placeholder="例: Tesla"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">型番</label>
          <input
            type="text"
            name="panelModel"
            value={formData.panelModel}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
            placeholder="例: Megapack 2XL"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {formData.type === 'battery' ? 'PCSメーカー' : 'パワコンメーカー'}
          </label>
          <input
            type="text"
            name="inverterMaker"
            value={formData.inverterMaker}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
            placeholder="例: ABB"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">型番</label>
          <input
            type="text"
            name="inverterModel"
            value={formData.inverterModel}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
            placeholder="例: PCS-6000"
          />
        </div>
      </div>

      {/* Monitoring System */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          監視システム
        </label>
        <input
          type="text"
          name="monitoringSystem"
          value={formData.monitoringSystem}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          placeholder="例: 4G遠隔監視システム"
        />
      </div>

      {/* Insurance */}
      <div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="insurance"
            checked={formData.insurance}
            onChange={handleChange}
            className="mr-3"
          />
          <span className="text-sm font-semibold text-gray-700">保険加入済み</span>
        </label>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          物件説明 <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          placeholder="物件の特徴、アクセス、稼働実績などを記載してください"
        />
      </div>

      {/* Seller Info */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">売主情報</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              会社名・氏名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              placeholder="例: エネルギー投資株式会社"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              連絡先（メールアドレス） <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="sellerContact"
              value={formData.sellerContact}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              placeholder="例: contact@example.com"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
        >
          ← 戻る
        </button>
        <button
          onClick={handleSubmit}
          disabled={!formData.description || !formData.sellerName || !formData.sellerContact}
          className="flex-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-lg font-bold hover:from-primary-600 hover:to-accent-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          物件を登録
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full font-bold mb-4">
              ✨ 完全無料
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              物件を掲載する
            </h1>
            <p className="text-gray-600">
              3ステップで簡単に物件を登録できます
            </p>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                    step >= s ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {s}
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${s < 3 ? (step > s ? 'bg-primary-500' : 'bg-gray-200') : ''}`} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>物件種別</span>
              <span>基本情報</span>
              <span>詳細・確認</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center text-sm text-gray-600">
            登録に関するご質問は
            <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold ml-1">
              お問い合わせ
            </Link>
            ください
          </div>
        </div>
      </div>
    </div>
  );
}
