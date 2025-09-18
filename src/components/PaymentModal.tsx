import React, { useState } from 'react';
import { X, Copy, Check, Smartphone, Loader2 } from 'lucide-react';
import { createPix, checkPaymentStatus, PixCreationResponse } from '../utils/pixApi';

interface PaymentModalProps {
  item: any;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'pix' | 'success'>('details');
  const [pixData, setPixData] = useState<PixCreationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  
  const copyPixCode = () => {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePixPayment = async () => {
    setIsLoading(true);
    try {
      const response = await createPix(item.price);
      setPixData(response);
      setPaymentStep('pix');
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      alert('Erro ao gerar PIX. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkPayment = async () => {
    if (!pixData?.id) return;
    
    setIsCheckingPayment(true);
    setPaymentMessage('');
    
    try {
      const response = await checkPaymentStatus(pixData.id);
      
      if (response.status === 'paid') {
        setShowRedirectMessage(true);
      } else {
        setPaymentMessage('Pagamento ainda não foi identificado. Aguarde um momento e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao verificar pagamento:', error);
      setPaymentMessage('Erro ao verificar pagamento. Tente novamente.');
    } finally {
      setIsCheckingPayment(false);
    }
  };

  const handleRedirect = () => {
    let redirectUrl = '';
    
    if (item.type === 'live-call') {
      // Para chamadas, incluir data e hora na mensagem do WhatsApp
      const message = `Olá, acabei de fazer o pagamento da chamada de vídeo para o dia ${item.date} às ${item.time}. Aguardo o contato!`;
      const encodedMessage = encodeURIComponent(message);
      redirectUrl = `https://api.whatsapp.com/send/?phone=5521975023352&text=${encodedMessage}&type=phone_number&app_absent=0`;
    } else {
      // Para outros produtos (pacotes), também redirecionar para WhatsApp
      const message = `Olá, acabei de fazer o pagamento do ${item.title}. Aguardo o acesso ao conteúdo!`;
      const encodedMessage = encodeURIComponent(message);
      redirectUrl = `https://api.whatsapp.com/send/?phone=5521975023352&text=${encodedMessage}&type=phone_number&app_absent=0`;
    }
    
    window.open(redirectUrl, '_blank');
    onClose();
  };

  if (showRedirectMessage) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Pagamento Confirmado!</h2>
            
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Pagamento Realizado com Sucesso!</h3>
              <p className="text-gray-300 mb-4">
                Seu pagamento foi confirmado. Você será redirecionado para receber seu conteúdo.
              </p>
              
              {item.type === 'live-call' && (
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4 mb-4">
                  <p className="text-blue-400 text-sm font-semibold mb-2">Detalhes da sua chamada:</p>
                  <p className="text-white">📅 Data: {item.date}</p>
                  <p className="text-white">🕐 Horário: {item.time}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={handleRedirect}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
            >
              Ir para WhatsApp
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'success') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6 text-center">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Pagamento Confirmado!</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sucesso!</h3>
              <p className="text-gray-300">
                Seu pagamento foi confirmado. Você receberá o conteúdo em breve.
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'pix') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Pagamento PIX</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="bg-white p-4 rounded-2xl mb-4 inline-block">
                {pixData?.qr_code_base64 ? (
                  <img
                    src={pixData.qr_code_base64}
                    alt="QR Code PIX"
                    className="w-48 h-48"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                  </div>
                )}
              </div>
              
              <p className="text-gray-300 text-sm mb-4">
                Escaneie o código QR com seu banco ou copie o código PIX
              </p>
              
              {pixData?.qr_code && (
                <div className="bg-gray-800 p-4 rounded-xl mb-4">
                  <p className="text-xs text-gray-400 mb-2">Código PIX:</p>
                  <p className="text-white text-sm font-mono break-all leading-relaxed">
                    {pixData.qr_code.slice(0, 50)}...
                  </p>
                </div>
              )}
              
              <button
                onClick={copyPixCode}
                disabled={!pixData?.qr_code}
                className="flex items-center justify-center space-x-2 w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200 mb-4"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Código PIX'}</span>
              </button>
              
              <button
                onClick={checkPayment}
                disabled={isCheckingPayment || !pixData?.id}
                className="flex items-center justify-center space-x-2 w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
              >
                {isCheckingPayment ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <span>Verificar Pagamento</span>
                )}
              </button>
              
              {paymentMessage && (
                <div className={`mt-4 p-3 rounded-xl ${
                  paymentMessage.includes('sucesso') 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                    : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                }`}>
                  <p className="text-sm">{paymentMessage}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Item:</span>
                <span className="text-white font-semibold">{item.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Valor:</span>
                <span className="text-pink-400 font-bold text-xl">R$ {item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Finalizar Compra</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          
          <div className="bg-gray-800/50 rounded-2xl p-4 mb-6">
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{item.description}</p>
            
            {item.originalPrice && (
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-500 line-through text-sm">R$ {item.originalPrice.toFixed(2)}</span>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  -{item.discount}%
                </span>
              </div>
            )}
            
            <div className="text-right">
              <span className="text-pink-400 font-bold text-2xl">R$ {item.price.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-white">Método de Pagamento</h3>
            
            <button
              onClick={handlePixPayment}
              disabled={isLoading}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl hover:border-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
                  ) : (
                    <Smartphone className="w-6 h-6 text-green-400" />
                  )}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">PIX</p>
                  <p className="text-sm text-gray-400">
                    {isLoading ? 'Gerando...' : 'Aprovação instantânea'}
                  </p>
                </div>
              </div>
              <div className="text-green-400 font-bold">Recomendado</div>
            </button>
          </div>
          
          <div className="text-center">
            <button
              onClick={handlePixPayment}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold text-xl rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Gerando PIX...</span>
                </div>
              ) : (
                'PAGAR!'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;