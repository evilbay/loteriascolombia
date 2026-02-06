import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LotteryDisplay from '@/components/LotteryDisplay';
import SecosDisplay from '@/components/SecosDisplay';
import VerificadorTradicional from '@/components/VerificadorTradicional';
import VerificadorBaloto from '@/components/VerificadorBaloto';
import { getLotteryWithResults, formatDate, getResultHistory } from '@/lib/api';
import { getLotteryBySlug, lotteries, getLotteryLogo } from '@/lib/lotteries';
import Link from 'next/link';

export const revalidate = 60;

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return lotteries.map((lottery) => ({ slug: lottery.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lottery = getLotteryBySlug(params.slug);
  if (!lottery) return { title: 'Lotería no encontrada' };
  return {
    title: `${lottery.name} - Resultados Hoy | Loterías Colombia`,
    description: `Resultados de ${lottery.name}. Consulta los números ganadores de hoy.`,
  };
}

// Helper para extraer números del resultado
function extractNumbers(result: any): { numbers: number[], extra?: number, extraName?: string } {
  if (!result) return { numbers: [] };
  
  // Números principales siempre vienen en result.numbers (array)
  const numbers = Array.isArray(result.numbers) ? result.numbers : [];
  
  // Campos específicos para Baloto/Revancha
  if (result.superbalota !== undefined) {
    return { numbers, extra: result.superbalota, extraName: 'Superbalota' };
  }
  if (result.revancha !== undefined) {
    return { numbers, extra: result.revancha, extraName: 'Revancha' };
  }
  
  return { numbers };
}

export default async function LotteryPage({ params }: Props) {
  const lotteryWithResult = await getLotteryWithResults(params.slug);
  if (!lotteryWithResult) notFound();

  const history = await getResultHistory(lotteryWithResult.id);
  const dayNames: Record<string, string> = {
    lunes: 'Lunes', martes: 'Martes', miercoles: 'Miércoles',
    jueves: 'Jueves', viernes: 'Viernes', sabado: 'Sábado', domingo: 'Domingo',
  };

  // Determinar tipo de lotería
  const isBaloto = lotteryWithResult.id === 'baloto' || lotteryWithResult.id === 'baloto-revancha';
  const isTraditional = !isBaloto && (
    lotteryWithResult.lotteryType === 'traditional' || 
    (lotteryWithResult.hasSeries && lotteryWithResult.numbersCount === 4)
  );
  
  // Extraer números del resultado
  const latestNumbers = extractNumbers(lotteryWithResult.latestResult);
  
  // Obtener número ganador para secos
  const numeroGanador = lotteryWithResult.latestResult?.numbers?.join?.('') || 
    latestNumbers.numbers.join('') || '';
  const serie = lotteryWithResult.latestResult?.series || '';

  // Preparar datos para verificadores
  const resultadosTradicional = history.map(r => ({
    id: r.id,
    fecha: r.date,
    numero: Array.isArray(r.numbers) 
      ? r.numbers[0]?.toString().padStart(4, '0') || ''
      : '',
    serie: r.series,
    secos: [],
  }));

  const resultadosBaloto = history.map(r => {
    const nums = extractNumbers(r);
    return {
      id: r.id,
      fecha: r.date,
      numeros: nums.numbers,
      superbalota: nums.extra || 0,
      revancha: nums.extra || 0,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 text-white" style={{ backgroundColor: lotteryWithResult.color }}>
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            ← Volver
          </Link>
          <div className="flex items-center gap-4 mb-2">
            {getLotteryLogo(lotteryWithResult.id) && (
              <img 
                src={getLotteryLogo(lotteryWithResult.id)!} 
                alt={`Logo ${lotteryWithResult.name}`}
                className="w-16 h-16 md:w-20 md:h-20 object-contain bg-white/10 rounded-xl p-2"
              />
            )}
            <h1 className="text-3xl md:text-4xl font-bold">{lotteryWithResult.name}</h1>
          </div>
          <p className="text-white/80">{lotteryWithResult.description}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">📍 {lotteryWithResult.region}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🗓️ {lotteryWithResult.drawDays.map(d => dayNames[d]).join(', ')}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🕐 {lotteryWithResult.drawTime}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Resultado */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Último Resultado</h2>
          {lotteryWithResult.latestResult ? (
            <div>
              <p className="text-gray-500 mb-4">{formatDate(lotteryWithResult.latestResult.date)}</p>
              
              {/* Números principales */}
              <div className="flex flex-wrap gap-3 mb-4">
                {latestNumbers.numbers.map((num, idx) => (
                  <div 
                    key={idx}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    style={{ backgroundColor: lotteryWithResult.color }}
                  >
                    {num.toString().padStart(2, '0')}
                  </div>
                ))}
                
                {/* Número extra (Superbalota/Revancha) */}
                {latestNumbers.extra !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">+</span>
                    <div 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      style={{ 
                        backgroundColor: latestNumbers.extraName === 'Superbalota' ? '#f59e0b' : '#8b5cf6'
                      }}
                    >
                      {latestNumbers.extra.toString().padStart(2, '0')}
                    </div>
                    <span className="text-xs text-gray-500">{latestNumbers.extraName}</span>
                  </div>
                )}
              </div>
              
              {lotteryWithResult.latestResult.prize && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <span className="text-gray-500">Premio Mayor: </span>
                  <span className="font-bold text-2xl text-green-600">{lotteryWithResult.latestResult.prize}</span>
                </div>
              )}
              
              {/* Secos - Solo para loterías tradicionales */}
              {isTraditional && numeroGanador && (
                <SecosDisplay
                  resultadoId={lotteryWithResult.latestResult.id || ''}
                  lotteryId={lotteryWithResult.id}
                  numeroGanador={numeroGanador}
                  serie={serie}
                  variant="compact"
                />
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No hay resultados disponibles aún</p>
            </div>
          )}
        </section>

        {/* Verificador de números */}
        <section className="mb-8">
          {isBaloto ? (
            <VerificadorBaloto resultados={resultadosBaloto} />
          ) : isTraditional && resultadosTradicional.length > 0 ? (
            <VerificadorTradicional
              lotteryId={lotteryWithResult.id}
              lotteryName={lotteryWithResult.name}
              color={lotteryWithResult.color}
              resultados={resultadosTradicional}
            />
          ) : null}
        </section>

        {history.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Historial de Resultados</h2>
              <Link 
                href={`/loteria/${params.slug}/historial`}
                className="text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: lotteryWithResult.color }}
              >
                Ver historial completo →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Fecha</th>
                    <th className="text-left py-3 px-2">Resultado</th>
                    {lotteryWithResult.hasSeries && !isBaloto && (
                      <th className="text-left py-3 px-2">Serie</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {history.map((result) => {
                    const nums = extractNumbers(result);
                    return (
                      <tr key={result.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 text-gray-600">{formatDate(result.date)}</td>
                        <td className="py-3 px-2">
                          <div className="flex flex-wrap gap-1">
                            {nums.numbers.map((n, i) => (
                              <span 
                                key={i} 
                                className="inline-block w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center"
                                style={{ backgroundColor: lotteryWithResult.color }}
                              >
                                {n.toString().padStart(2, '0')}
                              </span>
                            ))}
                            {nums.extra !== undefined && (
                              <span 
                                className="inline-block w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center ml-1"
                                style={{ 
                                  backgroundColor: nums.extraName === 'Superbalota' ? '#f59e0b' : '#8b5cf6'
                                }}
                              >
                                {nums.extra.toString().padStart(2, '0')}
                              </span>
                            )}
                          </div>
                        </td>
                        {lotteryWithResult.hasSeries && !isBaloto && (
                          <td className="py-3 px-2 font-semibold">{result.series}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
