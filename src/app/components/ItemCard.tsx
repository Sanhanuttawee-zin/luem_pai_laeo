import { Battery, CheckCircle, XCircle, Clock, Circle, Radio } from 'lucide-react';

interface ItemCardProps {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  battery?: number;
  lastSeen?: string;
  status: 'found' | 'missing' | 'pending';
  hasBLE?: boolean;
  checked?: boolean;
  onToggleCheck?: () => void;
  onPing?: () => void;
}

export function ItemCard({
  icon,
  image,
  title,
  battery,
  lastSeen,
  status,
  hasBLE,
  checked = false,
  onToggleCheck,
  onPing,
}: ItemCardProps) {
  const isMissing = status === 'missing';

  return (
    <div
      className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl transition-all"
      style={{
        backgroundColor: isMissing ? '#fff1f2' : '#ffffff',
        border: '1px solid',
        borderColor: isMissing ? '#fecdd3' : '#e7e5e4',
      }}
    >
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ backgroundColor: image ? 'transparent' : '#faf5ed' }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          icon
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-stone-900 text-sm sm:text-base truncate">{title}</h4>
          {hasBLE && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: '#ecfdf5', color: '#059669' }}
            >
              BLE
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-500">
          {battery !== undefined && (
            <div className="flex items-center gap-1">
              <Battery className="w-3.5 h-3.5" strokeWidth={2} />
              <span>{battery}%</span>
            </div>
          )}
          {lastSeen && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" strokeWidth={2} />
              <span>{lastSeen}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {hasBLE && onPing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPing();
            }}
            className="p-2 rounded-xl transition-all active:scale-95"
            style={{
              backgroundColor: '#f0fdf4',
              color: '#059669',
            }}
            aria-label="Ping item"
          >
            <Radio className="w-4 h-4" strokeWidth={2} />
          </button>
        )}
        
        <button
          onClick={onToggleCheck}
          className="transition-all active:scale-95"
          aria-label={checked ? 'Uncheck item' : 'Check item'}
        >
          {checked ? (
            <CheckCircle
              className="w-6 h-6"
              strokeWidth={2}
              style={{ color: '#059669' }}
            />
          ) : (
            <Circle
              className="w-6 h-6"
              strokeWidth={2}
              style={{ color: '#d6d3d1' }}
            />
          )}
        </button>
      </div>
    </div>
  );
}