import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Uso | Loterías Colombia',
  description: 'Términos y condiciones de uso de loteriascolombia.co',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Términos de Uso</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-gray-600">
          <p className="text-sm text-gray-500">Última actualización: Enero 2026</p>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Aceptación</h2>
            <p>Al acceder y utilizar loteriascolombia.co, aceptas estos términos de uso en su totalidad. 
            Si no estás de acuerdo, no utilices este sitio.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Descripción del Servicio</h2>
            <p>Loterías Colombia es un sitio web informativo que muestra resultados de loterías colombianas. 
            <strong> No vendemos boletos de lotería ni estamos afiliados a ninguna lotería oficial.</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Exactitud de la Información</h2>
            <p>Nos esforzamos por mostrar resultados precisos y actualizados. Sin embargo:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>No garantizamos la exactitud al 100% de los resultados</li>
              <li>Los resultados oficiales son los publicados por cada lotería</li>
              <li>Siempre verifica con fuentes oficiales antes de reclamar premios</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Limitación de Responsabilidad</h2>
            <p>Loterías Colombia no se hace responsable por:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Decisiones tomadas basadas en la información del sitio</li>
              <li>Errores u omisiones en los resultados mostrados</li>
              <li>Pérdidas económicas derivadas del uso del sitio</li>
              <li>Interrupciones del servicio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Propiedad Intelectual</h2>
            <p>Todo el contenido del sitio (diseño, código, textos, logos) es propiedad de Loterías Colombia 
            o se utiliza con licencia. No está permitida su reproducción sin autorización.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Uso Aceptable</h2>
            <p>No está permitido:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Usar el sitio para actividades ilegales</li>
              <li>Intentar acceder a sistemas no autorizados</li>
              <li>Realizar scraping masivo sin permiso</li>
              <li>Interferir con el funcionamiento del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Publicidad</h2>
            <p>Este sitio muestra anuncios de terceros (Google AdSense). No somos responsables del contenido 
            de los anuncios ni de los sitios a los que enlazan.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Modificaciones</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. 
            El uso continuado del sitio implica la aceptación de los términos modificados.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Ley Aplicable</h2>
            <p>Estos términos se rigen por las leyes de la República de Colombia.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Contacto</h2>
            <p>Para consultas sobre estos términos: contacto@loteriascolombia.co</p>
          </section>
        </div>
      </div>
    </div>
  );
}
