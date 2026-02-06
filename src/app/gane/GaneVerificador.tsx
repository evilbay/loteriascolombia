'use client';

import { useState, useMemo } from 'react';
import VerificadorTradicional from '@/components/VerificadorTradicional';
import VerificadorBaloto from '@/components/VerificadorBaloto';
import { Lottery, LotteryResult } from '@/types/lottery';

interface LoteriaConResultados extends Lottery {
  resultados: LotteryResult[];
}

interface GaneVerificadorProps {
  loterias: LoteriaConResultados[];
}

export default function GaneVerificador({ loterias }: GaneVerificadorProps) {
  const [loteriaSeleccionada, setLoteriaSeleccionada] = useState<string>('');

  // Separar Baloto de las tradicionales para el selector
  const loteriasTradicionales = useMemo(
    () => loterias.filter(l => l.lotteryType === 'traditional'),
    [loterias]
  );

  const baloto = useMemo(
    () => loterias.find(l => l.id === 'baloto'),
    [loterias]
  );

  const balotoRevancha = useMemo(
    () => loterias.find(l => l.id === 'baloto-revancha'),
    [loterias]
  );

  // Obtener la lotería actual
  const loteriaActual = useMemo(
    () => loterias.find(l => l.id === loteriaSeleccionada),
    [loterias, loteriaSeleccionada]
  );

  // Preparar datos para verificador tradicional
  const resultadosTradicional = useMemo(() => {
    if (!loteriaActual || loteriaActual.lotteryType !== 'traditional') return [];
    
    return loteriaActual.resultados.map(r => ({
      id: r.id,
      fecha: r.date,
      numero: r.numbers.join(''),
      serie: r.series || '',
      secos: [], // TODO: agregar secos si están disponibles
    }));
  }, [loteriaActual]);

  // Preparar datos para verificador Baloto
  const resultadosBaloto = useMemo(() => {
    if (!baloto || !balotoRevancha) return [];
    
    // Combinar resultados de Baloto con Revancha del mismo día
    return baloto.resultados.map(r => {
      const revanchaDelDia = balotoRevancha.resultados.find(
        rev => rev.date === r.date
      );
      
      return {
        id: r.id,
        fecha: r.date,
        numeros: Array.isArray(r.numbers) ? r.numbers : [],
        superbalota: r.superbalota || 0,
        revancha: revanchaDelDia?.revancha || revanchaDelDia?.superbalota,
      };
    });
  }, [baloto, balotoRevancha]);

  const esBaloto = loteriaSeleccionada === 'baloto' || loteriaSeleccionada === 'baloto-revancha';

  return (
    <div className="space-y-6">
      {/* Selector de lotería */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          1️⃣ Selecciona tu lotería
        </label>
        
        {/* Botones rápidos de tipo */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setLoteriaSeleccionada('baloto')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              esBaloto
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎱 Baloto
          </button>
          <button
            onClick={() => setLoteriaSeleccionada('')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              !esBaloto && !loteriaSeleccionada
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : !esBaloto && loteriaSeleccionada
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎫 Tradicional
          </button>
        </div>

        {/* Selector de lotería tradicional */}
        {!esBaloto && (
          <div>
            <select
              value={loteriaSeleccionada}
              onChange={(e) => setLoteriaSeleccionada(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700"
            >
              <option value="">-- Selecciona una lotería --</option>
              {loteriasTradicionales.map((loteria) => (
                <option key={loteria.id} value={loteria.id}>
                  {loteria.name} ({loteria.resultados.length} sorteos disponibles)
                </option>
              ))}
            </select>
            
            {loteriaSeleccionada && loteriaActual && (
              <div className="mt-3 flex items-center gap-2">
                <span 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: loteriaActual.color }}
                />
                <span className="text-sm text-gray-600">
                  Sortea los días {loteriaActual.drawDays.join(', ')} • {loteriaActual.region}
                </span>
              </div>
            )}
          </div>
        )}

        {esBaloto && (
          <div className="mt-3 p-3 bg-red-50 rounded-lg text-sm text-red-700">
            <p className="flex items-center gap-2">
              <span>🎱</span>
              <span>
                Verificaremos tus números en <strong>Baloto</strong> y <strong>Revancha</strong> al mismo tiempo.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Verificador */}
      {loteriaSeleccionada && (
        <div className="animate-fade-in">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              2️⃣ Ingresa tus números
            </h2>
          </div>
          
          {esBaloto ? (
            resultadosBaloto.length > 0 ? (
              <VerificadorBaloto resultados={resultadosBaloto} />
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <span className="text-3xl mb-2 block">⚠️</span>
                <p className="text-yellow-800">
                  No hay resultados de Baloto disponibles en este momento.
                </p>
              </div>
            )
          ) : loteriaActual ? (
            resultadosTradicional.length > 0 ? (
              <VerificadorTradicional
                lotteryId={loteriaActual.id}
                lotteryName={loteriaActual.name}
                color={loteriaActual.color}
                resultados={resultadosTradicional}
              />
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <span className="text-3xl mb-2 block">⚠️</span>
                <p className="text-yellow-800">
                  No hay resultados disponibles para {loteriaActual.name} en este momento.
                </p>
              </div>
            )
          ) : null}
        </div>
      )}

      {/* Estado inicial - sin lotería seleccionada */}
      {!loteriaSeleccionada && (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
          <span className="text-5xl mb-4 block">🎰</span>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Selecciona una lotería para comenzar
          </h3>
          <p className="text-gray-500">
            Elige Baloto o una lotería tradicional arriba para verificar tus números
          </p>
        </div>
      )}

      {/* CSS para animación */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
