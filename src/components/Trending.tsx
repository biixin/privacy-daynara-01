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
    videoUrl: 'https://yasmin-botpro.s3.us-east-2.amazonaws.com/0912(1).mp4',
    thumbnail: 'https://yasmin-privacy.s3.sa-east-1.amazonaws.com/thumb01.png'
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
          onClick={() => onVideoClick(featuredVideo)}
        >
          <img
            src={featuredVideo.thumbnail}
            alt="Prévia exclusiva"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
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
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          🔥 Ofertas Especiais
        </h3>
        
        {/* Pacote Completo */}
        <div className="relative bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl border-2 border-yellow-400/50 p-6">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-4 py-1 rounded-full">
            MAIS POPULAR
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-white">Pacote Completo</h4>
              <p className="text-gray-300 text-sm">100 Vídeos + 100 Fotos</p>
            </div>
            <div className="text-right">
              <div className="text-gray-400 line-through text-sm">R$ 50,00</div>
              <div className="text-yellow-400 font-bold text-2xl">R$ 30,00</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>100 vídeos HD</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>100 fotos exclusivas</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Download ilimitado</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Acesso vitalício</span>
            </div>
          </div>
          
          <button
            onClick={() => onBuyClick({
              type: 'package',
              title: 'Pacote Completo - 100 Vídeos + 100 Fotos',
              description: 'Acesso completo a todo conteúdo exclusivo',
              price: 30.00,
              originalPrice: 50.00,
              discount: 40
            })}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-xl transition-all duration-300 shadow-lg"
          >
            Comprar com PIX - R$ 30,00
          </button>
        </div>
        
        {/* Pacote Sozinha */}
        <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl border border-pink-400/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-white">Pacote Sozinha</h4>
              <p className="text-gray-300 text-sm">50 Vídeos + 50 Fotos</p>
            </div>
            <div className="text-right">
              <div className="text-gray-400 line-through text-sm">R$ 30,00</div>
              <div className="text-pink-400 font-bold text-2xl">R$ 20,00</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              <span>50 vídeos HD</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              <span>50 fotos exclusivas</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              <span>Conteúdo solo</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              <span>Alta qualidade</span>
            </div>
          </div>
          
          <button
            onClick={() => onBuyClick({
              type: 'solo-package',
              title: 'Pacote Sozinha - 50 Vídeos + 50 Fotos',
              description: 'Conteúdo exclusivo solo em alta qualidade',
              price: 20.00,
              originalPrice: 30.00,
              discount: 33
            })}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
          >
            Comprar com PIX - R$ 20,00
          </button>
        </div>
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default Trending;
