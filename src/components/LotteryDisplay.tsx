import { Lottery, LotteryResult } from '@/types/lottery';
import NumberBall from './NumberBall';
import TraditionalTicket from './TraditionalTicket';

interface LotteryDisplayProps {
  lottery: Lottery;
  result: LotteryResult;
  size?: 'small' | 'medium' | 'large';
}

export default function LotteryDisplay({ lottery, result, size = 'medium' }: LotteryDisplayProps) {
  // Determinar el tipo de visualización basado en lotteryType o fallback a lógica anterior
  const lotteryType = lottery.lotteryType || 
    (lottery.hasSeries && lottery.numbersCount === 4 ? 'traditional' :
     (lottery.id === 'baloto' || lottery.id === 'baloto-revancha') ? 'baloto' : 
     lottery.id === 'super-astro' ? 'astro' : 'traditional');

  if (lotteryType === 'traditional') {
    // Loterías tradicionales: mostrar como billete/décimo
    const mainNumber = result.numbers[0]; // El número principal
    
    return (
      <div className="lottery-display-traditional">
        <TraditionalTicket
          number={mainNumber}
          series={result.series}
          color={lottery.color}
          size={size}
          showLabels={size === 'large'}
        />
      </div>
    );
    
  } else if (lotteryType === 'baloto') {
    // Baloto/Revancha: mostrar como balotas
    const mainNumbers = result.numbers.slice(0, 5);
    const extraNumber = result.numbers[5];
    
    return (
      <div className="lottery-display-baloto">
        <div className="flex flex-wrap gap-2 items-center">
          {/* 5 balotas principales */}
          {mainNumbers.map((num, idx) => (
            <NumberBall key={idx} number={num} color={lottery.color} size={size} />
          ))}
          
          {/* Balota extra */}
          {extraNumber !== undefined && (
            <>
              <span className="text-gray-400 mx-1">+</span>
              <div className="relative">
                <NumberBall 
                  number={extraNumber} 
                  color={lottery.id === 'baloto' ? '#FF6B35' : '#FFF'} 
                  size={size} 
                />
                {/* Indicador de balota extra */}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full border-2 border-current text-xs font-bold w-4 h-4 flex items-center justify-center" style={{ color: lottery.color }}>
                  +
                </div>
              </div>
            </>
          )}
        </div>
        
        {size === 'large' && (
          <div className="mt-2 text-xs text-gray-600">
            <span>5 balotas</span>
            {extraNumber !== undefined && <span> + balota extra</span>}
          </div>
        )}
      </div>
    );
    
  } else if (lotteryType === 'astro') {
    // Super Astro: formato especial (por implementar)
    return (
      <div className="lottery-display-astro">
        <div className="flex items-center gap-2">
          <span className="text-2xl">♌</span>
          <span className="font-bold text-lg">{result.numbers[0]}</span>
        </div>
        {size === 'large' && (
          <div className="text-xs text-gray-600 mt-1">
            Signo y número
          </div>
        )}
      </div>
    );
    
  } else {
    // Fallback: usar balotas por defecto
    return (
      <div className="lottery-display-default">
        <div className="flex flex-wrap gap-2">
          {result.numbers.map((num, idx) => (
            <NumberBall key={idx} number={num} color={lottery.color} size={size} />
          ))}
        </div>
      </div>
    );
  }
}