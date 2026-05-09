import { Home, CheckCircle, Plane, MapPin } from 'lucide-react';
import { useI18n } from '../i18n';

declare const __BUILD_TIME__: string;

type NavTab = 'home' | 'check' | 'trips' | 'find';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useI18n();

  const tabs: { id: NavTab; icon: React.ElementType; labelKey: string }[] = [
    { id: 'home', icon: Home, labelKey: 'nav.home' },
    { id: 'check', icon: CheckCircle, labelKey: 'nav.check' },
    { id: 'trips', icon: Plane, labelKey: 'nav.trips' },
    { id: 'find', icon: MapPin, labelKey: 'nav.find' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[428px] bg-white/95 backdrop-blur-xl border-t border-stone-200 px-4 pb-4 pt-2 z-50">
      <div className="flex items-center justify-around">
        {tabs.map(({ id, icon: Icon, labelKey }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-full transition-all"
              style={{
                backgroundColor: isActive ? '#E85D2A' : 'transparent',
              }}
            >
              <Icon
                className="w-6 h-6 transition-colors"
                strokeWidth={2}
                style={{ color: isActive ? '#ffffff' : '#78716c' }}
              />
              <span
                className="text-[11px] font-medium transition-colors"
                style={{ color: isActive ? '#ffffff' : '#78716c' }}
              >
                {t(labelKey)}
              </span>
            </button>
          );
        })}
      </div>
      <div className="text-center text-[9px] text-stone-400 mt-1">
        Deployed: {new Date(__BUILD_TIME__).toLocaleString()}
      </div>
    </div>
  );
}
