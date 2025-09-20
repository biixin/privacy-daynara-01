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
  
  // Vídeo de demonstração baseado no tipo do item
  const getPreviewVideo = () => {
    if (item.type === 'package') {
      return 'https://yasmin-botpro.s3.us-east-2.amazonaws.com/0912(1).mp4';
    } else if (item.type === 'solo-package') {
      return 'https://yasmin-privacy.s3.sa-east-1.amazonaws.com/Daynara+Modelo+1/an4l1.mp4';
    }
    return null;
  };
  
  // Thumbnail específica para cada pacote
  const getPreviewThumbnail = () => {
    if (item.type === 'package') {
      return 'https://yasmin-privacy.s3.sa-east-1.amazonaws.com/thumb020.png';
    } else if (item.type === 'solo-package') {
      return 'https://yasmin-privacy.s3.sa-east-1.amazonaws.com/Daynara+Modelo+1/analthumb1.png';
    }
    return 'https://yasmin-privacy.s3.sa-east-1.amazonaws.com/thumb26.png'; // fallback
  };
  
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
    let message = '';
    
    if (item.type === 'live-call-10') {
      message = `Olá! Acabei de fazer o pagamento da *Chamada de Vídeo 10 minutos* no valor de R$ ${item.price.toFixed(2)}. Aguardo o contato para marcarmos o horário! 📞💕`;
    } else if (item.type === 'live-call-unlimited') {
      message = `Olá! Acabei de fazer o pagamento da *Chamada de Vídeo até Gozar* no valor de R$ ${item.price.toFixed(2)}. Aguardo o contato para marcarmos o horário! 🔥💕`;
    } else if (item.type === 'package') {
      message = `Olá! Acabei de fazer o pagamento do *Pacote Transando - 30 Vídeos + Brindes* no valor de R$ ${item.price.toFixed(2)}. Aguardo receber meu conteúdo! 🔥💕`;
    } else if (item.type === 'solo-package') {
      message = `Olá! Acabei de fazer o pagamento do *Pacote Anal - 10 vídeos de anal + Brindes* no valor de R$ ${item.price.toFixed(2)}. Aguardo receber meu conteúdo! 🍑💕`;
    } else {
      message = `Olá! Acabei de fazer o pagamento do pacote "${item.title}" no valor de R$ ${item.price.toFixed(2)}. Aguardo receber meu conteúdo! 💕`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const redirectUrl = `https://api.whatsapp.com/send/?phone=5521975023352&text=${encodedMessage}&type=phone_number&app_absent=0`;
    
    window.open(redirectUrl, '_blank');
    onClose();
  };

  if (showRedirectMessage) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
              <h3 className="text-xl font-bold text-white mb-4">Pagamento Realizado com Sucesso!</h3>
              <p className="text-gray-300 mb-4">
                Seu pagamento foi confirmado. Você será redirecionado para receber seu conteúdo.
              </p>
            </div>
            
            <button
              onClick={handleRedirect}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg mb-3"
            >
              Ir para WhatsApp
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStep === 'success') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
              <p className="text-gray-300 text-sm mb-4">
                Copie o código PIX abaixo para fazer o pagamento
              </p>
              
              {pixData?.qr_code && (
                <div className="bg-gray-800 p-4 rounded-xl mb-4">
                  <p className="text-xs text-gray-400 mb-2">Código PIX:</p>
                  <p className="text-white text-sm font-mono break-all leading-relaxed">
                    {pixData.qr_code.slice(0, 80)}...
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
                <span className="text-gray-400">Pacote:</span>
                <span className="text-white font-semibold">{item.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Preço:</span>
                <span className="text-pink-400 font-bold text-xl">R$ {item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
            
            {/* Vídeo de prévia */}
            {getPreviewVideo() && (
              <div className="mb-4">
                <p className="text-white text-sm font-semibold mb-2">Prévia do conteúdo:</p>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <video
                    src={getPreviewVideo()}
                    controls
                    className="w-full h-full object-cover"
                    poster={getPreviewThumbnail()}
                  />
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Preço:</span>
              <div className="text-right">
                {item.originalPrice && (
                  <div className="text-gray-500 line-through text-sm mb-1">
                    De: R$ {item.originalPrice.toFixed(2)}
                  </div>
                )}
                <div className="text-pink-400 font-bold text-xl">
                  R$ {item.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handlePixPayment}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold text-xl rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Gerando PIX...</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-6 h-6" />
                  <span>PAGAR COM PIX</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;