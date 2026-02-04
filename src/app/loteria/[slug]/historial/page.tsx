import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import LotteryDisplay from '@/components/LotteryDisplay';
import { getLotteryWithResults, formatDate, getFullResultHistory } from '@/lib/api';
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
    title: `Historial ${lottery.name} - Todos los Resultados | Loterías Colombia`,
    description: `Historial completo de resultados de ${lottery.name}. Consulta todos los sorteos anteriores.`,
  };
}

export default async function HistorialPage({ params }: Props) {
  const lotteryWithResult = await getLotteryWithResults(params.slug);
  if (!lotteryWithResult) notFound();

  const history = await getFullResultHistory(lotteryWithResult.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-8 text-white" style={{ backgroundColor: lotteryWithResult.color }}>
        <div className="container mx-auto px-4">
          <Link href={`/loteria/${params.slug}`} className="inline-flex items-center text-white/80 hover:text-white mb-4">
            ← Volver a {lotteryWithResult.name}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Historial de {lotteryWithResult.name}
          </h1>
          <p className="text-white/80">
            Todos los resultados históricos de sorteos
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {history.length} sorteo{history.length !== 1 ? 's' : ''} registrado{history.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((result) => (
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

        {/* PUBLICIDAD DESACTIVADA
        <div className="ad-container ad-container-large mt-8">
          <span>Espacio publicitario</span>
        </div>
        */}

        {/* Link de regreso */}
        <div className="mt-8 text-center">
          <Link 
            href={`/loteria/${params.slug}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            ← Volver a la página principal de {lotteryWithResult.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
