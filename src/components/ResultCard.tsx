import Link from 'next/link';
import { LotteryWithResult, Lottery } from '@/types/lottery';
import NumberBall from './NumberBall';
import { formatDate } from '@/lib/api';

interface ResultCardProps {
  lottery: LotteryWithResult | Lottery;
  featured?: boolean;
}

export default function ResultCard({ lottery, featured = false }: ResultCardProps) {
  const hasResult = 'latestResult' in lottery && lottery.latestResult;
  
  return (
    <Link href={`/loteria/${lottery.slug}`}>
      <div className={`result-card bg-white rounded-xl shadow-md overflow-hidden ${featured ? 'border-2 border-colombia-yellow' : ''}`}>
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
              <div className="flex flex-wrap gap-2 mb-3">
                {lottery.latestResult.numbers.map((num, idx) => (
                  <NumberBall key={idx} number={num} color={lottery.color} size="medium" />
                ))}
              </div>
              {lottery.hasSeries && lottery.latestResult.series && (
                <div className="text-sm">
                  <span className="text-gray-500">Serie: </span>
                  <span className="font-bold" style={{ color: lottery.color }}>{lottery.latestResult.series}</span>
                </div>
              )}
              {lottery.latestResult.prize && (
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Premio: </span>
                  <span className="font-semibold text-green-600">{lottery.latestResult.prize}</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm">Sin resultados aún</p>
              <p className="text-xs text-gray-300 mt-1">{lottery.drawDays.join(', ')} - {lottery.drawTime}</p>
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
