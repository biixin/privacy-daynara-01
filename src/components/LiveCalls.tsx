import React, { useState } from 'react';
import { Video, User, MessageCircle } from 'lucide-react';

interface LiveCallsProps {
  onBookCall: (booking: any) => void;
}

const LiveCalls: React.FC<LiveCallsProps> = ({ onBookCall }) => {
  return (
    <div className="min-h-screen p-4 pt-8">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">
        Chamadinha
      </h1>
      <p className="text-gray-300 text-center mb-8">
        Chamadas de vídeo ao vivo pelo WhatsApp
      </p>
      
      {/* Informações sobre as chamadas */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl border border-pink-400/30 p-6 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src="http://dl.dropboxusercontent.com/s/vf8f7vzua875mc6ttf2g2/normal1.jpg?rlkey=gby73l3b3l3805g2m32rrhrsh&st=kcofka7c&dl=0" 
              alt="Modelo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Chamadas ao Vivo</h3>
            <p className="text-gray-300">Feito via whatsapp sem LINKS!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
          <div className="flex items-center space-x-1">
            <Video className="w-4 h-4" />
            <span>Ao Vivo</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </div>
        </div>
        
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-400 text-sm font-semibold mb-2">Como funciona:</p>
          <p className="text-white text-sm">
            Após o pagamento, você será redirecionado para o WhatsApp onde iremos marcar o horário da chamadinha. 
            A chamada é feita ao vivo por câmera!
          </p>
        </div>
      </div>
      
      {/* Pacotes de Chamada */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Pacotes de Chamada</h3>
        
        {/* Chamada 10 minutos */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-white">Chamada 10 min</h4>
              <p className="text-gray-300 text-sm">Chamada de vídeo ao vivo</p>
            </div>
            <div className="text-right">
              <div className="text-gray-400 line-through text-sm">R$ 39,80</div>
              <div className="text-white font-bold text-2xl">R$ 19,90</div>
            </div>
          </div>
          
          <button
            onClick={() => onBookCall({
              type: 'live-call-10',
              title: 'Chamada de Vídeo 10 minutos',
              description: 'Chamada de vídeo ao vivo pelo WhatsApp por 10 minutos',
              price: 19.90,
              originalPrice: 39.80
            })}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
          >
            Liberar Pacote!
          </button>
        </div>
        
        {/* Chamada até gozar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-yellow-400/50 p-6 animate-pulse-soft shadow-lg shadow-yellow-400/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-white">Chamada até Gozar</h4>
              <p className="text-gray-300 text-sm">Sem limite de tempo</p>
            </div>
            <div className="text-right">
              <div className="text-gray-400 line-through text-sm">R$ 79,80</div>
              <div className="text-white font-bold text-2xl">R$ 39,90</div>
            </div>
          </div>
          
          <button
            onClick={() => onBookCall({
              type: 'live-call-unlimited',
              title: 'Chamada de Vídeo até Gozar',
              description: 'Chamada de vídeo ao vivo pelo WhatsApp sem limite de tempo',
              price: 39.90,
              originalPrice: 79.80
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

export default LiveCalls;
