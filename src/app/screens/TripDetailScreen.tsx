import { StepCard } from '../components/StepCard';
import { Calendar, Clock, Package, Bell } from 'lucide-react';
import { useI18n } from '../i18n';

export function TripDetailScreen() {
  const { t } = useI18n();
  const steps = [
    {
      time: '17:30',
      emoji: '📖',
      title: t('trip.checkPassport'),
      description: t('trip.checkPassportDesc'),
      color: '#fffbeb',
      isCompleted: true,
    },
    {
      time: '18:30',
      emoji: '🚕',
      title: t('trip.leaveHome'),
      description: t('trip.leaveHomeDesc'),
      color: '#fefce8',
      isCompleted: true,
    },
    {
      time: '19:45',
      emoji: '🧳',
      title: t('trip.checkIn'),
      description: t('trip.checkInDesc'),
      color: '#f0f9ff',
      isCompleted: false,
    },
    {
      time: '20:30',
      emoji: '🛂',
      title: t('trip.immigration'),
      description: t('trip.immigrationDesc'),
      color: '#eef2ff',
      isCompleted: false,
    },
    {
      time: '21:00',
      emoji: '🛍️',
      title: t('trip.dutyFree'),
      description: t('trip.dutyFreeDesc'),
      color: '#ecfdf5',
      isCompleted: false,
    },
    {
      time: '22:00',
      emoji: '🚶',
      title: t('trip.walkToGate'),
      description: t('trip.walkToGateDesc'),
      color: '#ffedd5',
      isCompleted: false,
    },
    {
      time: '22:30',
      emoji: '🎫',
      title: t('trip.boarding'),
      description: t('trip.boardingDesc'),
      color: '#fff1f2',
      isCompleted: false,
    },
  ];

  const stats = [
    { icon: Clock, label: t('trip.travelTime'), value: '5h 30m' },
    { icon: Package, label: t('trip.itemsPacked'), value: '5/6' },
    { icon: Bell, label: t('trip.alarms'), value: '7 set' },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="px-6 pt-6 pb-4">
        <div className="text-sm text-stone-500 mb-2">{t('trip.flight')} TG-676</div>
        <h1
          className="text-3xl mb-2"
          style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}
        >
          Bangkok → Tokyo
        </h1>
        <div className="text-stone-600">{t('trip.departs')} 23:00 • {t('trip.arrives')} 06:30+1</div>
      </div>

      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-2xl text-center"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e7e5e4',
                }}
              >
                <Icon
                  className="w-5 h-5 mx-auto mb-2"
                  strokeWidth={2}
                  style={{ color: '#E85D2A' }}
                />
                <div className="text-xs text-stone-500 mb-1">{stat.label}</div>
                <div className="text-sm font-semibold text-stone-900">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-16">
        <h3 className="font-semibold text-stone-900 mb-3">
          {t('trip.timeline')}
        </h3>

        <div className="space-y-3 relative mb-6">
          <div
            className="absolute left-6 top-8 bottom-8 w-0.5 bg-stone-200"
            style={{ zIndex: 0 }}
          />

          {steps.map((step, index) => (
            <div key={index} className="relative" style={{ zIndex: 1 }}>
              <StepCard {...step} />
            </div>
          ))}
        </div>

        <div
          className="p-4 rounded-2xl border flex items-center gap-3"
          style={{
            backgroundColor: '#ecfdf5',
            borderColor: '#a7f3d0',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#059669' }}
          >
            <Calendar className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-stone-900 mb-0.5">
              {t('trip.synced')}
            </div>
            <div className="text-xs text-stone-600">
              {t('trip.syncedDesc')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
