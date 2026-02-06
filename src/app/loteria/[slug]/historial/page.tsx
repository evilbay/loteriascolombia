import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LotteryDisplay from '@/components/LotteryDisplay';
import { getLotteryWithResults, formatDate, getFullResultHistory, getBalotoRevanchaHistory, BalotoRevanchaCombined } from '@/lib/api';
import { getLotteryBySlug, lotteries, getLotteryLogo } from '@/lib/lotteries';
import Link from 'next/link';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return lotteries.map((lottery) => ({ slug: lottery.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lottery = getLotteryBySlug(params.slug);
  if (!lottery) return { title: 'Lotería no encontrada' };
  
  // SEO especial para Baloto
  if (lottery.id === 'baloto' || lottery.id === 'baloto-revancha') {
    return {
      title: 'Historial Baloto y Revancha - Todos los Resultados | Loterías Colombia',
      description: 'Historial completo de resultados de Baloto y Revancha. Consulta todos los sorteos anteriores con números ganadores, superbalota y números de revancha.',
      keywords: 'baloto, revancha, historial, resultados, superbalota, lotería colombia',
    };
  }
  
  return {
    title: `Historial ${lottery.name} - Todos los Resultados | Loterías Colombia`,
    description: `Historial completo de resultados de ${lottery.name}. Consulta todos los sorteos anteriores.`,
  };
}

// Componente para mostrar una balota
function NumberBall({ 
  num, 
  variant = 'baloto',
  size = 'normal'
}: { 
  num: number; 
  variant?: 'baloto' | 'revancha' | 'superbalota' | 'extra-revancha';
  size?: 'normal' | 'small';
}) {
  const bgColor = {
    baloto: 'bg-gradient-to-br from-red-500 to-red-700',
    revancha: 'bg-gradient-to-br from-purple-500 to-purple-700',
    superbalota: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    'extra-revancha': 'bg-gradient-to-br from-blue-500 to-blue-700',
  };

  const sizeClass = size === 'small' 
    ? 'w-7 h-7 text-[10px]' 
    : 'w-9 h-9 text-xs';

  return (
    <div
      className={`
        ${sizeClass}
        ${bgColor[variant]}
        rounded-full
        flex items-center justify-center
        text-white font-bold
        shadow-md
      `}
    >
      {num.toString().padStart(2, '0')}
    </div>
  );
}

// Componente para fila del historial combinado Baloto + Revancha
function BalotoRevanchaHistoryRow({ item }: { item: BalotoRevanchaCombined }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
      {/* Fecha y número de sorteo */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b">
        <span className="text-lg font-bold text-gray-800">
          {formatDate(item.date)}
        </span>
        {item.drawNumber && (
          <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
            Sorteo #{item.drawNumber}
          </span>
        )}
      </div>
      
      {/* Grid de Baloto y Revancha lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BALOTO */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg">🔴</span>
            <p className="text-sm font-bold text-red-700 uppercase tracking-wide">
              Baloto
            </p>
          </div>
          
          {item.baloto ? (
            <>
              {/* 5 números de Baloto */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                {item.baloto.numbers.slice(0, 5).map((num, idx) => (
                  <NumberBall key={idx} num={num} variant="baloto" />
                ))}
              </div>
              
              {/* Superbalota */}
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-red-200">
                <span className="text-xs text-gray-500 font-medium">Superbalota:</span>
                <NumberBall num={item.baloto.superbalota} variant="superbalota" />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-4">
              Sin resultado
            </div>
          )}
        </div>

        {/* REVANCHA */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg">🟣</span>
            <p className="text-sm font-bold text-purple-700 uppercase tracking-wide">
              Revancha
            </p>
          </div>
          
          {item.revancha ? (
            <>
              {/* 5 números de Revancha */}
              <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                {item.revancha.numbers.slice(0, 5).map((num, idx) => (
                  <NumberBall key={idx} num={num} variant="revancha" />
                ))}
              </div>
              
              {/* Número Revancha */}
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-purple-200">
                <span className="text-xs text-gray-500 font-medium">Revancha:</span>
                <NumberBall num={item.revancha.revancha} variant="extra-revancha" />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-4">
              Sin resultado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function HistorialPage({ params }: Props) {
  const lotteryWithResult = await getLotteryWithResults(params.slug);
  if (!lotteryWithResult) notFound();

  // Verificar si es Baloto o Revancha para mostrar vista combinada
  const isBaloto = lotteryWithResult.id === 'baloto' || lotteryWithResult.id === 'baloto-revancha';
  
  // Para Baloto: obtener historial combinado
  // Para otras loterías: historial normal
  const balotoHistory = isBaloto ? await getBalotoRevanchaHistory() : [];
  const regularHistory = !isBaloto ? await getFullResultHistory(lotteryWithResult.id) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="py-8 text-white" 
        style={{ 
          background: isBaloto 
            ? 'linear-gradient(135deg, #E31837 0%, #9333EA 100%)' 
            : lotteryWithResult.color 
        }}
      >
        <div className="container mx-auto px-4">
          <Link href={`/loteria/${params.slug}`} className="inline-flex items-center text-white/80 hover:text-white mb-4">
            ← Volver a {isBaloto ? 'Baloto y Revancha' : lotteryWithResult.name}
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            {getLotteryLogo(lotteryWithResult.id) && (
              <img 
                src={getLotteryLogo(lotteryWithResult.id)!} 
                alt={`Logo ${lotteryWithResult.name}`}
                className="w-14 h-14 md:w-16 md:h-16 object-contain bg-white/10 rounded-xl p-2"
              />
            )}
            <h1 className="text-2xl md:text-4xl font-bold">
              {isBaloto ? 'Historial Baloto y Revancha' : `Historial de ${lotteryWithResult.name}`}
            </h1>
          </div>
          
          <p className="text-white/80">
            {isBaloto 
              ? 'Todos los resultados históricos de Baloto y Revancha juntos - mismo sorteo, dos oportunidades'
              : 'Todos los resultados históricos de sorteos'
            }
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        {/* Vista combinada para Baloto */}
        {isBaloto && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {balotoHistory.length} sorteo{balotoHistory.length !== 1 ? 's' : ''} registrado{balotoHistory.length !== 1 ? 's' : ''}
              </h2>
              
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  🔴 Baloto
                </span>
                <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  🟣 Revancha
                </span>
              </div>
            </div>

            {balotoHistory.length > 0 ? (
              <div className="space-y-4">
                {balotoHistory.map((item, idx) => (
                  <BalotoRevanchaHistoryRow key={`${item.date}-${idx}`} item={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-lg">No hay resultados históricos disponibles</p>
                <p className="text-sm mt-2">Los resultados se irán agregando a medida que se realicen los sorteos.</p>
              </div>
            )}
          </section>
        )}

        {/* Vista normal para otras loterías */}
        {!isBaloto && (
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {regularHistory.length} sorteo{regularHistory.length !== 1 ? 's' : ''} registrado{regularHistory.length !== 1 ? 's' : ''}
              </h2>
            </div>

            {regularHistory.length > 0 ? (
              <div className="space-y-4">
                {regularHistory.map((result) => (
                  <div 
                    key={result.id} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-semibold text-gray-800">
                            {formatDate(result.date)}
                          </span>
                          {result.drawNumber && (
                            <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              Sorteo #{result.drawNumber}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-gray-500 text-sm mr-2">Resultado:</span>
                          <LotteryDisplay 
                            lottery={lotteryWithResult} 
                            result={result} 
                            size="small" 
                          />
                        </div>
                      </div>

                      <Link 
                        href={`/loteria/${params.slug}`}
                        className="text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-white text-center"
                        style={{ backgroundColor: lotteryWithResult.color }}
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-lg">No hay resultados históricos disponibles</p>
                <p className="text-sm mt-2">Los resultados se irán agregando a medida que se realicen los sorteos.</p>
              </div>
            )}
          </section>
        )}

        {/* Link de regreso */}
        <div className="mt-8 text-center">
          <Link 
            href={`/loteria/${params.slug}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            ← Volver a la página principal de {isBaloto ? 'Baloto' : lotteryWithResult.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
