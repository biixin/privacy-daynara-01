import React, { useState } from 'react';
import { Calendar, Clock, Video, User } from 'lucide-react';

interface LiveCallsProps {
  onBookCall: (booking: any) => void;
}

const LiveCalls: React.FC<LiveCallsProps> = ({ onBookCall }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState('');
  
  // Função para gerar datas dinâmicas
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      let label = '';
      if (i === 0) {
        label = 'Hoje';
      } else if (i === 1) {
        label = 'Amanhã';
      } else {
        const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        label = `${weekdays[date.getDay()]}, ${day} ${months[date.getMonth()]}`;
      }
      
      dates.push({ date: dateString, label });
    }
    
    return dates;
  };
  
  const availableDates = generateAvailableDates();

  // Função para gerar horários dinâmicos baseados na hora atual
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Primeiro slot: AGORA (próxima hora cheia)
    let nextHour = currentHour;
    if (currentMinute > 0) {
      nextHour = (currentHour + 1) % 24;
    }
    
    slots.push({
      time: `${String(nextHour).padStart(2, '0')}:00`,
      label: 'AGORA',
      available: true
    });
    
    // Próximos 7 horários (1 hora de intervalo cada)
    for (let i = 1; i < 8; i++) {
      const hour = (nextHour + i) % 24;
      slots.push({
        time: `${String(hour).padStart(2, '0')}:00`,
        label: null,
        available: true
      });
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots();

  const handleBooking = () => {
    const finalTime = showCustomTime ? customTime : selectedTime;
    if (selectedDate && finalTime) {
      onBookCall({
        type: 'live-call',
        date: selectedDate,
        time: finalTime,
        price: 20,
        title: 'Chamada de Vídeo Exclusiva',
        description: `Chamada de 10 minutos marcada para ${selectedDate} às ${finalTime}`
      });
    }
  };

  const handleCustomTimeSelect = () => {
    setShowCustomTime(true);
    setSelectedTime('');
  };

  const handleTimeSlotSelect = (time: string) => {
    setShowCustomTime(false);
    setCustomTime('');
    setSelectedTime(time);
  };
  return (
    <div className="min-h-screen p-4 pt-8">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">
        Chamadinha
      </h1>
      <p className="text-gray-300 text-center mb-8">
        Agende uma chamada de vídeo exclusiva
      </p>
      
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl border border-pink-400/30 p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-400">
            <img 
              src="https://yasmin-privacy.s3.sa-east-1.amazonaws.com/m10.webp" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Chamada Privada</h3>
            <p className="text-gray-300">10 minutos pra gozar comigo</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <div className="flex items-center space-x-1">
            <Video className="w-4 h-4" />
            <span>Ao vivo</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Escolha a Data</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {availableDates.map((dateOption) => (
              <button
                key={dateOption.date}
                onClick={() => setSelectedDate(dateOption.date)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedDate === dateOption.date
                    ? 'bg-pink-500/20 border-pink-400 text-pink-400'
                    : 'bg-black/20 border-white/10 text-white hover:border-pink-400/50'
                }`}
              >
                <div className="font-semibold">{dateOption.label}</div>
                <div className="text-sm text-gray-400">{dateOption.date}</div>
              </button>
            ))}
          </div>
        </div>
        
        {selectedDate && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Horários Disponíveis</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                  disabled={!slot.available}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    selectedTime === slot.time
                      ? 'bg-pink-500/20 border-pink-400 text-pink-400'
                      : 'bg-black/20 border-white/10 text-white hover:border-pink-400/50'
                  }`}
                >
                  <div className="font-semibold">
                    {slot.label ? slot.label : slot.time}
                  </div>
                  {slot.label && (
                    <div className="text-xs text-gray-400">{slot.time}</div>
                  )}
                  <div className="text-sm text-green-400">Disponível</div>
                </button>
              ))}
              
              {/* Botão Horário Personalizado */}
              <button
                onClick={handleCustomTimeSelect}
                className={`p-4 rounded-xl border transition-all duration-300 col-span-2 ${
                  showCustomTime
                    ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                    : 'bg-black/20 border-white/10 text-white hover:border-purple-400/50'
                }`}
              >
                <div className="font-semibold">Horário Personalizado</div>
                <div className="text-sm text-purple-400">Escolha seu horário</div>
              </button>
            </div>
            
            {/* Input de horário personalizado */}
            {showCustomTime && (
              <div className="mt-4">
                <label className="block text-white font-semibold mb-2">
                  Digite o horário desejado:
                </label>
                <input
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full p-3 bg-black/30 border border-white/20 rounded-xl text-white focus:border-purple-400 focus:outline-none"
                  min="00:00"
                  max="23:59"
                />
              </div>
            )}
          </div>
        )}
        
        {selectedDate && (selectedTime || (showCustomTime && customTime)) && (
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Resumo da Reserva</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Data:</span>
                <span className="text-white font-semibold">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Horário:</span>
                <span className="text-white font-semibold">{showCustomTime ? customTime : selectedTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Duração:</span>
                <span className="text-white font-semibold">10 minutos</span>
              </div>
            </div>
            
            <button
              onClick={handleBooking}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
            >
              Agendar Chamada
            </button>
          </div>
        )}
      </div>
      
      <div className="h-20" />
    </div>
  );
};

export default LiveCalls;