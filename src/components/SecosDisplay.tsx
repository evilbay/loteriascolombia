'use client';

import { useState } from 'react';
import { Seco, Aproximacion, formatPremio, getNivelLabel, getTipoAproximacionLabel, SecoNivel } from '@/types/secos';
import { getMockSecos, calcularAproximaciones } from '@/lib/secos-data';

interface SecosDisplayProps {
  resultadoId: string;
  lotteryId: string;
  numeroGanador: string;
  serie?: string;
  variant?: 'compact' | 'full';
  defaultExpanded?: boolean;
}

export default function SecosDisplay({
  resultadoId,
  lotteryId,
  numeroGanador,
  serie,
  variant = 'compact',
  defaultExpanded = false,
}: SecosDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [showAllSecos, setShowAllSecos] = useState(false);

  // Obtener datos (mock por ahora, luego de Supabase)
  const secos = getMockSecos(resultadoId, numeroGanador);
  const aproximaciones = calcularAproximaciones(numeroGanador, lotteryId);
  
  // Agrupar secos por nivel
  const superSeco = secos.find(s => s.nivel === 'super_seco');
  const otrosSecos = secos.filter(s => s.nivel !== 'super_seco');
  
  // Agrupar por nivel para mostrar
  const secosPorNivel = otrosSecos.reduce((acc, seco) => {
    if (!acc[seco.nivel]) {
      acc[seco.nivel] = [];
    }
    acc[seco.nivel].push(seco);
    return acc;
  }, {} as Record<SecoNivel, Seco[]>);

  if (variant === 'compact') {
    return (
      <div className="mt-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="w-full flex items-center justify-between p-2.5 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 rounded-lg border border-amber-200 transition-all duration-200"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-amber-800">
            <span className="text-lg">💰</span>
            Secos y Aproximaciones
          </span>
          <span className={`text-amber-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {isExpanded && (
          <div 
            className="mt-2 p-3 bg-white border border-gray-200 rounded-lg space-y-3 animate-in slide-in-from-top-2 duration-200"
            onClick={(e) => e.preventDefault()}
          >
            {/* Super Seco destacado */}
            {superSeco && (
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-3 rounded-lg border border-yellow-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="text-xs font-medium text-amber-700">Super Seco</p>
                      <p className="font-bold text-lg text-amber-900">
                        {superSeco.numero}
                        {superSeco.serie && <span className="text-sm ml-1">Serie {superSeco.serie}</span>}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    {formatPremio(superSeco.premio)}
                  </span>
                </div>
              </div>
            )}

            {/* Lista de otros secos - Resumen */}
            {Object.keys(secosPorNivel).length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Otros Secos</p>
                {Object.entries(secosPorNivel)
                  .slice(0, showAllSecos ? undefined : 2)
                  .map(([nivel, secosNivel]) => (
                    <div key={nivel} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">🎯</span>
                        <span className="text-gray-700">{getNivelLabel(nivel as SecoNivel)}:</span>
                        <span className="font-medium text-gray-900">
                          {secosNivel.map(s => s.numero).join(', ')}
                        </span>
                      </div>
                      <span className="text-green-600 font-medium text-xs">
                        {formatPremio(secosNivel[0].premio)}
                      </span>
                    </div>
                  ))}
                
                {Object.keys(secosPorNivel).length > 2 && !showAllSecos && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllSecos(true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Ver {Object.keys(secosPorNivel).length - 2} más...
                  </button>
                )}
              </div>
            )}

            {/* Aproximaciones */}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Aproximaciones</p>
              <div className="grid gap-1.5">
                {aproximaciones.map((aprox) => (
                  <div 
                    key={aprox.tipo}
                    className="flex items-center justify-between text-sm p-2 bg-blue-50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">◆</span>
                      <span className="text-gray-600">{getTipoAproximacionLabel(aprox.tipo)}:</span>
                      <code className="font-mono font-bold text-blue-700 bg-blue-100 px-1.5 rounded">
                        {aprox.cifras}
                      </code>
                    </div>
                    <span className="text-green-600 font-medium text-xs">
                      {formatPremio(aprox.premio)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Variant: full - Para página de detalle
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span>💰</span>
          Secos y Aproximaciones
        </h2>
        <p className="text-amber-100 text-sm mt-1">
          Premios secundarios del sorteo
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Super Seco destacado */}
        {superSeco && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border-2 border-yellow-400">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-700">Super Seco</p>
                  <p className="font-bold text-2xl text-amber-900">
                    {superSeco.numero}
                  </p>
                  {superSeco.serie && (
                    <p className="text-sm text-amber-600">Serie: {superSeco.serie}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Premio</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPremio(superSeco.premio)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Secos */}
        {Object.keys(secosPorNivel).length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-yellow-500">🎯</span>
              Secos
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2 rounded-tl-lg">Nivel</th>
                    <th className="text-left p-2">Números</th>
                    <th className="text-right p-2 rounded-tr-lg">Premio</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(secosPorNivel).map(([nivel, secosNivel], idx) => (
                    <tr key={nivel} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-2 font-medium text-gray-700">
                        {getNivelLabel(nivel as SecoNivel)}
                      </td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-1">
                          {secosNivel.map((seco) => (
                            <code 
                              key={seco.id}
                              className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono text-xs"
                            >
                              {seco.numero}
                            </code>
                          ))}
                        </div>
                      </td>
                      <td className="p-2 text-right font-semibold text-green-600">
                        {formatPremio(secosNivel[0].premio)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Aproximaciones */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-blue-500">◆</span>
            Aproximaciones
          </h3>
          <div className="grid gap-2">
            {aproximaciones.map((aprox) => (
              <div 
                key={aprox.tipo}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {getTipoAproximacionLabel(aprox.tipo)}
                  </p>
                  <p className="text-sm text-gray-500">{aprox.descripcion}</p>
                </div>
                <div className="text-right">
                  <code className="font-mono font-bold text-xl text-blue-700">
                    {aprox.cifras}
                  </code>
                  <p className="text-sm font-semibold text-green-600">
                    {formatPremio(aprox.premio)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nota informativa */}
        <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-600">
          <p className="flex items-start gap-2">
            <span>ℹ️</span>
            <span>
              Los premios de aproximaciones se pagan por cada fracción que coincida con las cifras indicadas.
              Verifica siempre los resultados oficiales.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
