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
  showLabels = true
}: TraditionalTicketProps) {
  // Sistema de tamaños responsive simplificado
  const sizeConfig = {
    small: {
      number: 'text-lg sm:text-xl',
      series: 'text-base sm:text-lg',
      padding: 'px-3 py-2',
      label: 'text-[10px]',
      gap: 'gap-2'
    },
    medium: {
      number: 'text-xl sm:text-2xl md:text-3xl',
      series: 'text-lg sm:text-xl md:text-2xl',
      padding: 'px-4 py-3',
      label: 'text-[10px] sm:text-xs',
      gap: 'gap-2 sm:gap-3'
    },
    large: {
      number: 'text-2xl sm:text-3xl md:text-4xl',
      series: 'text-xl sm:text-2xl md:text-3xl',
      padding: 'px-5 py-4',
      label: 'text-xs sm:text-sm',
      gap: 'gap-3 sm:gap-4'
    }
  };

  const config = sizeConfig[size];
  
  // Formatear número a 4 dígitos y serie a 3
  const formattedNumber = number.toString().padStart(4, '0');
  const formattedSeries = series ? series.toString().padStart(3, '0') : null;

  return (
    <div className={`flex flex-row items-stretch justify-center ${config.gap} w-full`}>
      {/* Badge del Número Principal */}
      <div 
        className={`
          flex-1 max-w-[140px] sm:max-w-[160px]
          flex flex-col items-center justify-center
          ${config.padding}
          rounded-xl
          border-2
          bg-gradient-to-br from-white via-gray-50 to-gray-100
          shadow-lg
          transition-shadow duration-200
        `}
        style={{ 
          borderColor: color,
          boxShadow: `0 4px 12px -2px ${color}30, 0 2px 4px -1px rgba(0,0,0,0.1)`
        }}
      >
        <span 
          className={`${config.number} font-black tracking-wider leading-none`}
          style={{ color }}
        >
          {formattedNumber}
        </span>
        {showLabels && (
          <span className={`${config.label} text-gray-500 font-semibold mt-1 uppercase tracking-widest`}>
            Número
          </span>
        )}
      </div>

      {/* Badge de la Serie */}
      {formattedSeries && (
        <div 
          className={`
            flex-1 max-w-[100px] sm:max-w-[120px]
            flex flex-col items-center justify-center
            ${config.padding}
            rounded-xl
            border-2
            bg-gradient-to-br from-white via-gray-50 to-gray-100
            shadow-lg
            transition-shadow duration-200
          `}
          style={{ 
            borderColor: color,
            boxShadow: `0 4px 12px -2px ${color}30, 0 2px 4px -1px rgba(0,0,0,0.1)`
          }}
        >
          <span 
            className={`${config.series} font-black tracking-wider leading-none`}
            style={{ color }}
          >
            {formattedSeries}
          </span>
          {showLabels && (
            <span className={`${config.label} text-gray-500 font-semibold mt-1 uppercase tracking-widest`}>
              Serie
            </span>
          )}
        </div>
      )}
    </div>
  );
}
