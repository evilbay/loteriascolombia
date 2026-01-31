import { formatLotteryNumber } from '@/lib/api';

interface TraditionalTicketProps {
  number: number;
  series?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
}

export default function TraditionalTicket({ 
  number, 
  series, 
  color = '#0033A0', 
  size = 'medium',
  showLabels = false
}: TraditionalTicketProps) {
  const sizeClasses = {
    small: 'w-16 h-12 text-xs',
    medium: 'w-20 h-16 text-sm', 
    large: 'w-28 h-20 text-base',
  };

  const numberSizeClasses = {
    small: 'text-sm font-bold',
    medium: 'text-xl font-black',
    large: 'text-2xl font-black',
  };

  const seriesSizeClasses = {
    small: 'text-xs font-semibold',
    medium: 'text-sm font-bold',
    large: 'text-lg font-bold',
  };

  const isLight = (c: string) => {
    const hex = c.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 155;
  };

  const textColor = isLight(color) ? '#000' : '#FFF';
  const borderColor = color;

  return (
    <div className="traditional-ticket-container">
      {showLabels && (
        <div className="flex gap-2 mb-2 text-xs text-gray-600">
          <span className="flex-1 text-center">NÚMERO</span>
          {series && <span className="flex-1 text-center">SERIE</span>}
        </div>
      )}
      
      <div className="flex gap-2">
        {/* Número Principal */}
        <div
          className={`traditional-ticket ${sizeClasses[size]} rounded-lg border-2 flex flex-col items-center justify-center shadow-md transition-transform hover:scale-105`}
          style={{ 
            borderColor: borderColor,
            background: `linear-gradient(145deg, ${color}15, ${color}08)`,
          }}
        >
          <div 
            className={`${numberSizeClasses[size]} tracking-wider`}
            style={{ color: color }}
          >
            {formatLotteryNumber(number)}
          </div>
          {showLabels && (
            <div className="text-xs text-gray-500 mt-1">
              Décimo
            </div>
          )}
        </div>

        {/* Serie */}
        {series && (
          <div
            className={`traditional-ticket ${sizeClasses[size]} rounded-lg border-2 flex flex-col items-center justify-center shadow-md transition-transform hover:scale-105`}
            style={{ 
              borderColor: borderColor,
              background: `linear-gradient(145deg, ${color}15, ${color}08)`,
            }}
          >
            <div 
              className={`${seriesSizeClasses[size]} tracking-wider`}
              style={{ color: color }}
            >
              {series.toString().padStart(3, '0')}
            </div>
            {showLabels && (
              <div className="text-xs text-gray-500 mt-1">
                Serie
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}