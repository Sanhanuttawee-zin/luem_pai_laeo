import { Battery, Signal, Wifi } from 'lucide-react';
import { useI18n } from '../i18n';

export function StatusBar() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-2">
      <div className="text-[15px] font-semibold tracking-tight">9:41</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
          className="px-2 py-0.5 rounded-md text-[11px] font-bold transition-all active:scale-95"
          style={{
            backgroundColor: '#E85D2A',
            color: '#ffffff',
          }}
        >
          {lang === 'en' ? 'TH' : 'EN'}
        </button>
        <Signal className="w-4 h-4" strokeWidth={2.5} />
        <Wifi className="w-4 h-4" strokeWidth={2.5} />
        <Battery className="w-5 h-4" strokeWidth={2.5} />
      </div>
    </div>
  );
}
