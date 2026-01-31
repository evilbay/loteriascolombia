import ResultCard from '@/components/ResultCard';
import SearchBox from '@/components/SearchBox';
import { getLatestResults } from '@/lib/api';
import { getTodayLotteries } from '@/lib/lotteries';

export const revalidate = 60;

export default async function HomePage() {
  const lotteriesWithResults = await getLatestResults();
  const todayLotteries = getTodayLotteries();

  return (
    <div className="min-h-screen">
      <section className="gradient-header text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Resultados de Loterías Colombia
          </h1>
          <p className="text-center text-blue-100 mb-8 max-w-2xl mx-auto">
            Consulta los resultados de todas las loterías colombianas actualizados en tiempo real
          </p>
          <div className="max-w-md mx-auto">
            <SearchBox />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-4">
        <div className="ad-container"><span>Espacio publicitario</span></div>
      </div>

      {todayLotteries.length > 0 && (
        <section className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Sorteos de Hoy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayLotteries.map((lottery) => {
              const withResult = lotteriesWithResults.find(l => l.id === lottery.id);
              return <ResultCard key={lottery.id} lottery={withResult || lottery} featured />;
            })}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Últimos Resultados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lotteriesWithResults.map((lottery) => (
            <ResultCard key={lottery.id} lottery={lottery} />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-4">
        <div className="ad-container ad-container-large"><span>Espacio publicitario</span></div>
      </div>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">¿Por qué Loterías Colombia?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-colombia-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Resultados al Instante</h3>
              <p className="text-gray-600">Actualizamos los resultados apenas salen los sorteos</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-colombia-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-800 text-xl">✓</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Todas las Loterías</h3>
              <p className="text-gray-600">Bogotá, Medellín, Baloto, Cruz Roja y todas las demás</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-colombia-red rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Mobile First</h3>
              <p className="text-gray-600">Diseñado para verse perfecto en tu celular</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
