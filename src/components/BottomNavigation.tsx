import React from 'react';
import { Home, TrendingUp, Video } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'mural' | 'trending' | 'live';
  onTabChange: (tab: 'mural' | 'trending' | 'live') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'mural', label: 'Mural', icon: Home, highlight: false },
    { id: 'trending', label: 'Em Alta', icon: TrendingUp, highlight: true, alwaysHighlight: true },
    { id: 'live', label: 'Chamadinha', icon: Video, highlight: false, useCustomIcon: true },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10">
      <div className="flex justify-center items-center py-2 px-4">
        <div className="flex justify-between items-center w-full max-w-sm">
          {tabs.map(({ id, label, icon: Icon, highlight, alwaysHighlight, useCustomIcon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 min-w-[80px] relative ${
                alwaysHighlight
                  ? activeTab === id
                    ? 'text-yellow-400 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/50 shadow-lg shadow-yellow-400/25'
                    : 'text-yellow-300 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/30 shadow-md shadow-yellow-400/15'
                  : activeTab === id
                    ? 'text-pink-400 bg-pink-400/20'
                    : 'text-gray-400 hover:text-white'
              }`}
            >
              {alwaysHighlight && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
              {useCustomIcon && id === 'live' ? (
                <div className="w-6 h-6 mb-1 rounded-full overflow-hidden">
                  <img 
                    src="http://dl.dropboxusercontent.com/s/vf8f7vzua875mc6ttf2g2/normal1.jpg?rlkey=gby73l3b3l3805g2m32rrhrsh&st=kcofka7c&dl=0" 
                    alt="Modelo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <Icon className={`w-6 h-6 mb-1 ${alwaysHighlight ? 'drop-shadow-lg' : ''}`} />
              )}
              <span className={`text-xs font-medium ${alwaysHighlight ? 'font-bold' : ''}`}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
