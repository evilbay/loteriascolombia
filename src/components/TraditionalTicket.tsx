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
  size = 'medium'
}: TraditionalTicketProps) {
  const sizeClasses = {
    small: 'min-w-[60px] h-10 text-sm',
    medium: 'min-w-[80px] h-14 text-lg', 
    large: 'min-w-[100px] h-16 text-xl',
  };

  // Formatear número a 4 dígitos
  const formattedNumber = number.toString().padStart(4, '0');
  const formattedSeries = series ? series.toString().padStart(3, '0') : null;

  return (
    <div className="flex gap-2 items-center">
      {/* Número principal - estilo billete */}
      <div
        className={`${sizeClasses[size]} px-3 rounded-lg border-2 flex items-center justify-center font-black shadow-md bg-gradient-to-br from-white to-gray-50`}
        style={{ borderColor: color, color: color }}
      >
        {formattedNumber}
      </div>

      {/* Serie */}
      {formattedSeries && (
        <div
          className={`${sizeClasses[size]} px-3 rounded-lg border-2 flex items-center justify-center font-bold shadow-md bg-gradient-to-br from-white to-gray-50`}
          style={{ borderColor: color, color: color }}
        >
          {formattedSeries}
        </div>
      )}
    </div>
  );
}
