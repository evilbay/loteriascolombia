'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full gradient-colombia flex items-center justify-center">
              <span className="text-white font-bold text-xl">🎱</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-colombia-blue">Loterías</span>
              <span className="font-bold text-xl text-colombia-red">Colombia</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-colombia-blue">Inicio</Link>
            <Link href="/loteria/baloto" className="text-gray-700 hover:text-colombia-blue">Baloto</Link>
            <Link href="/#verificar" className="bg-colombia-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              ¿Gané?
            </Link>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="py-2" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link href="/loteria/baloto" className="py-2" onClick={() => setIsMenuOpen(false)}>Baloto</Link>
              <Link href="/#verificar" className="bg-colombia-blue text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>
                ¿Gané?
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
