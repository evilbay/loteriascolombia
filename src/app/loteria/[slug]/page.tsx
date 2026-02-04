import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LotteryDisplay from '@/components/LotteryDisplay';
import SecosDisplay from '@/components/SecosDisplay';
import VerificadorTradicional from '@/components/VerificadorTradicional';
import VerificadorBaloto from '@/components/VerificadorBaloto';
import BalotoRevanchaCard from '@/components/BalotoRevanchaCard';
import { getLotteryWithResults, formatDate, getResultHistory } from '@/lib/api';
import { getLotteryBySlug, lotteries, getLotteryLogo } from '@/lib/lotteries';
import Link from 'next/link';

// ISR: Revalidar cada 60 segundos para mostrar datos frescos
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
  
  // Obtener número ganador para secos
  const numeroGanador = lotteryWithResult.latestResult?.numbers?.join('') || '';
  const serie = lotteryWithResult.latestResult?.series || '';

  // Preparar datos para verificadores
  const resultadosTradicional = history.map(r => ({
    id: r.id,
    fecha: r.date,
    numero: r.numbers[0]?.toString().padStart(4, '0') || '',
    serie: r.series,
    secos: [], // TODO: Cargar secos reales de BD
  }));

  const resultadosBaloto = history.map(r => ({
    id: r.id,
    fecha: r.date,
    numeros: r.numbers.slice(0, 5),
    superbalota: r.numbers[5] || 0,
    revancha: r.numbers[6] || r.numbers[5] || 0, // Por ahora usar el mismo, idealmente separados
  }));

  // Para Baloto, obtener también resultados de Revancha si existen
  const latestBalotoResult = lotteryWithResult.latestResult;
  const hasRevancha = isBaloto && latestBalotoResult && latestBalotoResult.numbers.length >= 6;

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
        {/* Card especial para Baloto + Revancha */}
        {isBaloto && latestBalotoResult && latestBalotoResult.numbers.length >= 6 && (
          <section className="mb-8">
            <BalotoRevanchaCard
              fecha={latestBalotoResult.date}
              sorteoNumero={latestBalotoResult.drawNumber}
              numeros={latestBalotoResult.numbers.slice(0, 5)}
              superbalota={latestBalotoResult.numbers[5]}
              revancha={latestBalotoResult.numbers[6] || latestBalotoResult.numbers[5]}
              acumuladoBaloto={latestBalotoResult.prize}
              featured
            />
          </section>
        )}

        {/* Resultado estándar (para loterías tradicionales o cuando Baloto no tiene el formato esperado) */}
        {(!isBaloto || !latestBalotoResult || latestBalotoResult.numbers.length < 6) && (
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Último Resultado</h2>
            {lotteryWithResult.latestResult ? (
              <div>
                <p className="text-gray-500 mb-4">{formatDate(lotteryWithResult.latestResult.date)}</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <LotteryDisplay 
                    lottery={lotteryWithResult} 
                    result={lotteryWithResult.latestResult} 
                    size="large" 
                  />
                </div>
                {lotteryWithResult.latestResult.prize && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <span className="text-gray-500">Premio Mayor: </span>
                    <span className="font-bold text-2xl text-green-600">{lotteryWithResult.latestResult.prize}</span>
                  </div>
                )}
                
                {/* Secos y Aproximaciones - Solo para loterías tradicionales */}
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
        )}

        {/* Verificador de números */}
        <section className="mb-8">
          {isBaloto ? (
            <VerificadorBaloto 
              resultados={resultadosBaloto}
            />
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
                  {history.map((result) => (
                    <tr key={result.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-gray-600">{formatDate(result.date)}</td>
                      <td className="py-3 px-2">
                        <LotteryDisplay 
                          lottery={lotteryWithResult} 
                          result={result} 
                          size="small" 
                        />
                      </td>
                      {lotteryWithResult.hasSeries && !isBaloto && (
                        <td className="py-3 px-2 font-semibold">{result.series}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
