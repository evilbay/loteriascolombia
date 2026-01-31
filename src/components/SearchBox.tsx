'use client';
import { useState } from 'react';
import { supabase, DbResult } from '@/lib/supabase';

interface MatchResult {
  lotteryName: string;
  drawDate: string;
  winningNumber: string;
  series?: string;
  matchType: 'exact' | 'number-only';
}

export default function SearchBox() {
  const [numbers, setNumbers] = useState('');
  const [series, setSeries] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [searched, setSearched] = useState(false);

  // Mapeo de IDs de DB a nombres amigables
  const lotteryNames: Record<string, string> = {
    'loteria-bogota': 'Lotería de Bogotá',
    'bogota': 'Lotería de Bogotá',
    'loteria-medellin': 'Lotería de Medellín',
    'medellin': 'Lotería de Medellín',
    'loteria-cundinamarca': 'Lotería de Cundinamarca',
    'cundinamarca': 'Lotería de Cundinamarca',
    'cruz-roja': 'Lotería Cruz Roja',
    'loteria-valle': 'Lotería del Valle',
    'valle': 'Lotería del Valle',
    'loteria-boyaca': 'Lotería de Boyacá',
    'boyaca': 'Lotería de Boyacá',
    'loteria-santander': 'Lotería de Santander',
    'santander': 'Lotería de Santander',
    'loteria-cauca': 'Lotería del Cauca',
    'cauca': 'Lotería del Cauca',
    'loteria-huila': 'Lotería del Huila',
    'huila': 'Lotería del Huila',
    'loteria-manizales': 'Lotería de Manizales',
    'manizales': 'Lotería de Manizales',
    'loteria-meta': 'Lotería del Meta',
    'meta': 'Lotería del Meta',
    'loteria-quindio': 'Lotería del Quindío',
    'quindio': 'Lotería del Quindío',
    'loteria-risaralda': 'Lotería de Risaralda',
    'risaralda': 'Lotería de Risaralda',
    'loteria-tolima': 'Lotería del Tolima',
    'tolima': 'Lotería del Tolima',
    'baloto': 'Baloto',
    'baloto-revancha': 'Baloto Revancha',
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-CO', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearched(true);
    setResults(null);

    try {
      // Obtener los últimos 30 días de resultados
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .gte('draw_date', thirtyDaysAgo.toISOString().split('T')[0])
        .order('draw_date', { ascending: false });

      if (error) {
        console.error('Error fetching results:', error);
        setResults([]);
        setIsSearching(false);
        return;
      }

      const matches: MatchResult[] = [];
      const userNumber = numbers.padStart(4, '0');

      for (const result of (data || []) as DbResult[]) {
        // Extraer el número de 4 dígitos del resultado
        const mainNumbers = result.numbers?.main || [];
        
        // Para loterías tradicionales, el número está en main como array
        // Convertir a string de 4 dígitos
        let winningNumber = '';
        if (mainNumbers.length === 4) {
          // Si son 4 dígitos individuales [1,2,3,4]
          winningNumber = mainNumbers.map(n => n.toString()).join('');
        } else if (mainNumbers.length === 1) {
          // Si es un solo número como [1234]
          winningNumber = mainNumbers[0].toString().padStart(4, '0');
        } else if (mainNumbers.length > 4) {
          // Para Baloto y similares, tomamos los primeros números pero no es lo que busca el usuario típicamente
          continue;
        }
        
        // Asegurarnos de que tengamos 4 dígitos
        if (winningNumber.length !== 4) continue;
        
        const resultSeries = result.numbers?.series;
        
        // Verificar coincidencia de número
        if (userNumber === winningNumber) {
          // Si el usuario ingresó serie, verificar también
          if (series) {
            const userSeries = series.padStart(3, '0');
            if (resultSeries && userSeries === resultSeries.padStart(3, '0')) {
              matches.push({
                lotteryName: lotteryNames[result.lottery_id] || result.lottery_id,
                drawDate: result.draw_date,
                winningNumber,
                series: resultSeries,
                matchType: 'exact',
              });
            } else {
              matches.push({
                lotteryName: lotteryNames[result.lottery_id] || result.lottery_id,
                drawDate: result.draw_date,
                winningNumber,
                series: resultSeries,
                matchType: 'number-only',
              });
            }
          } else {
            matches.push({
              lotteryName: lotteryNames[result.lottery_id] || result.lottery_id,
              drawDate: result.draw_date,
              winningNumber,
              series: resultSeries,
              matchType: resultSeries ? 'number-only' : 'exact',
            });
          }
        }
      }

      setResults(matches);
    } catch (err) {
      console.error('Error:', err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setNumbers('');
    setSeries('');
    setResults(null);
    setSearched(false);
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
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${numbers.length >= 4 && !isSearching ? 'bg-colombia-blue text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          {isSearching ? 'Verificando...' : 'Verificar'}
        </button>
      </form>

      {/* Resultados de la verificación */}
      {searched && !isSearching && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {results && results.length > 0 ? (
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-2xl">🎉</span>
                <p className="font-bold text-green-600 text-lg">¡Encontramos coincidencias!</p>
              </div>
              {results.map((match, idx) => (
                <div key={idx} className={`p-3 rounded-lg ${match.matchType === 'exact' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <p className="font-semibold text-gray-800">{match.lotteryName}</p>
                  <p className="text-sm text-gray-600">{formatDate(match.drawDate)}</p>
                  <p className="text-lg font-mono">
                    <span className="font-bold">{match.winningNumber}</span>
                    {match.series && <span className="text-gray-500"> - Serie: {match.series}</span>}
                  </p>
                  {match.matchType === 'number-only' && match.series && (
                    <p className="text-xs text-yellow-700 mt-1">⚠️ Número coincide, verifica la serie</p>
                  )}
                  {match.matchType === 'exact' && (
                    <p className="text-xs text-green-700 mt-1">✅ ¡Coincidencia exacta!</p>
                  )}
                </div>
              ))}
              <p className="text-xs text-gray-500 text-center">Verifica tu billete físico y reclama en un punto autorizado</p>
            </div>
          ) : (
            <div className="text-center py-2">
              <span className="text-2xl">😔</span>
              <p className="text-gray-600 mt-1">No encontramos coincidencias en los últimos 30 días</p>
              <p className="text-xs text-gray-400 mt-1">Número buscado: {numbers}{series && ` - Serie: ${series}`}</p>
            </div>
          )}
          <button
            onClick={resetSearch}
            className="w-full mt-3 py-2 text-sm text-colombia-blue hover:underline"
          >
            Verificar otro número
          </button>
        </div>
      )}

      {!searched && (
        <p className="text-xs text-gray-400 text-center mt-3">Verifica tus números contra todos los sorteos de los últimos 30 días</p>
      )}
    </div>
  );
}
