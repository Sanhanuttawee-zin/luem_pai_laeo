import { Check, ArrowLeft, Plus, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { RoutineType } from '../App';
import { useI18n } from '../i18n';

interface RoutinesScreenProps {
  routineType: RoutineType;
  onBack?: () => void;
}

interface RoutineItem {
  id: number;
  name: string;
  category: string;
}

const routineData: Record<RoutineType, { title: string; titleKey: string; items: RoutineItem[] }> = {
  university: {
    title: 'University Routine',
    titleKey: 'routine.universityTitle',
    items: [
      { id: 1, name: 'Laptop & Charger', category: 'Electronics' },
      { id: 2, name: 'Notebook & Pens', category: 'Stationery' },
      { id: 3, name: 'Student ID Card', category: 'Documents' },
      { id: 4, name: 'Wallet', category: 'Essentials' },
      { id: 5, name: 'Phone & AirPods', category: 'Electronics' },
      { id: 6, name: 'Water Bottle', category: 'Essentials' },
      { id: 7, name: 'Umbrella', category: 'Weather' },
      { id: 8, name: 'House Keys', category: 'Essentials' },
    ],
  },
  office: {
    title: 'Office Routine',
    titleKey: 'routine.officeTitle',
    items: [
      { id: 1, name: 'Laptop & Charger', category: 'Electronics' },
      { id: 2, name: 'Employee ID Badge', category: 'Documents' },
      { id: 3, name: 'Wallet', category: 'Essentials' },
      { id: 4, name: 'Phone', category: 'Electronics' },
      { id: 5, name: 'Car Keys', category: 'Essentials' },
      { id: 6, name: 'Lunch Bag', category: 'Personal' },
      { id: 7, name: 'Notebook & Pen', category: 'Stationery' },
    ],
  },
  travel: {
    title: 'Travel Routine',
    titleKey: 'routine.travelTitle',
    items: [
      { id: 1, name: 'Passport', category: 'Documents' },
      { id: 2, name: 'Boarding Pass / Tickets', category: 'Documents' },
      { id: 3, name: 'Wallet & Credit Cards', category: 'Essentials' },
      { id: 4, name: 'Phone & Charger', category: 'Electronics' },
      { id: 5, name: 'Luggage', category: 'Bags' },
      { id: 6, name: 'Travel Adapter', category: 'Electronics' },
      { id: 7, name: 'Medications', category: 'Health' },
      { id: 8, name: 'Sunglasses', category: 'Personal' },
      { id: 9, name: 'Neck Pillow', category: 'Comfort' },
    ],
  },
  cafe: {
    title: 'Cafe Run',
    titleKey: 'routine.cafeTitle',
    items: [
      { id: 1, name: 'Wallet', category: 'Essentials' },
      { id: 2, name: 'Phone', category: 'Electronics' },
      { id: 3, name: 'House Keys', category: 'Essentials' },
      { id: 4, name: 'AirPods', category: 'Electronics' },
      { id: 5, name: 'Sunglasses', category: 'Personal' },
    ],
  },
};

export function RoutinesScreen({ routineType, onBack }: RoutinesScreenProps) {
  const { t } = useI18n();
  const routine = routineData[routineType];
  const [items, setItems] = useState<RoutineItem[]>(routine.items);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Essentials');
  const [saved, setSaved] = useState(false);

  const toggleItem = (id: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem: RoutineItem = {
      id: Date.now(),
      name: newItemName.trim(),
      category: newItemCategory,
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemCategory('Essentials');
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    setCheckedItems((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const checkedCount = checkedItems.size;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div className="flex-1 overflow-y-auto pb-52">
      <div className="px-6 pt-6 pb-4">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-stone-600 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            <span className="font-medium">{t('common.back')}</span>
          </button>
        )}
        <div className="flex items-center justify-between">
          <h1
            className="text-3xl mb-2"
            style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}
          >
            {t(routine.titleKey)}
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{ backgroundColor: '#E85D2A' }}
          >
            <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-stone-500">
          {`${checkedCount} ${t('routine.of')} ${totalCount} ${t('routine.itemsReady')}`}
        </p>
      </div>

      <div className="px-6 mb-6">
        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #E85D2A, #fb923c)',
            }}
          />
        </div>
      </div>

      <div className="px-6 space-y-2">
        {items.map((item) => {
          const isChecked = checkedItems.has(item.id);

          return (
            <div
              key={item.id}
              className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e7e5e4',
              }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border-2 transition-all"
                style={{
                  borderColor: isChecked ? '#E85D2A' : '#d6d3d1',
                  backgroundColor: isChecked ? '#E85D2A' : 'transparent',
                }}
              >
                {isChecked && (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </button>

              <div className="flex-1 text-left" onClick={() => toggleItem(item.id)}>
                <div
                  className="font-medium transition-all"
                  style={{
                    color: isChecked ? '#78716c' : '#1c1917',
                    textDecoration: isChecked ? 'line-through' : 'none',
                  }}
                >
                  {item.name}
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  {item.category}
                </div>
              </div>

              <button
                onClick={() => handleDeleteItem(item.id)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-95"
                style={{ backgroundColor: '#faf5ed' }}
              >
                <Trash2 className="w-4 h-4" style={{ color: '#a8a29e' }} strokeWidth={2} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Fixed Save Button */}
      <div className="fixed bottom-[88px] left-1/2 -translate-x-1/2 w-full max-w-[428px] px-6 z-20">
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl font-semibold shadow-lg transition-transform active:scale-95"
          style={{
            backgroundColor: saved ? '#10b981' : '#E85D2A',
            color: '#ffffff',
          }}
        >
          {saved ? t('routine.saved') : t('routine.save')}
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
                {t('routine.addItem')}
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
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g., Power Bank, Textbook"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t('routine.category')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Essentials', 'Electronics', 'Documents', 'Personal', 'Stationery', 'Health'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewItemCategory(cat)}
                      className="px-3 py-2 rounded-xl text-sm font-medium transition-all active:scale-95"
                      style={{
                        backgroundColor: newItemCategory === cat ? '#E85D2A' : '#faf5ed',
                        color: newItemCategory === cat ? '#ffffff' : '#78716c',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95"
                  style={{ backgroundColor: '#faf5ed', color: '#E85D2A' }}
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleAddItem}
                  disabled={!newItemName.trim()}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50"
                  style={{ backgroundColor: '#E85D2A', color: '#ffffff' }}
                >
                  {t('routine.addItem')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
