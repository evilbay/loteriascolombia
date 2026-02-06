'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/api';

interface BalotoRevanchaCardProps {
  fecha: string;
  sorteoNumero?: string;
  // Baloto tiene sus propios 5 números + superbalota
  numerosBaloto: number[];
  superbalota: number;
  // Revancha tiene sus propios 5 números + revancha
  numerosRevancha: number[];
  revancha: number;
  acumuladoBaloto?: string;
  acumuladoRevancha?: string;
  featured?: boolean;
}

export default function BalotoRevanchaCard({
  fecha,
  sorteoNumero,
  numerosBaloto,
  superbalota,
  numerosRevancha,
  revancha,
  acumuladoBaloto,
  acumuladoRevancha,
  featured = false,
}: BalotoRevanchaCardProps) {

  const NumberBall = ({ 
    num, 
    variant = 'baloto',
    size = 'normal'
  }: { 
    num: number; 
    variant?: 'baloto' | 'revancha' | 'superbalota' | 'extra-revancha';
    size?: 'normal' | 'small';
  }) => {
    const bgColor = {
      baloto: 'bg-gradient-to-br from-red-500 to-red-700',
      revancha: 'bg-gradient-to-br from-purple-500 to-purple-700',
      superbalota: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      'extra-revancha': 'bg-gradient-to-br from-blue-500 to-blue-700',
    };

    const sizeClass = size === 'small' 
      ? 'w-8 h-8 text-xs' 
      : 'w-10 h-10 sm:w-11 sm:h-11 text-sm sm:text-base';

    return (
      <div
        className={`
          ${sizeClass}
          ${bgColor[variant]}
          rounded-full
          flex items-center justify-center
          text-white font-bold
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
      <header className="bg-gradient-to-r from-red-600 via-red-700 to-purple-700 px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎱</span>
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">Baloto + Revancha</h2>
              <p className="text-white/80 text-xs">
                {formatDate(fecha)}
                {sorteoNumero && <span className="ml-2">• #{sorteoNumero}</span>}
              </p>
            </div>
          </div>
          {featured && (
            <span className="bg-white/25 text-xs px-2 py-1 rounded-full font-medium">
              Hoy
            </span>
          )}
        </div>
      </header>

      {/* Contenido: Dos columnas - Baloto y Revancha */}
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-3">
          
          {/* BALOTO */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-3 border border-red-100">
            <div className="flex items-center justify-center gap-1 mb-3">
              <span className="text-base">🔴</span>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide">
                Baloto
              </p>
            </div>
            
            {/* 5 números de Baloto */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {numerosBaloto.slice(0, 5).map((num, idx) => (
                <NumberBall key={idx} num={num} variant="baloto" size="small" />
              ))}
            </div>
            
            {/* Superbalota */}
            <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-red-200">
              <span className="text-xs text-gray-500">Super:</span>
              <NumberBall num={superbalota} variant="superbalota" size="small" />
            </div>
            
            {acumuladoBaloto && (
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500">Acumulado</p>
                <p className="font-bold text-green-600 text-sm">{acumuladoBaloto}</p>
              </div>
            )}
          </div>

          {/* REVANCHA */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-3 border border-purple-100">
            <div className="flex items-center justify-center gap-1 mb-3">
              <span className="text-base">🟣</span>
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wide">
                Revancha
              </p>
            </div>
            
            {/* 5 números de Revancha */}
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {numerosRevancha.slice(0, 5).map((num, idx) => (
                <NumberBall key={idx} num={num} variant="revancha" size="small" />
              ))}
            </div>
            
            {/* Número Revancha */}
            <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-purple-200">
              <span className="text-xs text-gray-500">Extra:</span>
              <NumberBall num={revancha} variant="extra-revancha" size="small" />
            </div>
            
            {acumuladoRevancha && (
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500">Acumulado</p>
                <p className="font-bold text-purple-600 text-sm">{acumuladoRevancha}</p>
              </div>
            )}
          </div>
        </div>

        {/* Nota informativa */}
        <div className="mt-3 bg-gray-50 rounded-lg p-2 text-xs text-gray-600 text-center">
          <span>🎰 Mismo sorteo, dos oportunidades de ganar</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-3 pb-3 flex gap-2">
        <Link
          href="/loteria/baloto"
          className="flex-1 py-2.5 px-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-center font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md text-sm"
        >
          🔍 Verificar
        </Link>
        <Link
          href="/loteria/baloto/historial"
          className="py-2.5 px-3 border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm"
        >
          Historial
        </Link>
      </footer>
    </article>
  );
}
