'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/api';

interface BalotoRevanchaCardProps {
  fecha: string;
  sorteoNumero?: string;
  numeros: number[]; // 5 números principales (comunes)
  superbalota: number;
  revancha: number;
  acumuladoBaloto?: string;
  acumuladoRevancha?: string;
  featured?: boolean;
}

export default function BalotoRevanchaCard({
  fecha,
  sorteoNumero,
  numeros,
  superbalota,
  revancha,
  acumuladoBaloto,
  acumuladoRevancha,
  featured = false,
}: BalotoRevanchaCardProps) {
  const [showVerificador, setShowVerificador] = useState(false);

  const NumberBall = ({ 
    num, 
    variant = 'main' 
  }: { 
    num: number; 
    variant?: 'main' | 'superbalota' | 'revancha' 
  }) => {
    const bgColor = {
      main: 'bg-gradient-to-br from-red-500 to-red-700',
      superbalota: 'bg-gradient-to-br from-orange-400 to-orange-600',
      revancha: 'bg-gradient-to-br from-purple-500 to-purple-700',
    };

    return (
      <div
        className={`
          w-10 h-10 sm:w-12 sm:h-12
          ${bgColor[variant]}
          rounded-full
          flex items-center justify-center
          text-white font-bold text-sm sm:text-base
          shadow-lg
        `}
      >
        {num.toString().padStart(2, '0')}
      </div>
    );
  };

  return (
    <article className={`
      bg-white rounded-2xl shadow-xl overflow-hidden
      ${featured ? 'ring-2 ring-red-500 ring-offset-2' : ''}
    `}>
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-red-700 to-purple-700 px-4 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎱</span>
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl">Baloto + Revancha</h2>
              <p className="text-white/80 text-sm">
                {formatDate(fecha)}
                {sorteoNumero && <span className="ml-2">• Sorteo #{sorteoNumero}</span>}
              </p>
            </div>
          </div>
          {featured && (
            <span className="bg-white/25 text-xs px-3 py-1 rounded-full font-medium">
              Último
            </span>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* Números principales */}
        <div className="text-center">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            Números Principales
          </p>
          <div className="flex justify-center gap-2 sm:gap-3">
            {numeros.map((num, idx) => (
              <NumberBall key={idx} num={num} variant="main" />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Comunes para Baloto y Revancha
          </p>
        </div>

        {/* Separador */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-gray-400 text-xs">Números extra</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        {/* Superbalota y Revancha lado a lado */}
        <div className="grid grid-cols-2 gap-4">
          {/* Baloto */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 text-center border border-orange-100">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-lg">🔴</span>
              <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                Baloto
              </p>
            </div>
            <div className="flex justify-center mb-2">
              <NumberBall num={superbalota} variant="superbalota" />
            </div>
            <p className="text-xs text-gray-500">Superbalota</p>
            {acumuladoBaloto && (
              <div className="mt-2 bg-white rounded-lg px-2 py-1">
                <p className="text-xs text-gray-500">Acumulado</p>
                <p className="font-bold text-green-600 text-sm">{acumuladoBaloto}</p>
              </div>
            )}
          </div>

          {/* Revancha */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 text-center border border-purple-100">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-lg">🟣</span>
              <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
                Revancha
              </p>
            </div>
            <div className="flex justify-center mb-2">
              <NumberBall num={revancha} variant="revancha" />
            </div>
            <p className="text-xs text-gray-500">Número extra</p>
            {acumuladoRevancha && (
              <div className="mt-2 bg-white rounded-lg px-2 py-1">
                <p className="text-xs text-gray-500">Acumulado</p>
                <p className="font-bold text-purple-600 text-sm">{acumuladoRevancha}</p>
              </div>
            )}
          </div>
        </div>

        {/* Info adicional */}
        <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
          <p className="flex items-start gap-2">
            <span>💡</span>
            <span>
              <strong>¿Sabías?</strong> Los 5 números principales son iguales para Baloto y Revancha. 
              Solo cambia el número extra (Superbalota o Revancha).
            </span>
          </p>
        </div>
      </div>

      {/* Footer con acciones */}
      <footer className="px-4 pb-4 flex gap-2">
        <Link
          href="/loteria/baloto"
          className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-center font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md text-sm"
        >
          🔍 Verificar mi número
        </Link>
        <Link
          href="/loteria/baloto/historial"
          className="py-3 px-4 border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm"
        >
          Historial
        </Link>
      </footer>
    </article>
  );
}
