'use client';

import { useState, useRef, useEffect } from 'react';
import { formatPremio } from '@/types/secos';

interface ResultadoBaloto {
  id: string;
  fecha: string;
  numeros: number[]; // 5 números principales
  superbalota: number; // Baloto
  revancha?: number; // Revancha
}

interface VerificadorBalotoProps {
  resultados: ResultadoBaloto[];
  esRevancha?: boolean;
}

interface PremioBaloto {
  categoria: number;
  aciertos: string;
  premio: string;
  aproximado: number;
}

const PREMIOS_BALOTO: PremioBaloto[] = [
  { categoria: 1, aciertos: '5 + Superbalota', premio: 'ACUMULADO', aproximado: 10000000000 },
  { categoria: 2, aciertos: '5', premio: '$200.000.000', aproximado: 200000000 },
  { categoria: 3, aciertos: '4 + Superbalota', premio: '$25.000.000', aproximado: 25000000 },
  { categoria: 4, aciertos: '4', premio: '$1.000.000', aproximado: 1000000 },
  { categoria: 5, aciertos: '3 + Superbalota', premio: '$100.000', aproximado: 100000 },
  { categoria: 6, aciertos: '3', premio: '$10.000', aproximado: 10000 },
  { categoria: 7, aciertos: '2 + Superbalota', premio: '$10.400', aproximado: 10400 },
];

interface ResultadoVerificacion {
  baloto?: { ganaste: boolean; categoria?: number; aciertos?: string; premio?: number; numerosAcertados: number[] };
  revancha?: { ganaste: boolean; categoria?: number; aciertos?: string; premio?: number; numerosAcertados: number[] };
}

