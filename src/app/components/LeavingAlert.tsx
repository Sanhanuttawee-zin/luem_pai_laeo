import { AlertCircle, Wallet } from 'lucide-react';
import { useI18n } from '../i18n';

interface LeavingAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeavingAlert({ isOpen, onClose }: LeavingAlertProps) {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
        }}
      />

      <div
        className="relative w-full max-w-md rounded-t-3xl p-6 pb-8"
        style={{ backgroundColor: '#ffffff' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-12 h-1 rounded-full mx-auto mb-6"
          style={{ backgroundColor: '#d6d3d1' }}
        />

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: '#fff1f2' }}
        >
          <AlertCircle
            className="w-8 h-8"
            strokeWidth={2}
            style={{ color: '#dc2626' }}
          />
        </div>

        <h2
          className="text-2xl text-center mb-2"
          style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}
        >
          {t('alert.leavingHome')}
        </h2>

        <p className="text-center text-stone-600 mb-6">
          {t('alert.forgotSomething')}
        </p>

        <div
          className="p-4 rounded-2xl flex items-center gap-4 mb-6"
          style={{
            backgroundColor: '#fff1f2',
            border: '1px solid #fecdd3',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#ffffff' }}
          >
            <Wallet className="w-6 h-6 text-stone-700" strokeWidth={2} />
          </div>

          <div className="flex-1">
            <div className="font-semibold text-stone-900 mb-1">Wallet</div>
            <div className="text-sm text-stone-600">
              {t('alert.lastSeen')} &bull; 5 {t('common.minsAgo')}
            </div>
          </div>

          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#dc2626' }}
          />
        </div>

        <div className="space-y-3">
          <button
            className="w-full py-4 rounded-2xl font-semibold transition-transform active:scale-95"
            style={{
              backgroundColor: '#E85D2A',
              color: '#ffffff',
            }}
            onClick={onClose}
          >
            {t('alert.goBack')}
          </button>

          <button
            className="w-full py-4 rounded-2xl font-semibold transition-transform active:scale-95"
            style={{
              backgroundColor: '#faf5ed',
              color: '#78716c',
            }}
            onClick={onClose}
          >
            {t('alert.continueTrip')}
          </button>
        </div>
      </div>
    </div>
  );
}
