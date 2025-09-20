import React from 'react';
import { Camera, Video } from 'lucide-react';

interface ContentToggleProps {
  activeType: 'photos' | 'videos';
  onTypeChange: (type: 'photos' | 'videos') => void;
}

const ContentToggle: React.FC<ContentToggleProps> = ({ activeType, onTypeChange }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-black/30 backdrop-blur-lg rounded-full p-1 border border-white/20">
        <div className="flex">
          <button
            onClick={() => onTypeChange('videos')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeType === 'videos'
                ? 'bg-pink-500 text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Video className="w-5 h-5" />
            <span>Vídeos</span>
          </button>
          
          <button
            onClick={() => onTypeChange('photos')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeType === 'photos'
                ? 'bg-pink-500 text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span>Fotos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentToggle;