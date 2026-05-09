import { ItemCard } from '../components/ItemCard';
import { useState } from 'react';
import { useI18n } from '../i18n';
import {
  Key,
  Smartphone,
  Wallet,
  Headphones,
  Watch,
  CreditCard,
  Plus,
  X,
  Check,
  Bluetooth,
  Trash2,
} from 'lucide-react';

interface Item {
  id: number;
  image: string;
  title: string;
  battery?: number;
  lastSeen: string;
  status: 'found' | 'missing';
  hasBLE: boolean;
  checked: boolean;
  priority?: 'high' | 'normal';
}

export function PreDepartureScreen() {
  const { t } = useI18n();
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1638953471155-7de7d58048b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGtleXMlMjBvbiUyMHRhYmxlfGVufDF8fHx8MTc3NzU2NDcwNnww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'House Keys',
      battery: 12,
      lastSeen: '2 mins ago',
      status: 'found' as const,
      hasBLE: true,
      checked: true,
      priority: 'high',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1697898706680-5e1dcc9b50fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxNCUyMFBybyUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzc3NTY0NzA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'iPhone 14 Pro',
      battery: 87,
      lastSeen: 'Now',
      status: 'found' as const,
      hasBLE: true,
      checked: true,
      priority: 'high',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1601592996763-f05c9c80a7f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwd2FsbGV0fGVufDF8fHx8MTc3NzU2NDcwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Wallet',
      battery: 45,
      lastSeen: '5 mins ago',
      status: 'missing' as const,
      hasBLE: true,
      checked: false,
      priority: 'high',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1574920164507-e651b363da83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBaXJQb2RzJTIwUHJvJTIwZWFyYnVkc3xlbnwxfHx8fDE3Nzc1NjQ3MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'AirPods Pro',
      battery: 92,
      lastSeen: 'Now',
      status: 'found' as const,
      hasBLE: true,
      checked: true,
      priority: 'normal',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1675703342282-94db4ec455e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcHBsZSUyMFdhdGNoJTIwc21hcnR3YXRjaHxlbnwxfHx8fDE3Nzc1NjQ3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Apple Watch',
      battery: 68,
      lastSeen: 'Now',
      status: 'found' as const,
      hasBLE: true,
      checked: true,
      priority: 'normal',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVkaXQlMjBjYXJkJTIwcGF5bWVudHxlbnwxfHx8fDE3Nzc1NjQ3MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Credit Card',
      lastSeen: '12 mins ago',
      status: 'found' as const,
      hasBLE: false,
      checked: true,
      priority: 'normal',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showReadyModal, setShowReadyModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    hasBLE: false,
    priority: 'normal' as 'high' | 'normal',
  });

  const foundCount = items.filter((item) => item.checked).length;
  const totalCount = items.length;
  const progress = (foundCount / totalCount) * 100;

  const handleToggleCheck = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, checked: !item.checked, status: !item.checked ? 'found' : 'missing' }
          : item
      )
    );
  };

  const handlePing = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      alert(`Pinging ${item.title}...`);
    }
  };

  const handleDeleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddItem = async () => {
    if (!newItem.title.trim()) return;

    const imageUrl = await getItemImage(newItem.title);

    const item: Item = {
      id: Date.now(),
      title: newItem.title,
      image: imageUrl,
      hasBLE: newItem.hasBLE,
      priority: newItem.priority,
      status: 'found',
      lastSeen: 'Now',
      battery: newItem.hasBLE ? Math.floor(Math.random() * 100) : undefined,
      checked: false,
    };

    setItems([...items, item]);
    setNewItem({ title: '', hasBLE: false, priority: 'normal' });
    setShowAddModal(false);
  };

  const getItemImage = async (itemName: string): Promise<string> => {
    // Placeholder - in production this would fetch from Unsplash
    const defaultImages: Record<string, string> = {
      passport: 'https://images.unsplash.com/photo-1624024370829-e4e6f3a5f9c1?w=400',
      laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      umbrella: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400',
    };

    const lowerName = itemName.toLowerCase();
    for (const [key, url] of Object.entries(defaultImages)) {
      if (lowerName.includes(key)) return url;
    }

    return 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400';
  };

  const handleReadyToLeave = () => {
    const missingCount = items.filter(item => !item.checked).length;
    if (missingCount > 0) {
      setShowReadyModal(true);
    } else {
      alert('✅ All items packed! Have a safe trip!');
    }
  };

  const confirmReadyToLeave = () => {
    setShowReadyModal(false);
    alert('✅ Ready to leave confirmed! Be careful with missing items.');
  };

  return (
    <div className="flex-1 overflow-y-auto pb-52">
      <div className="px-6 pt-6 pb-4 sticky top-0 z-10" style={{ backgroundColor: '#fdfaf3' }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-stone-900">
            {t('check.title')}
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{ backgroundColor: '#E85D2A' }}
          >
            <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div
            className="text-2xl font-bold tabular-nums"
            style={{ color: '#E85D2A' }}
          >
            {foundCount}/{totalCount}
          </div>
          <div className="text-xs text-stone-500">{Math.round(progress)}%</div>
        </div>

        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #E85D2A, #fb923c)',
            }}
          />
        </div>

        <p
          className="mt-4 text-stone-600 italic"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          {foundCount === totalCount
            ? t('check.allReady')
            : `${t('check.almostThere')} ${totalCount - foundCount} ${totalCount - foundCount > 1 ? t('check.itemsMissing') : t('check.itemMissing')}`}
        </p>
      </div>

      <div className="px-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="relative group">
            <ItemCard
              {...item}
              onToggleCheck={() => handleToggleCheck(item.id)}
              onPing={() => handlePing(item.id)}
            />
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-95 z-10"
              style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
              title="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-full max-w-[428px] px-6 z-20">
        <button
          onClick={handleReadyToLeave}
          className="w-full py-3.5 rounded-2xl font-semibold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          style={{
            backgroundColor: foundCount === totalCount ? '#10b981' : '#E85D2A',
            color: '#ffffff',
          }}
        >
          <Check className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-[15px]">{t('check.readyToLeave')}</span>
        </button>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl p-6"
            style={{ backgroundColor: '#fdfaf3' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl"
                style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}
              >
                {t('check.addNewItem')}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{ backgroundColor: '#faf5ed' }}
              >
                <X className="w-5 h-5 text-stone-600" strokeWidth={2} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t('routine.itemName')}
                </label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  placeholder="e.g., Passport, Laptop, Backpack"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  {t('check.priorityLevel')}
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setNewItem({ ...newItem, priority: 'normal' })}
                    className="flex-1 py-3 rounded-xl font-medium transition-all active:scale-95"
                    style={{
                      backgroundColor: newItem.priority === 'normal' ? '#E85D2A' : '#faf5ed',
                      color: newItem.priority === 'normal' ? '#ffffff' : '#78716c',
                    }}
                  >
                    {t('check.normal')}
                  </button>
                  <button
                    onClick={() => setNewItem({ ...newItem, priority: 'high' })}
                    className="flex-1 py-3 rounded-xl font-medium transition-all active:scale-95"
                    style={{
                      backgroundColor: newItem.priority === 'high' ? '#dc2626' : '#faf5ed',
                      color: newItem.priority === 'high' ? '#ffffff' : '#78716c',
                    }}
                  >
                    {t('check.highPriority')}
                  </button>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setNewItem({ ...newItem, hasBLE: !newItem.hasBLE })}
                  className="w-full flex items-center justify-between p-4 rounded-xl border transition-all active:scale-95"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: newItem.hasBLE ? '#E85D2A' : '#e7e5e4',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Bluetooth className="w-5 h-5 text-stone-600" strokeWidth={2} />
                    <span className="font-medium text-stone-900">{t('check.hasBLE')}</span>
                  </div>
                  <div
                    className="w-6 h-6 rounded-md border-2 flex items-center justify-center"
                    style={{
                      borderColor: newItem.hasBLE ? '#E85D2A' : '#d6d3d1',
                      backgroundColor: newItem.hasBLE ? '#E85D2A' : 'transparent',
                    }}
                  >
                    {newItem.hasBLE && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </div>
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95"
                  style={{
                    backgroundColor: '#faf5ed',
                    color: '#E85D2A',
                  }}
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleAddItem}
                  disabled={!newItem.title.trim()}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50"
                  style={{
                    backgroundColor: '#E85D2A',
                    color: '#ffffff',
                  }}
                >
                  {t('check.addItem')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ready to Leave Confirmation Modal */}
      {showReadyModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowReadyModal(false)}
        >
          <div
            className="w-full max-w-sm mx-6 rounded-3xl p-6"
            style={{ backgroundColor: '#fdfaf3' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-2xl mb-3"
              style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}
            >
              {t('check.warningTitle')}
            </h2>
            <p className="text-stone-600 mb-6">
              {totalCount - foundCount} {t('check.warningMsg')}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReadyModal(false)}
                className="flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95"
                style={{
                  backgroundColor: '#faf5ed',
                  color: '#E85D2A',
                }}
              >
                {t('check.goBack')}
              </button>
              <button
                onClick={confirmReadyToLeave}
                className="flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95"
                style={{
                  backgroundColor: '#E85D2A',
                  color: '#ffffff',
                }}
              >
                {t('check.leaveAnyway')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}