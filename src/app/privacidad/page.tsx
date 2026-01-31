import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Loterías Colombia',
  description: 'Política de privacidad de loteriascolombia.co',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Política de Privacidad</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 text-gray-600">
          <p className="text-sm text-gray-500">Última actualización: Enero 2026</p>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Información que Recopilamos</h2>
            <p>Loterías Colombia recopila información mínima necesaria para el funcionamiento del sitio:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Datos de uso anónimos (páginas visitadas, tiempo en el sitio)</li>
              <li>Información técnica del navegador y dispositivo</li>
              <li>Cookies para mejorar la experiencia de usuario</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Uso de la Información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Mejorar nuestro servicio y experiencia de usuario</li>
              <li>Analizar tendencias de uso del sitio</li>
              <li>Mostrar publicidad relevante (Google AdSense)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Cookies</h2>
            <p>Utilizamos cookies propias y de terceros (Google Analytics, Google AdSense) para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Recordar preferencias del usuario</li>
              <li>Analizar el tráfico del sitio</li>
              <li>Personalizar anuncios</li>
            </ul>
            <p className="mt-2">Puedes desactivar las cookies en la configuración de tu navegador.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Terceros</h2>
            <p>Compartimos información con:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Google AdSense:</strong> Para mostrar anuncios personalizados</li>
              <li><strong>Google Analytics:</strong> Para análisis de tráfico</li>
              <li><strong>Vercel:</strong> Nuestro proveedor de hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Seguridad</h2>
            <p>Implementamos medidas de seguridad estándar de la industria para proteger la información. 
            Sin embargo, ninguna transmisión por Internet es 100% segura.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Derechos del Usuario</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Acceder a tus datos personales</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contacto</h2>
            <p>Para consultas sobre privacidad, contacta a: privacidad@loteriascolombia.co</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Cambios</h2>
            <p>Nos reservamos el derecho de modificar esta política. Los cambios serán publicados en esta página.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
