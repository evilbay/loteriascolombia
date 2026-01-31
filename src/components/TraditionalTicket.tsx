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
  const sizeClasses = {
    small: {
      container: 'min-w-[120px] h-12',
      number: 'text-lg font-black',
      series: 'text-sm font-bold',
      label: 'text-xs'
    },
    medium: {
      container: 'min-w-[160px] h-16',
      number: 'text-2xl font-black',
      series: 'text-lg font-bold',
      label: 'text-sm'
    },
    large: {
      container: 'min-w-[200px] h-20',
      number: 'text-3xl font-black',
      series: 'text-xl font-bold',
      label: 'text-base'
    }
  };

  // Formatear número a 4 dígitos
  const formattedNumber = number.toString().padStart(4, '0');
  const formattedSeries = series ? series.toString().padStart(3, '0') : null;

  const currentSize = sizeClasses[size];

  return (
    <div className="flex gap-3 items-center">
      {/* Billete principal - estilo profesional */}
      <div className="relative">
        {showLabels && (
          <div className={`${currentSize.label} text-gray-500 mb-1 font-medium text-center`}>
            NÚMERO
          </div>
        )}
        <div
          className={`${currentSize.container} px-4 rounded-xl border-3 flex items-center justify-center shadow-2xl relative overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-3xl`}
          style={{ 
            borderColor: color,
            background: `linear-gradient(135deg, 
              white 0%, 
              rgba(255,255,255,0.95) 25%, 
              rgba(248,249,250,0.9) 50%, 
              rgba(241,245,249,0.85) 75%, 
              #f8fafc 100%)`,
            boxShadow: `
              0 20px 40px -12px rgba(0,0,0,0.25),
              0 8px 16px -8px ${color}40,
              inset 0 1px 0 rgba(255,255,255,0.6),
              inset 0 -1px 0 rgba(0,0,0,0.1)
            `
          }}
        >
          {/* Patrón decorativo de fondo */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                ${color}20 0px,
                ${color}20 2px,
                transparent 2px,
                transparent 12px
              )`
            }}
          />
          
          {/* Número principal */}
          <span 
            className={`${currentSize.number} relative z-10 tracking-wider`}
            style={{ color: color, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
          >
            {formattedNumber}
          </span>
          
          {/* Borde interno decorativo */}
          <div 
            className="absolute inset-1 rounded-lg border opacity-30 pointer-events-none"
            style={{ borderColor: color }}
          />
        </div>
      </div>

      {/* Serie */}
      {formattedSeries && (
        <div className="relative">
          {showLabels && (
            <div className={`${currentSize.label} text-gray-500 mb-1 font-medium text-center`}>
              SERIE
            </div>
          )}
          <div
            className={`${currentSize.container} px-4 rounded-xl border-3 flex items-center justify-center shadow-2xl relative overflow-hidden transform transition-all duration-200 hover:scale-105 hover:shadow-3xl`}
            style={{ 
              borderColor: color,
              background: `linear-gradient(135deg, 
                white 0%, 
                rgba(255,255,255,0.95) 25%, 
                rgba(248,249,250,0.9) 50%, 
                rgba(241,245,249,0.85) 75%, 
                #f8fafc 100%)`,
              boxShadow: `
                0 20px 40px -12px rgba(0,0,0,0.25),
                0 8px 16px -8px ${color}40,
                inset 0 1px 0 rgba(255,255,255,0.6),
                inset 0 -1px 0 rgba(0,0,0,0.1)
              `
            }}
          >
            {/* Patrón decorativo de fondo */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  ${color}20 0px,
                  ${color}20 2px,
                  transparent 2px,
                  transparent 12px
                )`
              }}
            />
            
            {/* Número de serie */}
            <span 
              className={`${currentSize.series} relative z-10 tracking-wider`}
              style={{ color: color, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            >
              {formattedSeries}
            </span>
            
            {/* Borde interno decorativo */}
            <div 
              className="absolute inset-1 rounded-lg border opacity-30 pointer-events-none"
              style={{ borderColor: color }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
