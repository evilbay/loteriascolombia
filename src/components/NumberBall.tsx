import { formatLotteryNumber } from '@/lib/api';

interface NumberBallProps {
  number: number;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function NumberBall({ number, color = '#0033A0', size = 'medium' }: NumberBallProps) {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-14 h-14 text-xl',
  };

  const isLight = (c: string) => {
    const hex = c.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 155;
  };

  return (
    <div
      className={`number-ball ${sizeClasses[size]} rounded-full flex items-center justify-center font-bold shadow-md transition-transform hover:scale-110`}
      style={{ backgroundColor: color, color: isLight(color) ? '#000' : '#FFF' }}
    >
      {formatLotteryNumber(number)}
    </div>
  );
}
