import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-colombia flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎱</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white">Loterías</span>
                <span className="font-bold text-xl text-colombia-yellow">Colombia</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Tu fuente confiable para resultados de loterías colombianas. Actualizamos al instante.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Loterías Populares</h3>
            <ul className="space-y-2">
              <li><Link href="/loteria/baloto" className="hover:text-white">Baloto</Link></li>
              <li><Link href="/loteria/loteria-de-bogota" className="hover:text-white">Lotería de Bogotá</Link></li>
              <li><Link href="/loteria/loteria-de-medellin" className="hover:text-white">Lotería de Medellín</Link></li>
              <li><Link href="/loteria/loteria-cruz-roja" className="hover:text-white">Cruz Roja</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Información</h3>
            <ul className="space-y-2">
              <li><Link href="/acerca" className="hover:text-white">Acerca de</Link></li>
              <li><Link href="/privacidad" className="hover:text-white">Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-white">Términos</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Loterías Colombia</p>
            <p className="mt-2 md:mt-0">Solo informativo. No vendemos boletos.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
