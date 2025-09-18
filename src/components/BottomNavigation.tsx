import React from 'react';
import { Home, TrendingUp, Video } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'mural' | 'trending' | 'live';
  onTabChange: (tab: 'mural' | 'trending' | 'live') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'mural', label: 'Mural', icon: Home },
    { id: 'trending', label: 'Em Alta', icon: TrendingUp },
    { id: 'live', label: 'Chamadinha', icon: Video },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
      <div className="flex justify-around items-center py-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 ${
              activeTab === id
                ? 'text-pink-400 bg-pink-400/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;