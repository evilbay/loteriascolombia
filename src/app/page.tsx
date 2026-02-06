import ResultCard from '@/components/ResultCard';
import SearchBox from '@/components/SearchBox';
import BalotoRevanchaCard from '@/components/BalotoRevanchaCard';
import { getLatestResults } from '@/lib/api';
import { getTodayLotteries } from '@/lib/lotteries';

export const revalidate = 60;

export default async function HomePage() {
  const lotteriesWithResults = await getLatestResults();
  const todayLotteries = getTodayLotteries();

  // Buscar Baloto y Revancha para card unificada
  const baloto = lotteriesWithResults.find(l => l.id === 'baloto');
  const balotoRevancha = lotteriesWithResults.find(l => l.id === 'baloto-revancha');
  
  // Verificar que ambos tienen resultados
  const showBalotoUnificado = baloto?.latestResult && balotoRevancha?.latestResult;

  // Extraer números de Baloto (puede ser array o objeto con .main)
  const getBalotoNumbers = () => {
    const result = baloto?.latestResult;
    if (!result) return { main: [], superbalota: 0 };
    return { 
      main: result.numbers || [], 
      superbalota: result.superbalota || 0 
    };
  };

  // Extraer números de Revancha
  const getRevanchaNumbers = () => {
    const result = balotoRevancha?.latestResult;
    if (!result) return { main: [], revancha: 0 };
    return { 
      main: result.numbers || [], 
      revancha: result.revancha || 0 
    };
  };

  const balotoNums = getBalotoNumbers();
  const revanchaNums = getRevanchaNumbers();

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
              numerosBaloto={balotoNums.main}
              superbalota={balotoNums.superbalota}
              numerosRevancha={revanchaNums.main}
              revancha={revanchaNums.revancha}
              acumuladoBaloto={baloto.latestResult.prize}
              acumuladoRevancha={balotoRevancha?.latestResult?.prize}
              featured
            />
          </div>
        </section>
      )}

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

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Ganaste?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Verifica tus números y descubre si eres el próximo ganador
          </p>
          <a 
            href="/gane" 
            className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Verificar mis números
          </a>
        </div>
      </section>
    </div>
  );
}
