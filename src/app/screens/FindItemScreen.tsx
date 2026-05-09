import { MapPin, Volume2, Key, Wallet, Watch, Navigation, Radio, Pencil, Trash2, X, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useI18n } from '../i18n';

interface LostItem {
  id: number;
  icon: React.ElementType;
  name: string;
  location: string;
  time: string;
  distance: string;
  x: number;
  y: number;
  recovered?: boolean;
}

export function FindItemScreen() {
  const { t } = useI18n();
  const [pingingItem, setPingingItem] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<LostItem | null>(null);
  const [items, setItems] = useState<LostItem[]>([
    {
      id: 1,
      icon: Key,
      name: 'House Keys',
      location: 'Living room',
      time: '2 mins ago',
      distance: '2m',
      x: 60,
      y: -40,
      recovered: false,
    },
    {
      id: 2,
      icon: Wallet,
      name: 'Wallet',
      location: 'Bedroom',
      time: '5 mins ago',
      distance: '8m',
      x: -45,
      y: 30,
      recovered: false,
    },
    {
      id: 3,
      icon: Watch,
      name: 'Apple Watch',
      location: 'Bathroom',
      time: '1 hour ago',
      distance: '5m',
      x: 25,
      y: 50,
      recovered: false,
    },
  ]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.warn('Location access denied or unavailable');
          setLocationError('Location access denied');
          // Default to Bangkok, Thailand if location not available
          setUserLocation({ lat: 13.7563, lng: 100.5018 });
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      setLocationError('Geolocation not supported');
      setUserLocation({ lat: 13.7563, lng: 100.5018 });
    }
  }, []);

  const handlePing = (id: number) => {
    setPingingItem(id);
    setTimeout(() => setPingingItem(null), 2000);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: LostItem) => {
    setEditingItem({ ...item });
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
      setEditingItem(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleMarkAsFound = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, recovered: true } : item
    ));
  };

  const activeItems = items.filter(item => !item.recovered);
  const recoveredItems = items.filter(item => item.recovered);

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="px-6 pt-6 pb-4">
        <h1
          className="text-3xl mb-2"
          style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}
        >
          {t('find.title')}
        </h1>
        <p className="text-stone-500">
          {t('find.subtitle')}
        </p>
      </div>

      <div className="px-6 mb-6">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            backgroundColor: '#faf5ed',
            border: '1px solid #e7e5e4',
            height: '320px',
          }}
        >
          {/* Grid background */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 400 320"
            fill="none"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 20}
                y1="0"
                x2={i * 20}
                y2="320"
                stroke="#d6d3d1"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 20}
                x2="400"
                y2={i * 20}
                stroke="#d6d3d1"
                strokeWidth="1"
              />
            ))}
          </svg>

          {/* User location (center) */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Accuracy circle */}
            <div
              className="absolute rounded-full"
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#3b82f6',
                opacity: 0.15,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* User marker */}
            <div className="relative z-10">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#3b82f6',
                  border: '3px solid #ffffff',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                }}
              >
                <Navigation
                  className="w-3 h-3 text-white"
                  strokeWidth={2.5}
                  fill="white"
                />
              </div>
            </div>
          </div>

          {/* Item markers */}
          {items.map((item) => {
            const isPinging = pingingItem === item.id;
            return (
              <div
                key={item.id}
                className="absolute transition-all duration-300"
                style={{
                  top: `calc(50% + ${item.y}px)`,
                  left: `calc(50% + ${item.x}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Ping animation */}
                {isPinging && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: '#E85D2A',
                      opacity: 0.4,
                      width: '32px',
                      height: '32px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}

                {/* Item marker */}
                <div
                  className="relative w-5 h-5 rounded-full flex items-center justify-center transition-transform"
                  style={{
                    backgroundColor: '#E85D2A',
                    border: '2px solid #ffffff',
                    boxShadow: '0 2px 8px rgba(232, 93, 42, 0.3)',
                    transform: isPinging ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  <Radio className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>

                {/* Item label */}
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-lg text-[10px] font-medium pointer-events-none"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e7e5e4',
                    opacity: isPinging ? 1 : 0.7,
                  }}
                >
                  {item.name}
                </div>
              </div>
            );
          })}

          {/* Location status */}
          <div
            className="absolute top-4 left-4 px-3 py-2 rounded-xl text-xs font-medium z-10"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#10b981' }}
              />
              <span className="text-stone-700">
                {userLocation ? t('find.locationActive') : t('find.searching')}
              </span>
            </div>
          </div>

          {/* Map legend */}
          <div
            className="absolute bottom-4 left-4 px-3 py-2 rounded-xl text-xs font-medium z-10"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
              <span className="text-stone-500">{t('find.yourLocation')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E85D2A' }} />
              <span className="text-stone-500">{t('find.lostItems')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <h3 className="font-semibold text-stone-900 mb-3">{t('find.recentlyLost')}</h3>

        <div className="space-y-3">
          {activeItems.map((item) => {
            const Icon = item.icon;
            const isPinging = pingingItem === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e7e5e4',
                }}
              >
                {/* Main item info */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#faf5ed' }}
                  >
                    <Icon
                      className="w-7 h-7 text-stone-700"
                      strokeWidth={2}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-900 mb-1">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-stone-500 mb-1">
                      <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                      <span>{item.location}</span>
                    </div>
                    <div className="text-xs text-stone-400">
                      <span>{item.distance} {t('find.away')}</span>
                      <span> &bull; </span>
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Action menu buttons */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
                      style={{
                        backgroundColor: '#faf5ed',
                      }}
                    >
                      <Pencil
                        className="w-4 h-4"
                        style={{ color: '#78716c' }}
                        strokeWidth={2}
                      />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
                      style={{
                        backgroundColor: '#faf5ed',
                      }}
                    >
                      <Trash2
                        className="w-4 h-4"
                        style={{ color: '#78716c' }}
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                </div>

                {/* Action buttons row */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePing(item.id)}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: isPinging ? '#E85D2A' : '#faf5ed',
                      color: isPinging ? '#ffffff' : '#E85D2A',
                    }}
                  >
                    <Volume2
                      className="w-4 h-4"
                      strokeWidth={2}
                    />
                    {isPinging ? (
                      <div className="flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1 h-3 bg-white rounded-full animate-pulse"
                            style={{
                              animationDelay: `${i * 0.15}s`,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      t('find.ping')
                    )}
                  </button>

                  <button
                    onClick={() => handleMarkAsFound(item.id)}
                    className="flex-1 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: '#10b981',
                      color: '#ffffff',
                    }}
                  >
                    <CheckCircle className="w-4 h-4" strokeWidth={2.5} />
                    {t('find.found')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleCancelEdit}
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
                {t('find.editItem')}
              </h2>
              <button
                onClick={handleCancelEdit}
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
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={editingItem.location}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, location: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Distance
                </label>
                <input
                  type="text"
                  value={editingItem.distance}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, distance: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95"
                  style={{
                    backgroundColor: '#faf5ed',
                    color: '#E85D2A',
                  }}
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all active:scale-95"
                  style={{
                    backgroundColor: '#E85D2A',
                    color: '#ffffff',
                  }}
                >
                  {t('find.saveChanges')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recovered Items */}
      {recoveredItems.length > 0 && (
        <div className="px-6 mt-6">
          <h3 className="font-semibold text-stone-900 mb-3">{t('find.recoveredItems')}</h3>

          <div className="space-y-3">
            {recoveredItems.map((item) => {
              const Icon = item.icon;
              const isPinging = pingingItem === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e7e5e4',
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#ecfdf5' }}
                    >
                      <Icon
                        className="w-6 h-6"
                        strokeWidth={2}
                        style={{ color: '#059669' }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-medium text-stone-900">
                          {item.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                          {t('find.recovered')}
                        </span>
                      </div>
                      <div className="text-sm text-stone-500">
                        {item.location} &bull; {item.distance} {t('find.away')}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">
                        {item.time}
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
                        style={{ backgroundColor: '#faf5ed' }}
                      >
                        <Pencil className="w-4 h-4" style={{ color: '#78716c' }} strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95"
                        style={{ backgroundColor: '#faf5ed' }}
                      >
                        <Trash2 className="w-4 h-4" style={{ color: '#78716c' }} strokeWidth={2} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePing(item.id)}
                    className="w-full py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: isPinging ? '#E85D2A' : '#faf5ed',
                      color: isPinging ? '#ffffff' : '#E85D2A',
                    }}
                  >
                    <Volume2 className="w-4 h-4" strokeWidth={2} />
                    {isPinging ? (
                      <div className="flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1 h-3 bg-white rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    ) : (
                      t('find.ping')
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}