import React from 'react';
import { Play } from 'lucide-react';

interface TrendingProps {
  onBuyClick: (item: any) => void;
  onVideoClick: (video: any) => void;
}

const Trending: React.FC<TrendingProps> = ({ onBuyClick, onVideoClick }) => {
  const featuredVideo = {
    id: 'featured-video',
    title: 'Prévia Exclusiva',
    videoUrl: 'https://yasmin-privacy.s3.sa-east-1.amazonaws.com/Daynara+Modelo+1/previa.mp4',
    thumbnail: 'https://yasmin-privacy.s3.sa-east-1.amazonaws.com/Daynara+Modelo+1/thumb-previa.png'
  };

  return (
    <div className="min-h-screen p-4 pt-8">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">
        Em Alta
      </h1>
      <p className="text-gray-300 text-center mb-8">
        Ofertas especiais e pacotes exclusivos
      </p>
      
      {/* Prévia Exclusiva */}
      <div className="relative bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl border border-pink-400/30 p-6 mb-6">
        <div className="absolute -top-2 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          PRÉVIA EXCLUSIVA
        </div>
        
        <div 
          className="relative aspect-video rounded-xl overflow-hidden mb-4 cursor-pointer"
        >
          <img
            src={featuredVideo.thumbnail}
            alt="Prévia exclusiva"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
            onClick={() => onVideoClick(featuredVideo)}
          >
            <Play className="w-16 h-16 text-white" fill="white" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">Prévia Exclusiva</h3>
        <p className="text-gray-300 text-sm mb-4">
          Clique para assistir uma prévia do conteúdo exclusivo
        </p>
      </div>
      
      {/* Pacotes Upsell */}
      <div className="space-y-4 mb-6">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Pacotes</h3>
        
        {/* Pacote Transando */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            <img
              src="https://yasmin-privacy.s3.sa-east-1.amazonaws.com/thumb020.png"
              alt="Prévia Pacote Transando"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-white">Pacote Transando</h4>
              <p className="text-gray-300 text-sm">30 Vídeos + Brindes</p>
            </div>
            <div className="text-right">
              <div className="text-gray-400 line-through text-sm">R$ 19,80</div>
              <div className="text-white font-bold text-2xl">R$ 9,90</div>
            </div>
          </div>
          
          <button
            onClick={() => onBuyClick({
              type: 'package',
              title: 'Pacote Transando - 30 Vídeos + Brindes',
              description: 'Conteúdo exclusivo de sexo com brindes especiais',
              price: 9.90,
              originalPrice: 19.80
            })}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
          >
            Liberar Pacote!
          </button>
        </div>
        
        {/* Pacote Anal - Destacado */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-yellow-400/50 p-6 animate-pulse-soft shadow-lg shadow-yellow-400/20">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            <img
              src="https://yasmin-privacy.s3.sa-east-1.amazonaws.com/Daynara+Modelo+1/analthumb1.png"
              alt="Prévia Pacote Anal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-white">Pacote Anal</h4>
              <p className="text-gray-300 text-sm">10 vídeos de anal + Brindes</p>
            </div>
            <div className="text-right">
              <div className="text-gray-400 line-through text-sm">R$ 29,80</div>
              <div className="text-white font-bold text-2xl">R$ 14,90</div>
            </div>
          </div>
          
          <button
            onClick={() => onBuyClick({
              type: 'solo-package',
              title: 'Pacote Anal - 10 vídeos de anal + Brindes',
              description: 'Conteúdo exclusivo anal em alta qualidade com brindes',
              price: 14.90,
              originalPrice: 29.80
            })}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
          >
            Liberar Pacote!
          </button>
        </div>
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default Trending;