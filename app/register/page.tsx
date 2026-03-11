'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    accountType: 'individual',
    name: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'お名前を入力してください';
    if (formData.accountType === 'company' && !formData.companyName) {
      newErrors.companyName = '会社名を入力してください';
    }
    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    if (!formData.phone) {
      newErrors.phone = '電話番号を入力してください';
    } else if (!/^[\d-]+$/.test(formData.phone)) {
      newErrors.phone = '有効な電話番号を入力してください';
    }
    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (formData.password.length < 8) {
      newErrors.password = 'パスワードは8文字以上で入力してください';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '利用規約に同意してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Implement actual registration logic
      alert('会員登録が完了しました！（デモ版）');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full font-bold mb-4">
              ✨ 完全無料
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              無料会員登録
            </h1>
            <p className="text-gray-600">
              登録は1分で完了。すぐに物件の検索・掲載が可能です。
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  アカウント種別 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.accountType === 'individual'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="accountType"
                      value="individual"
                      checked={formData.accountType === 'individual'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">👤</div>
                      <div className="font-semibold text-gray-800">個人</div>
                    </div>
                  </label>
                  <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.accountType === 'company'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="accountType"
                      value="company"
                      checked={formData.accountType === 'company'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">🏢</div>
                      <div className="font-semibold text-gray-800">法人</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Company Name (if company) */}
              {formData.accountType === 'company' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    会社名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      errors.companyName ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
                    }`}
                    placeholder="株式会社エネマッチ"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                  )}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formData.accountType === 'company' ? '担当者名' : 'お名前'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.name ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="山田 太郎"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="example@enematch.jp"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="03-1234-5678"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  パスワード <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.password ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="8文字以上"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  パスワード（確認） <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-primary-500'
                  }`}
                  placeholder="もう一度入力してください"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-700">
                    <Link href="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                      利用規約
                    </Link>
                    および
                    <Link href="/privacy" className="text-primary-600 hover:text-primary-700 font-medium ml-1">
                      プライバシーポリシー
                    </Link>
                    に同意します <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-primary-600 hover:to-accent-600 shadow-lg"
              >
                無料会員登録
              </button>

              {/* Login Link */}
              <div className="text-center text-sm text-gray-600">
                既にアカウントをお持ちの方は
                <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold ml-1">
                  ログイン
                </Link>
              </div>
            </form>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4 text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold text-gray-800 text-sm">完全無料</div>
              <div className="text-xs text-gray-600">登録・利用すべて0円</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-gray-800 text-sm">即時利用可能</div>
              <div className="text-xs text-gray-600">登録後すぐに使える</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-semibold text-gray-800 text-sm">安心セキュリティ</div>
              <div className="text-xs text-gray-600">情報は厳重に管理</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
