import { Metadata } from 'next';
import GaneVerificador from './GaneVerificador';
import { lotteries } from '@/lib/lotteries';
import { getFullResultHistory } from '@/lib/api';

export const metadata: Metadata = {
  title: '¿Ganaste? Verificador de Números | Loterías Colombia',
  description: 'Verifica si tu número de lotería ganó. Comprueba tus números de Baloto, Lotería de Bogotá, Medellín, y todas las loterías colombianas.',
  keywords: ['verificar lotería', 'ganaste lotería', 'comprobar números lotería', 'verificar baloto', 'lotería colombia'],
};

// Loterías verificables (excluir super-astro que tiene mecánica diferente)
const loteriasVerificables = lotteries.filter(l => 
  l.lotteryType === 'traditional' || l.lotteryType === 'baloto'
);

export const revalidate = 300; // Revalidar cada 5 minutos

export default async function GanePage() {
  // Pre-cargar resultados de todas las loterías para el cliente
  const loteriasConResultados = await Promise.all(
    loteriasVerificables.map(async (lottery) => {
      const history = await getFullResultHistory(lottery.id);
      return {
        ...lottery,
        resultados: history.slice(0, 50), // Últimos 50 sorteos
      };
    })
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="gradient-header text-white py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            🎯 ¿Ganaste?
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Verifica si tu número de lotería es ganador. Selecciona tu lotería, 
            ingresa tus números y descubre si eres el próximo millonario.
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <GaneVerificador loterias={JSON.parse(JSON.stringify(loteriasConResultados))} />
        </div>
      </section>

      {/* Info adicional */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>ℹ️</span> Información importante
            </h2>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-3">
                <span className="text-green-500 text-lg">✓</span>
                <p>
                  <strong>Loterías tradicionales:</strong> Verificamos el número de 4 cifras, 
                  la serie de 3 cifras, y calculamos aproximaciones (3, 2 y última cifra).
                </p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-green-500 text-lg">✓</span>
                <p>
                  <strong>Baloto:</strong> Verificamos tus 5 números principales (1-43) más la 
                  Superbalota (1-16) para Baloto y Revancha simultáneamente.
                </p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-yellow-500 text-lg">⚠️</span>
                <p>
                  <strong>Aviso:</strong> Esta herramienta es solo informativa. Siempre verifica 
                  los resultados con la lotería oficial antes de reclamar cualquier premio.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">📊 ¿Cómo se calculan los premios?</h3>
              <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                <li><strong>Premio Mayor:</strong> Número + Serie exactos</li>
                <li><strong>Secos:</strong> Números premiados adicionales del sorteo</li>
                <li><strong>3 últimas cifras:</strong> Aproximadamente $70,000</li>
                <li><strong>2 últimas cifras:</strong> Aproximadamente $7,000</li>
                <li><strong>Última cifra:</strong> Aproximadamente $700</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
