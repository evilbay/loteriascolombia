import { formatLotteryNumber } from '@/lib/api';

interface NumberBallProps {
  number: number;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function NumberBall({ number, color = '#0033A0', size = 'medium' }: NumberBallProps) {
  const sizeClasses = {
    small: 'w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm',
    medium: 'w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base',
    large: 'w-11 h-11 sm:w-14 sm:h-14 text-lg sm:text-xl',
  };

  // Determinar si el color de fondo es claro para usar texto oscuro
  const isLightColor = (hexColor: string): boolean => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // Fórmula de luminosidad percibida
    const luminance = (r * 299 + g * 587 + b * 114) / 1000;
    return luminance > 155;
  };

  const textColor = isLightColor(color) ? '#1f2937' : '#ffffff';

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        flex items-center justify-center 
        font-bold 
        shadow-md
        flex-shrink-0
      `}
      style={{ 
        backgroundColor: color, 
        color: textColor,
        boxShadow: `0 2px 8px -2px ${color}60`
      }}
    >
      {formatLotteryNumber(number)}
    </div>
  );
}
