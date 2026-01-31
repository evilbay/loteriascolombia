import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca de | Loterías Colombia',
  description: 'Conoce más sobre loteriascolombia.co - tu fuente confiable de resultados de loterías colombianas',
};

export default function AcercaPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Acerca de Loterías Colombia</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-gray-600">
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Nuestra Misión</h2>
            <p>Loterías Colombia nace con un objetivo claro: <strong>ser la fuente más rápida y confiable 
            de resultados de loterías colombianas.</strong></p>
            <p className="mt-2">Sabemos lo importante que es para ti conocer los resultados de tu lotería 
            favorita apenas salen. Por eso, trabajamos para actualizar los números ganadores 
            en el menor tiempo posible.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">¿Por qué Loterías Colombia?</h2>
            <div className="grid gap-4 mt-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚡</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Rapidez</h3>
                  <p>Actualizamos los resultados apenas se publican oficialmente.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">📱</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Diseño Mobile-First</h3>
                  <p>Optimizado para que consultes desde tu celular sin problemas.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🎯</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Simple y Directo</h3>
                  <p>Sin distracciones. Los números que buscas, fáciles de encontrar.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🔍</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Verificador de Números</h3>
                  <p>Ingresa tu número y te decimos si ganaste (próximamente).</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Loterías que Cubrimos</h2>
            <p>Mostramos resultados de las principales loterías colombianas:</p>
            <ul className="grid grid-cols-2 gap-2 mt-3">
              <li>🎱 Baloto</li>
              <li>🎱 Baloto Revancha</li>
              <li>📍 Lotería de Bogotá</li>
              <li>📍 Lotería de Medellín</li>
              <li>📍 Lotería de Cundinamarca</li>
              <li>📍 Lotería del Valle</li>
              <li>❤️ Lotería Cruz Roja</li>
              <li>📍 Lotería de Boyacá</li>
              <li>📍 Lotería de Santander</li>
              <li>📍 Y muchas más...</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Aviso Importante</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p><strong>Este sitio es solo informativo.</strong> No vendemos boletos de lotería 
              ni estamos afiliados a ninguna lotería oficial. Siempre verifica los resultados 
              con las fuentes oficiales antes de reclamar cualquier premio.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Contacto</h2>
            <p>¿Tienes sugerencias o encontraste un error? Escríbenos:</p>
            <p className="mt-2">📧 contacto@loteriascolombia.co</p>
          </section>

        </div>
      </div>
    </div>
  );
}
