import {
  Backpack,
  Briefcase,
  Coffee,
  Plane,
  AlertCircle,
  Battery,
} from 'lucide-react';
import type { RoutineType } from '../App';
import { useI18n } from '../i18n';

interface HomeScreenProps {
  onRoutineClick?: (routineType: RoutineType) => void;
}

export function HomeScreen({ onRoutineClick }: HomeScreenProps) {
  const { t } = useI18n();

  const routines: { id: number; name: string; nameKey: string; type: RoutineType; icon: typeof Backpack; color: string; iconColor: string }[] = [
    {
      id: 1,
      name: 'University',
      nameKey: 'routine.university',
      type: 'university',
      icon: Backpack,
      color: '#fff1f2',
      iconColor: '#e11d48',
    },
    {
      id: 2,
      name: 'Office',
      nameKey: 'routine.office',
      type: 'office',
      icon: Briefcase,
      color: '#fffbeb',
      iconColor: '#d97706',
    },
    {
      id: 3,
      name: 'Travel',
      nameKey: 'routine.travel',
      type: 'travel',
      icon: Plane,
      color: '#f0f9ff',
      iconColor: '#0284c7',
    },
    {
      id: 4,
      name: 'Cafe Run',
      nameKey: 'routine.cafe',
      type: 'cafe',
      icon: Coffee,
      color: '#ecfdf5',
      iconColor: '#059669',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="px-6 pt-4 pb-6">
        <h1
          className="text-[28px] mb-1"
          style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}
        >
          {t('home.greeting')}
        </h1>
        <p className="text-stone-500">{t('home.noForgotten')}</p>
      </div>

      <div className="px-6 space-y-4">
        <div
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #1c1917 0%, #44403c 100%)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{
              background:
                'radial-gradient(circle, #E85D2A 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-white/60 text-sm mb-1">{t('home.now')}</div>
                <div className="text-white text-3xl font-semibold tabular-nums">
                  5/6
                </div>
                <div className="text-white/80 text-sm">{t('home.itemsDetected')}</div>
              </div>

              <div
                className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
              >
                1 {t('home.missing')}
              </div>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: '83%',
                  background: 'linear-gradient(90deg, #E85D2A, #fb923c)',
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="rounded-3xl p-5 border"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e7e5e4',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-stone-500 mb-1">{t('home.activeTrip')}</div>
              <div className="font-semibold text-stone-900">BKK &rarr; Tokyo</div>
              <div className="text-sm text-stone-500">TG-676, 23:00</div>
            </div>

            <div
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{ backgroundColor: '#E85D2A' }}
            >
              <Plane className="w-5 h-5 text-white" strokeWidth={2} />
              <div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
              >
                7
              </div>
            </div>
          </div>

          <div className="text-xs text-stone-500">
            7 {t('home.alarmsSet')} &bull; {t('home.departsIn')} 8 {t('home.hours')}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-stone-900 mb-3 px-1">
            {t('home.yourRoutines')}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {routines.map((routine) => {
              const Icon = routine.icon;
              return (
                <button
                  key={routine.id}
                  onClick={() => onRoutineClick?.(routine.type)}
                  className="p-5 rounded-2xl text-left transition-transform active:scale-95"
                  style={{ backgroundColor: routine.color }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: `${routine.iconColor}15`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      strokeWidth={2}
                      style={{ color: routine.iconColor }}
                    />
                  </div>
                  <div
                    className="font-medium"
                    style={{ color: routine.iconColor }}
                  >
                    {t(routine.nameKey)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-2xl p-4 border flex items-center gap-3"
          style={{
            backgroundColor: '#fffbeb',
            borderColor: '#fef3c7',
          }}
        >
          <AlertCircle
            className="w-5 h-5 flex-shrink-0"
            strokeWidth={2}
            style={{ color: '#d97706' }}
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-stone-900 mb-0.5">
              {t('home.lowBattery')}
            </div>
            <div className="text-xs text-stone-600">
              {t('home.airtagLow')}
            </div>
          </div>
          <Battery
            className="w-5 h-5 flex-shrink-0"
            strokeWidth={2}
            style={{ color: '#d97706' }}
          />
        </div>
      </div>
    </div>
  );
}
