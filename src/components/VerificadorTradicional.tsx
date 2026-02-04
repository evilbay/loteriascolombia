'use client';

import { useState } from 'react';
import { formatPremio } from '@/types/secos';
import { planPremiosDefault, planesPremios, calcularAproximaciones } from '@/lib/secos-data';

interface VerificadorTradicionalProps {
  lotteryId: string;
  lotteryName: string;
  color: string;
  resultados: Array<{
    id: string;
    fecha: string;
    numero: string;
    serie?: string;
    secos?: Array<{ numero: string; serie?: string; nivel: string; premio: number }>;
  }>;
}

interface ResultadoVerificacion {
  ganaste: boolean;
  tipo?: 'premio_mayor' | 'super_seco' | 'seco' | 'aproximacion';
  descripcion?: string;
  premio?: number;
  fechaSorteo?: string;
}

export default function VerificadorTradicional({
  lotteryId,
  lotteryName,
  color,
  resultados,
}: VerificadorTradicionalProps) {
  const [numero, setNumero] = useState('');
  const [serie, setSerie] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(resultados[0]?.fecha || '');
  const [resultado, setResultado] = useState<ResultadoVerificacion | null>(null);
  const [verificando, setVerificando] = useState(false);

  const plan = planesPremios[lotteryId] || { ...planPremiosDefault, lotteryId, lotteryName };

  const verificarNumero = () => {
    if (!numero || numero.length !== 4) {
      alert('Ingresa un número de 4 cifras');
      return;
    }

    setVerificando(true);
    
    // Buscar el resultado del sorteo seleccionado
    const sorteo = resultados.find(r => r.fecha === fechaSeleccionada);
    
    if (!sorteo) {
      setResultado({ ganaste: false });
      setVerificando(false);
      return;
    }

    const numeroUsuario = numero.padStart(4, '0');
    const serieUsuario = serie.padStart(3, '0');
    const numeroGanador = sorteo.numero.padStart(4, '0');
    const serieGanadora = sorteo.serie?.padStart(3, '0');

    // Verificar Premio Mayor (número + serie exacta)
    if (numeroUsuario === numeroGanador && serieUsuario === serieGanadora) {
      setResultado({
        ganaste: true,
        tipo: 'premio_mayor',
        descripcion: '🎉 ¡PREMIO MAYOR!',
        premio: plan.premioMayor,
        fechaSorteo: sorteo.fecha,
      });
      setVerificando(false);
      return;
    }

    // Verificar Super Seco (número sin serie específica - si hay secos)
    if (sorteo.secos) {
      const superSeco = sorteo.secos.find(s => s.nivel === 'super_seco' && s.numero === numeroUsuario);
      if (superSeco) {
        if (!superSeco.serie || serieUsuario === superSeco.serie) {
          setResultado({
            ganaste: true,
            tipo: 'super_seco',
            descripcion: '🏆 ¡Super Seco!',
            premio: superSeco.premio,
            fechaSorteo: sorteo.fecha,
          });
          setVerificando(false);
          return;
        }
      }

      // Verificar otros secos
      const otroSeco = sorteo.secos.find(s => s.nivel !== 'super_seco' && s.numero === numeroUsuario);
      if (otroSeco) {
        setResultado({
          ganaste: true,
          tipo: 'seco',
          descripcion: `🎯 ¡Ganaste un Seco!`,
          premio: otroSeco.premio,
          fechaSorteo: sorteo.fecha,
        });
        setVerificando(false);
        return;
      }
    }

    // Verificar aproximaciones (últimas cifras)
    const aproximaciones = calcularAproximaciones(numeroGanador, lotteryId);
    
    // Verificar 3 últimas cifras
    if (numeroUsuario.slice(-3) === numeroGanador.slice(-3)) {
      const aprox = aproximaciones.find(a => a.tipo === 'tres_ultimas');
      setResultado({
        ganaste: true,
        tipo: 'aproximacion',
        descripcion: '✨ Aproximación: 3 últimas cifras',
        premio: aprox?.premio || 70000,
        fechaSorteo: sorteo.fecha,
      });
      setVerificando(false);
      return;
    }

    // Verificar 2 últimas cifras
    if (numeroUsuario.slice(-2) === numeroGanador.slice(-2)) {
      const aprox = aproximaciones.find(a => a.tipo === 'dos_ultimas');
      setResultado({
        ganaste: true,
        tipo: 'aproximacion',
        descripcion: '✨ Aproximación: 2 últimas cifras',
        premio: aprox?.premio || 7000,
        fechaSorteo: sorteo.fecha,
      });
      setVerificando(false);
      return;
    }

    // Verificar última cifra
    if (numeroUsuario.slice(-1) === numeroGanador.slice(-1)) {
      const aprox = aproximaciones.find(a => a.tipo === 'ultima_cifra');
      setResultado({
        ganaste: true,
        tipo: 'aproximacion',
        descripcion: '✨ Aproximación: última cifra',
        premio: aprox?.premio || 700,
        fechaSorteo: sorteo.fecha,
      });
      setVerificando(false);
      return;
    }

    // No ganó nada
    setResultado({ ganaste: false, fechaSorteo: sorteo.fecha });
    setVerificando(false);
  };

  const limpiar = () => {
    setNumero('');
    setSerie('');
    setResultado(null);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div 
        className="px-4 py-3 text-white"
        style={{ backgroundColor: color }}
      >
        <h3 className="font-semibold flex items-center gap-2">
          <span className="text-xl">🔍</span>
          Verificar mi número
        </h3>
        <p className="text-sm text-white/80">
          Comprueba si tu billete de {lotteryName} ganó
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Inputs */}
        <div className="grid grid-cols-2 gap-3">
          {/* Número */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número (4 cifras)
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={numero}
              onChange={(e) => setNumero(e.target.value.replace(/\D/g, ''))}
              placeholder="0000"
              className="w-full px-4 py-3 text-2xl font-mono font-bold text-center border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {/* Serie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serie (3 cifras)
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={3}
              value={serie}
              onChange={(e) => setSerie(e.target.value.replace(/\D/g, ''))}
              placeholder="000"
              className="w-full px-4 py-3 text-2xl font-mono font-bold text-center border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
        </div>

        {/* Selector de fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha del sorteo
          </label>
          <select
            value={fechaSeleccionada}
            onChange={(e) => setFechaSeleccionada(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            {resultados.map((r) => (
              <option key={r.fecha} value={r.fecha}>
                {formatearFecha(r.fecha)}
              </option>
            ))}
          </select>
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            onClick={verificarNumero}
            disabled={verificando || numero.length !== 4}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {verificando ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verificando...
              </span>
            ) : (
              '🔍 Verificar'
            )}
          </button>
          
          {resultado && (
            <button
              onClick={limpiar}
              className="px-4 py-3 border-2 border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-all"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Resultado */}
        {resultado && (
          <div 
            className={`mt-4 p-4 rounded-xl border-2 ${
              resultado.ganaste 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            {resultado.ganaste ? (
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">🎊</div>
                <h4 className="text-xl font-bold text-green-700">
                  {resultado.descripcion}
                </h4>
                {resultado.premio && (
                  <div className="bg-white rounded-lg p-3 inline-block shadow-sm">
                    <span className="text-gray-500 text-sm">Premio:</span>
                    <p className="text-3xl font-bold text-green-600">
                      {formatPremio(resultado.premio)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Por billete completo
                    </p>
                  </div>
                )}
                <p className="text-sm text-gray-500">
                  Sorteo del {resultado.fechaSorteo && formatearFecha(resultado.fechaSorteo)}
                </p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">😔</div>
                <h4 className="text-lg font-semibold text-gray-700">
                  No ganaste en este sorteo
                </h4>
                <p className="text-sm text-gray-500">
                  Tu número: <span className="font-mono font-bold">{numero.padStart(4, '0')}</span>
                  {serie && <span> - Serie: <span className="font-mono font-bold">{serie.padStart(3, '0')}</span></span>}
                </p>
                <p className="text-xs text-gray-400">
                  ¡Sigue intentando! La suerte puede cambiar.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
          <p className="flex items-start gap-2">
            <span>💡</span>
            <span>
              <strong>Tip:</strong> Ingresa el número exacto de 4 cifras y la serie de tu billete. 
              Las aproximaciones se calculan automáticamente.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
