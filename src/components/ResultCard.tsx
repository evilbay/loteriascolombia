import Link from 'next/link';
import { LotteryWithResult, Lottery } from '@/types/lottery';
import LotteryDisplay from './LotteryDisplay';
import { formatDate } from '@/lib/api';

interface ResultCardProps {
  lottery: LotteryWithResult | Lottery;
  featured?: boolean;
}

export default function ResultCard({ lottery, featured = false }: ResultCardProps) {
  const hasResult = 'latestResult' in lottery && lottery.latestResult;
  const lotteryType = lottery.lotteryType || 
    (lottery.hasSeries && lottery.numbersCount === 4 ? 'traditional' :
     (lottery.id === 'baloto' || lottery.id === 'baloto-revancha') ? 'baloto' : 
     lottery.id === 'super-astro' ? 'astro' : 'traditional');
  const isTraditionalLottery = lotteryType === 'traditional';
  
  return (
    <Link href={`/loteria/${lottery.slug}`}>
      <div className={`result-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${featured ? 'border-2 border-colombia-yellow' : ''}`}>
        <div className="px-4 py-3 text-white" style={{ backgroundColor: lottery.color }}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold truncate">{lottery.name}</h3>
            {featured && <span className="bg-white/20 text-xs px-2 py-1 rounded-full">Hoy</span>}
          </div>
        </div>

        <div className="p-4">
          {hasResult && lottery.latestResult ? (
            <>
              <p className="text-sm text-gray-500 mb-3">{formatDate(lottery.latestResult.date)}</p>
              
              {/* Sistema de visualización diferenciado */}
              <div className="mb-3">
                <LotteryDisplay 
                  lottery={lottery} 
                  result={lottery.latestResult} 
                  size="medium" 
                />
              </div>

              {/* Para loterías tradicionales, mostrar terminología correcta */}
              {isTraditionalLottery && lottery.latestResult.series && (
                <div className="text-sm bg-gray-50 rounded-lg p-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Décimo ganador:</span>
                    <span className="font-bold" style={{ color: lottery.color }}>
                      {lottery.latestResult.numbers[0].toString().padStart(4, '0')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Serie:</span>
                    <span className="font-bold" style={{ color: lottery.color }}>
                      {lottery.latestResult.series.toString().padStart(3, '0')}
                    </span>
                  </div>
                </div>
              )}

              {/* Para Baloto/Revancha, mostrar acumulado */}
              {(lottery.id === 'baloto' || lottery.id === 'baloto-revancha') && lottery.latestResult.prize && (
                <div className="mt-2 text-sm bg-green-50 rounded-lg p-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {lottery.id === 'baloto' ? 'Acumulado:' : 'Premio:'}
                    </span>
                    <span className="font-semibold text-green-600">{lottery.latestResult.prize}</span>
                  </div>
                </div>
              )}

              {/* Premio general para otras loterías */}
              {lottery.latestResult.prize && lottery.id !== 'baloto' && lottery.id !== 'baloto-revancha' && (
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Premio Mayor: </span>
                  <span className="font-semibold text-green-600">{lottery.latestResult.prize}</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm">Sin resultados aún</p>
              <p className="text-xs text-gray-300 mt-1">
                {lottery.drawDays.join(', ')} - {lottery.drawTime}
              </p>
              {isTraditionalLottery && (
                <p className="text-xs text-gray-400 mt-1">Sorteo de billetes y décimos</p>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-gray-50 border-t">
          <span className="text-sm text-colombia-blue hover:underline">Ver detalles →</span>
        </div>
      </div>
    </Link>
  );
}
