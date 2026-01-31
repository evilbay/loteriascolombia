'use client';
import { useState } from 'react';

export default function SearchBox() {
  const [numbers, setNumbers] = useState('');
  const [series, setSeries] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Buscando: ${numbers} ${series ? `- Serie: ${series}` : ''}\n\nFuncionalidad próximamente disponible`);
    setIsSearching(false);
  };

  return (
    <div id="verificar" className="bg-white rounded-xl shadow-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3 text-center">🔍 ¿Ganaste? Verifica tu número</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="numbers" className="block text-sm text-gray-600 mb-1">Tu número (4 dígitos)</label>
          <input
            type="text"
            id="numbers"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="Ej: 1234"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue outline-none"
            maxLength={4}
            inputMode="numeric"
          />
        </div>
        <div>
          <label htmlFor="series" className="block text-sm text-gray-600 mb-1">Serie (opcional)</label>
          <input
            type="text"
            id="series"
            value={series}
            onChange={(e) => setSeries(e.target.value.replace(/\D/g, '').slice(0, 3))}
            placeholder="Ej: 123"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-colombia-blue outline-none"
            maxLength={3}
            inputMode="numeric"
          />
        </div>
        <button
          type="submit"
          disabled={numbers.length < 4 || isSearching}
          className={`w-full py-3 rounded-lg font-semibold ${numbers.length >= 4 && !isSearching ? 'bg-colombia-blue text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          {isSearching ? 'Buscando...' : 'Verificar'}
        </button>
      </form>
      <p className="text-xs text-gray-400 text-center mt-3">Verifica tus números contra todos los sorteos recientes</p>
    </div>
  );
}
