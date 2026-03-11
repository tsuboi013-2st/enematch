'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with actual auth state

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top banner - Free registration */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 text-center text-sm font-semibold">
        ✨ 完全無料！会員登録・物件掲載すべて0円 ✨
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-lg p-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">エネマッチ</h1>
              <p className="text-xs text-gray-500">Energy Marketplace</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/properties" className="text-gray-700 hover:text-primary-600 font-medium">
              物件検索
            </Link>
            <Link href="/properties/new" className="text-gray-700 hover:text-primary-600 font-medium">
              物件掲載
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              サービス案内
            </Link>
            <Link href="/guide" className="text-gray-700 hover:text-primary-600 font-medium">
              ご利用ガイド
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/mypage" className="text-gray-700 hover:text-primary-600 font-medium">
                  マイページ
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  ログイン
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 font-semibold"
                >
                  無料会員登録
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <Link href="/properties" className="block py-2 text-gray-700 hover:text-primary-600">
              物件検索
            </Link>
            <Link href="/properties/new" className="block py-2 text-gray-700 hover:text-primary-600">
              物件掲載
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-primary-600">
              サービス案内
            </Link>
            <Link href="/guide" className="block py-2 text-gray-700 hover:text-primary-600">
              ご利用ガイド
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/mypage" className="block py-2 text-gray-700 hover:text-primary-600">
                  マイページ
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="block py-2 text-gray-700 hover:text-primary-600 w-full text-left"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-gray-700 hover:text-primary-600">
                  ログイン
                </Link>
                <Link
                  href="/register"
                  className="block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 text-center font-semibold"
                >
                  無料会員登録
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