export default function VerificadorBaloto({ resultados, esRevancha = false }: VerificadorBalotoProps) {
  const [numeros, setNumeros] = useState<string[]>(['', '', '', '', '']);
  const [superbalota, setSuperbalota] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(resultados[0]?.fecha || '');
  const [resultado, setResultado] = useState<ResultadoVerificacion | null>(null);
  const [verificando, setVerificando] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleNumeroChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const numValue = parseInt(cleanValue);
    
    // Validar rango 1-43
    if (cleanValue && (numValue < 1 || numValue > 43)) {
      return;
    }

    const newNumeros = [...numeros];
    newNumeros[index] = cleanValue;
    setNumeros(newNumeros);

    // Auto-avanzar al siguiente input
    if (cleanValue.length === 2 && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSuperbalotaChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const numValue = parseInt(cleanValue);
    
    // Validar rango 1-16
    if (cleanValue && (numValue < 1 || numValue > 16)) {
      return;
    }

    setSuperbalota(cleanValue);
  };

  const verificarCategoria = (
    numerosUsuario: number[],
    superbalotaUsuario: number,
    numerosSorteo: number[],
    superbalotaSorteo: number
  ): { categoria?: number; aciertos?: string; premio?: number; numerosAcertados: number[] } => {
    // Contar aciertos en números principales
    const numerosAcertados = numerosUsuario.filter(n => numerosSorteo.includes(n));
    const aciertosPrincipales = numerosAcertados.length;
    const aciertaSuperbalota = superbalotaUsuario === superbalotaSorteo;

    // Determinar categoría
    if (aciertosPrincipales === 5 && aciertaSuperbalota) {
      return { categoria: 1, aciertos: '5 + Superbalota', premio: PREMIOS_BALOTO[0].aproximado, numerosAcertados };
    }
    if (aciertosPrincipales === 5) {
      return { categoria: 2, aciertos: '5', premio: PREMIOS_BALOTO[1].aproximado, numerosAcertados };
    }
    if (aciertosPrincipales === 4 && aciertaSuperbalota) {
      return { categoria: 3, aciertos: '4 + Superbalota', premio: PREMIOS_BALOTO[2].aproximado, numerosAcertados };
    }
    if (aciertosPrincipales === 4) {
      return { categoria: 4, aciertos: '4', premio: PREMIOS_BALOTO[3].aproximado, numerosAcertados };
    }
    if (aciertosPrincipales === 3 && aciertaSuperbalota) {
      return { categoria: 5, aciertos: '3 + Superbalota', premio: PREMIOS_BALOTO[4].aproximado, numerosAcertados };
    }
    if (aciertosPrincipales === 3) {
      return { categoria: 6, aciertos: '3', premio: PREMIOS_BALOTO[5].aproximado, numerosAcertados };
    }
    if (aciertosPrincipales === 2 && aciertaSuperbalota) {
      return { categoria: 7, aciertos: '2 + Superbalota', premio: PREMIOS_BALOTO[6].aproximado, numerosAcertados };
    }

    return { numerosAcertados };
  };

  const verificar = () => {
    // Validar inputs
    const numerosValidos = numeros.every(n => n && parseInt(n) >= 1 && parseInt(n) <= 43);
    if (!numerosValidos) {
      alert('Ingresa 5 números válidos del 1 al 43');
      return;
    }
    if (!superbalota || parseInt(superbalota) < 1 || parseInt(superbalota) > 16) {
      alert('Ingresa una Superbalota válida del 1 al 16');
      return;
    }

    // Verificar duplicados
    const numerosSet = new Set(numeros.map(n => parseInt(n)));
    if (numerosSet.size !== 5) {
      alert('Los números no pueden repetirse');
      return;
    }

    setVerificando(true);

    const sorteo = resultados.find(r => r.fecha === fechaSeleccionada);
    if (!sorteo) {
      setResultado({ baloto: { ganaste: false, numerosAcertados: [] } });
      setVerificando(false);
      return;
    }

    const numerosUsuario = numeros.map(n => parseInt(n));
    const superbalotaUsuario = parseInt(superbalota);

    // Verificar Baloto
    const resultadoBaloto = verificarCategoria(
      numerosUsuario,
      superbalotaUsuario,
      sorteo.numeros,
      sorteo.superbalota
    );

    // Verificar Revancha si está disponible
    let resultadoRevancha: typeof resultadoBaloto | undefined;
    if (sorteo.revancha) {
      resultadoRevancha = verificarCategoria(
        numerosUsuario,
        superbalotaUsuario,
        sorteo.numeros, // Los números principales son los mismos
        sorteo.revancha
      );
    }

    setResultado({
      baloto: {
        ganaste: resultadoBaloto.categoria !== undefined,
        ...resultadoBaloto,
      },
      revancha: sorteo.revancha ? {
        ganaste: resultadoRevancha?.categoria !== undefined,
        ...resultadoRevancha!,
      } : undefined,
    });

    setVerificando(false);
  };

  const limpiar = () => {
    setNumeros(['', '', '', '', '']);
    setSuperbalota('');
    setResultado(null);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const sorteoActual = resultados.find(r => r.fecha === fechaSeleccionada);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="text-xl">🎱</span>
          Verificar mi Baloto
        </h3>
        <p className="text-sm text-white/80">
          Comprueba si ganaste en Baloto y Revancha
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Números principales */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tus 5 números (1-43)
          </label>
          <div className="flex gap-2 justify-center flex-wrap">
            {numeros.map((num, idx) => (
              <input
                key={idx}
                ref={el => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={2}
                value={num}
                onChange={(e) => handleNumeroChange(idx, e.target.value)}
                placeholder="00"
                className="w-12 h-12 sm:w-14 sm:h-14 text-xl font-bold font-mono text-center border-2 border-gray-200 rounded-full focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
              />
            ))}
          </div>
        </div>

        {/* Superbalota */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Superbalota (1-16)
          </label>
          <div className="flex justify-center">
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={superbalota}
              onChange={(e) => handleSuperbalotaChange(e.target.value)}
              placeholder="00"
              className="w-14 h-14 sm:w-16 sm:h-16 text-xl font-bold font-mono text-center border-2 border-orange-300 rounded-full bg-orange-50 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
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
            onChange={(e) => {
              setFechaSeleccionada(e.target.value);
              setResultado(null);
            }}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
          >
            {resultados.map((r) => (
              <option key={r.fecha} value={r.fecha}>
                {formatearFecha(r.fecha)}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar números del sorteo */}
        {sorteoActual && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Números ganadores del sorteo:</p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {sorteoActual.numeros.map((num, idx) => (
                <span key={idx} className="w-9 h-9 flex items-center justify-center bg-red-600 text-white font-bold text-sm rounded-full">
                  {num.toString().padStart(2, '0')}
                </span>
              ))}
              <span className="text-gray-400 font-bold">+</span>
              <span className="w-9 h-9 flex items-center justify-center bg-orange-500 text-white font-bold text-sm rounded-full">
                {sorteoActual.superbalota.toString().padStart(2, '0')}
              </span>
              {sorteoActual.revancha && (
                <>
                  <span className="text-gray-400 font-bold">/</span>
                  <span className="w-9 h-9 flex items-center justify-center bg-purple-600 text-white font-bold text-sm rounded-full">
                    {sorteoActual.revancha.toString().padStart(2, '0')}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-2">
          <button
            onClick={verificar}
            disabled={verificando}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
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
              '🎱 Verificar'
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

        {/* Resultados */}
        {resultado && (
          <div className="space-y-3">
            {/* Resultado Baloto */}
            <div className={`p-4 rounded-xl border-2 ${
              resultado.baloto?.ganaste 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔴</span>
                <span className="font-semibold text-gray-800">Baloto</span>
              </div>
              
              {resultado.baloto?.ganaste ? (
                <div className="text-center space-y-2">
                  <div className="text-3xl">🎉</div>
                  <h4 className="text-lg font-bold text-green-700">
                    ¡Categoría {resultado.baloto.categoria}!
                  </h4>
                  <p className="text-sm text-gray-600">
                    Acertaste: {resultado.baloto.aciertos}
                  </p>
                  {resultado.baloto.premio && (
                    <div className="bg-white rounded-lg p-2 inline-block">
                      <p className="text-2xl font-bold text-green-600">
                        {formatPremio(resultado.baloto.premio)}
                      </p>
                    </div>
                  )}
                  {resultado.baloto.numerosAcertados.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Números acertados: {resultado.baloto.numerosAcertados.join(', ')}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600">No ganaste en Baloto</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Acertaste {resultado.baloto?.numerosAcertados.length || 0} números
                  </p>
                </div>
              )}
            </div>

            {/* Resultado Revancha */}
            {resultado.revancha && (
              <div className={`p-4 rounded-xl border-2 ${
                resultado.revancha.ganaste 
                  ? 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-300'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🟣</span>
                  <span className="font-semibold text-gray-800">Revancha</span>
                </div>
                
                {resultado.revancha.ganaste ? (
                  <div className="text-center space-y-2">
                    <div className="text-3xl">🎊</div>
                    <h4 className="text-lg font-bold text-purple-700">
                      ¡Categoría {resultado.revancha.categoria}!
                    </h4>
                    <p className="text-sm text-gray-600">
                      Acertaste: {resultado.revancha.aciertos}
                    </p>
                    {resultado.revancha.premio && (
                      <div className="bg-white rounded-lg p-2 inline-block">
                        <p className="text-2xl font-bold text-purple-600">
                          {formatPremio(resultado.revancha.premio)}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600">No ganaste en Revancha</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Acertaste {resultado.revancha.numerosAcertados.length || 0} números
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tabla de premios */}
        <details className="bg-gray-50 rounded-lg">
          <summary className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
            📋 Ver tabla de premios
          </summary>
          <div className="px-4 pb-3">
            <table className="w-full text-xs mt-2">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-1">Cat.</th>
                  <th className="py-1">Aciertos</th>
                  <th className="py-1 text-right">Premio aprox.</th>
                </tr>
              </thead>
              <tbody>
                {PREMIOS_BALOTO.map((p) => (
                  <tr key={p.categoria} className="border-b border-gray-100">
                    <td className="py-1 font-medium">{p.categoria}ª</td>
                    <td className="py-1">{p.aciertos}</td>
                    <td className="py-1 text-right text-green-600 font-medium">{p.premio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  );
}
