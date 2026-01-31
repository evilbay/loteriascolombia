import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NumberBall from '@/components/NumberBall';
import { getLotteryWithResults, formatDate, getResultHistory } from '@/lib/api';
import { getLotteryBySlug, lotteries } from '@/lib/lotteries';
import Link from 'next/link';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 text-white" style={{ backgroundColor: lotteryWithResult.color }}>
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            ← Volver
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{lotteryWithResult.name}</h1>
          <p className="text-white/80">{lotteryWithResult.description}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">📍 {lotteryWithResult.region}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🗓️ {lotteryWithResult.drawDays.map(d => dayNames[d]).join(', ')}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">🕐 {lotteryWithResult.drawTime}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Último Resultado</h2>
          {lotteryWithResult.latestResult ? (
            <div>
              <p className="text-gray-500 mb-4">{formatDate(lotteryWithResult.latestResult.date)}</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {lotteryWithResult.latestResult.numbers.map((num, idx) => (
                  <NumberBall key={idx} number={num} color={lotteryWithResult.color} size="large" />
                ))}
              </div>
              {lotteryWithResult.hasSeries && lotteryWithResult.latestResult.series && (
                <div className="mb-4">
                  <span className="text-gray-500">Serie: </span>
                  <span className="font-bold text-2xl" style={{ color: lotteryWithResult.color }}>
                    {lotteryWithResult.latestResult.series}
                  </span>
                </div>
              )}
              {lotteryWithResult.latestResult.prize && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-gray-500">Premio Mayor: </span>
                  <span className="font-bold text-2xl text-green-600">{lotteryWithResult.latestResult.prize}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No hay resultados disponibles aún</p>
            </div>
          )}
        </section>

        <div className="ad-container ad-container-large mb-8"><span>Espacio publicitario</span></div>

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
                    <th className="text-left py-3 px-2">Números</th>
                    {lotteryWithResult.hasSeries && <th className="text-left py-3 px-2">Serie</th>}
                  </tr>
                </thead>
                <tbody>
                  {history.map((result) => (
                    <tr key={result.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-gray-600">{formatDate(result.date)}</td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          {result.numbers.map((num, idx) => (
                            <NumberBall key={idx} number={num} color={lotteryWithResult.color} size="small" />
                          ))}
                        </div>
                      </td>
                      {lotteryWithResult.hasSeries && <td className="py-3 px-2 font-semibold">{result.series}</td>}
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
