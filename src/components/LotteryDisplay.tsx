import { Lottery, LotteryResult } from '@/types/lottery';
import NumberBall from './NumberBall';
import TraditionalTicket from './TraditionalTicket';

interface LotteryDisplayProps {
  lottery: Lottery;
  result: LotteryResult;
  size?: 'small' | 'medium' | 'large';
}

export default function LotteryDisplay({ lottery, result, size = 'medium' }: LotteryDisplayProps) {
  // Determinar el tipo de visualización
  const isTraditional = lottery.hasSeries === true;
  const isBaloto = lottery.id === 'baloto' || lottery.id === 'baloto-revancha';

  // Loterías tradicionales (Bogotá, Medellín, etc.) - mostrar como billete
  if (isTraditional && !isBaloto) {
    const mainNumber = result.numbers[0];
    
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
  }
  
  // Baloto/Revancha - mostrar como balotas
  if (isBaloto) {
    const mainNumbers = result.numbers.slice(0, 5);
    const extraNumber = result.numbers[5];
    
    return (
      <div className="lottery-display-baloto">
        <div className="flex flex-wrap gap-2 items-center">
          {mainNumbers.map((num, idx) => (
            <NumberBall key={idx} number={num} color={lottery.color} size={size} />
          ))}
          {extraNumber !== undefined && (
            <>
              <span className="text-gray-400 mx-1">+</span>
              <NumberBall 
                number={extraNumber} 
                color="#FF6B35"
                size={size} 
              />
            </>
          )}
        </div>
      </div>
    );
  }

  // Fallback - usar bolas
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
