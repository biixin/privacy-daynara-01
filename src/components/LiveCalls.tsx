import React, { useState } from 'react';
import { Calendar, Clock, Video, User } from 'lucide-react';

interface LiveCallsProps {
  onBookCall: (booking: any) => void;
}

const LiveCalls: React.FC<LiveCallsProps> = ({ onBookCall }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const availableDates = [
    { date: '2025-01-15', label: 'Hoje' },
    { date: '2025-01-16', label: 'Amanhã' },
    { date: '2025-01-17', label: 'Sex, 17 Jan' },
    { date: '2025-01-18', label: 'Sáb, 18 Jan' },
    { date: '2025-01-19', label: 'Dom, 19 Jan' },
  ];

  const timeSlots = [
    { time: '14:00', available: true },
    { time: '15:00', available: true },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
    { time: '18:00', available: true },
    { time: '19:00', available: true },
    { time: '20:00', available: true },
    { time: '21:00', available: true },
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      onBookCall({
        type: 'live-call',
        date: selectedDate,
        time: selectedTime,
        price: 20.00,
        title: 'Chamada de Vídeo Exclusiva',
        description: `Chamada de 10 minutos marcada para ${selectedDate} às ${selectedTime}`
      });
    }
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
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Chamada Privada</h3>
            <p className="text-gray-300">10 minutos de conversa exclusiva</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <div className="flex items-center space-x-1">
            <Video className="w-4 h-4" />
            <span>HD Video</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>10 min</span>
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
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    selectedTime === slot.time
                      ? 'bg-pink-500/20 border-pink-400 text-pink-400'
                      : 'bg-black/20 border-white/10 text-white hover:border-pink-400/50'
                  }`}
                >
                  <div className="font-semibold">{slot.time}</div>
                  <div className="text-sm text-green-400">Disponível</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {selectedDate && selectedTime && (
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Resumo da Reserva</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Data:</span>
                <span className="text-white font-semibold">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Horário:</span>
                <span className="text-white font-semibold">{selectedTime}</span>
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