import Link from 'next/link';
import { LotteryWithResult, Lottery } from '@/types/lottery';
import LotteryDisplay from './LotteryDisplay';
import { formatDate } from '@/lib/api';
import { getLotteryLogo } from '@/lib/lotteries';

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
  const isBaloto = lottery.id === 'baloto' || lottery.id === 'baloto-revancha';
  
  return (
    <Link href={`/loteria/${lottery.slug}`}>
      <article className={`
        result-card 
        bg-white rounded-xl 
        shadow-md hover:shadow-xl 
        overflow-hidden 
        transition-all duration-200
        ${featured ? 'ring-2 ring-colombia-yellow ring-offset-2' : ''}
      `}>
        {/* Header con color de lotería */}
        <header 
          className="px-4 py-3 text-white"
          style={{ backgroundColor: lottery.color }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {getLotteryLogo(lottery.id) && (
                <img 
                  src={getLotteryLogo(lottery.id)!} 
                  alt=""
                  className="w-7 h-7 object-contain bg-white/20 rounded-lg p-0.5 flex-shrink-0"
                  loading="lazy"
                />
              )}
              <h3 className="font-semibold truncate text-sm sm:text-base">
                {lottery.name}
              </h3>
            </div>
            {featured && (
              <span className="bg-white/25 text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                Hoy
              </span>
            )}
          </div>
        </header>

        {/* Contenido principal */}
        <div className="p-4">
          {hasResult && lottery.latestResult ? (
            <div className="space-y-3">
              {/* Fecha del sorteo */}
              <time className="text-xs text-gray-500 block">
                {formatDate(lottery.latestResult.date)}
              </time>
              
              {/* Visualización del resultado - SIN DUPLICADOS */}
              <div className="flex justify-center">
                <LotteryDisplay 
                  lottery={lottery} 
                  result={lottery.latestResult} 
                  size="medium" 
                />
              </div>

              {/* Premio/Acumulado - Solo si existe */}
              {lottery.latestResult.prize && (
                <div className={`
                  text-sm rounded-lg p-2.5 mt-2
                  ${isBaloto ? 'bg-green-50' : 'bg-gray-50'}
                `}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600 text-xs">
                      {isBaloto 
                        ? (lottery.id === 'baloto' ? '💰 Acumulado' : '🎁 Premio')
                        : '💰 Premio Mayor'
                      }
                    </span>
                    <span className={`font-bold ${isBaloto ? 'text-green-600' : 'text-gray-800'}`}>
                      {lottery.latestResult.prize}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Estado vacío - Sin resultados */
            <div className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl">🎲</span>
              </div>
              <p className="text-gray-500 text-sm font-medium">
                Esperando sorteo
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {lottery.drawDays.join(', ')} • {lottery.drawTime}
              </p>
            </div>
          )}
        </div>

        {/* Footer con CTA */}
        <footer className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
          <span className="text-sm text-colombia-blue font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Ver detalles 
            <span aria-hidden="true">→</span>
          </span>
        </footer>
      </article>
    </Link>
  );
}
