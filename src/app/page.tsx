import ResultCard from '@/components/ResultCard';
import SearchBox from '@/components/SearchBox';
import BalotoRevanchaCard from '@/components/BalotoRevanchaCard';
import { getLatestResults } from '@/lib/api';
import { getTodayLotteries } from '@/lib/lotteries';

export const revalidate = 60;

export default async function HomePage() {
  const lotteriesWithResults = await getLatestResults();
  const todayLotteries = getTodayLotteries();

  // Buscar Baloto para card unificada
  const baloto = lotteriesWithResults.find(l => l.id === 'baloto');
  const balotoRevancha = lotteriesWithResults.find(l => l.id === 'baloto-revancha');
  const showBalotoUnificado = baloto?.latestResult && baloto.latestResult.numbers.length >= 6;

  // Filtrar Baloto y Revancha de las listas si vamos a mostrar card unificada
  const filteredTodayLotteries = showBalotoUnificado 
    ? todayLotteries.filter(l => l.id !== 'baloto' && l.id !== 'baloto-revancha')
    : todayLotteries;
  
  const filteredLotteriesWithResults = showBalotoUnificado
    ? lotteriesWithResults.filter(l => l.id !== 'baloto' && l.id !== 'baloto-revancha')
    : lotteriesWithResults;

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

      {/* Card unificada Baloto + Revancha */}
      {showBalotoUnificado && baloto?.latestResult && (
        <section className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">🎱</span>
            Baloto + Revancha
          </h2>
          <div className="max-w-lg mx-auto">
            <BalotoRevanchaCard
              fecha={baloto.latestResult.date}
              sorteoNumero={baloto.latestResult.drawNumber}
              numeros={baloto.latestResult.numbers.slice(0, 5)}
              superbalota={baloto.latestResult.numbers[5]}
              revancha={baloto.latestResult.numbers[6] || baloto.latestResult.numbers[5]}
              acumuladoBaloto={baloto.latestResult.prize}
              acumuladoRevancha={balotoRevancha?.latestResult?.prize}
              featured
            />
          </div>
        </section>
      )}

      {/* PUBLICIDAD DESACTIVADA 
      <div className="container mx-auto px-4 py-4">
        <div className="ad-container"><span>Espacio publicitario</span></div>
      </div>
      */}

      {filteredTodayLotteries.length > 0 && (
        <section className="container mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Sorteos de Hoy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTodayLotteries.map((lottery) => {
              const withResult = lotteriesWithResults.find(l => l.id === lottery.id);
              return <ResultCard key={lottery.id} lottery={withResult || lottery} featured />;
            })}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Últimos Resultados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredLotteriesWithResults.map((lottery) => (
            <ResultCard key={lottery.id} lottery={lottery} />
          ))}
        </div>
      </section>

      {/* PUBLICIDAD DESACTIVADA
      <div className="container mx-auto px-4 py-4">
        <div className="ad-container ad-container-large"><span>Espacio publicitario</span></div>
      </div>
      */}

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
