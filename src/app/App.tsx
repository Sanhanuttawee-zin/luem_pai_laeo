import { useState } from 'react';
import { StatusBar } from './components/StatusBar';
import { BottomNav } from './components/BottomNav';
import { LeavingAlert } from './components/LeavingAlert';
import { HomeScreen } from './screens/HomeScreen';
import { PreDepartureScreen } from './screens/PreDepartureScreen';
import { TripDetailScreen } from './screens/TripDetailScreen';
import { FindItemScreen } from './screens/FindItemScreen';
import { RoutinesScreen } from './screens/RoutinesScreen';

export type RoutineType = 'university' | 'office' | 'travel' | 'cafe';
type NavTab = 'home' | 'check' | 'trips' | 'find';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [showAlert, setShowAlert] = useState(false);
  const [showRoutines, setShowRoutines] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<RoutineType>('university');

  const handleRoutineClick = (routineType: RoutineType) => {
    setSelectedRoutine(routineType);
    setShowRoutines(true);
  };

  const renderScreen = () => {
    if (showRoutines) {
      return <RoutinesScreen routineType={selectedRoutine} onBack={() => setShowRoutines(false)} />;
    }
    
    switch (activeTab) {
      case 'home':
        return <HomeScreen onRoutineClick={handleRoutineClick} />;
      case 'check':
        return <PreDepartureScreen />;
      case 'trips':
        return <TripDetailScreen />;
      case 'find':
        return <FindItemScreen />;
      default:
        return <HomeScreen onRoutineClick={handleRoutineClick} />;
    }
  };

  return (
    <div
      className="relative flex flex-col mx-auto overflow-hidden w-full max-w-[428px] h-screen"
      style={{
        backgroundColor: '#fdfaf3',
      }}
    >
      <StatusBar />

      {renderScreen()}

      <BottomNav activeTab={activeTab} onTabChange={(tab) => { setShowRoutines(false); setActiveTab(tab); }} />

      <LeavingAlert isOpen={showAlert} onClose={() => setShowAlert(false)} />

      <button
        onClick={() => setShowAlert(true)}
        className="fixed bottom-28 right-4 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
        style={{
          backgroundColor: '#E85D2A',
          color: '#ffffff',
        }}
        title="Demo Alert"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
    </div>
  );
}