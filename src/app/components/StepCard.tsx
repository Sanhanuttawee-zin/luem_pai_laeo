interface StepCardProps {
  time: string;
  emoji: string;
  title: string;
  description?: string;
  color: string;
  isCompleted?: boolean;
}

export function StepCard({
  time,
  emoji,
  title,
  description,
  color,
  isCompleted = false,
}: StepCardProps) {
  return (
    <div
      className="p-4 rounded-2xl transition-all relative"
      style={{
        backgroundColor: color,
        opacity: isCompleted ? 0.5 : 1,
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0 mt-1">{emoji}</div>

        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-stone-600 mb-1">{time}</div>
          <h4 className="font-semibold text-stone-900 mb-1">{title}</h4>
          {description && (
            <p className="text-sm text-stone-600">{description}</p>
          )}
        </div>
      </div>

      {isCompleted && (
        <div className="absolute top-3 right-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#059669' }}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
