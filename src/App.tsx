import React, { useState } from 'react';
import BottomNavigation from './components/BottomNavigation';
import Mural from './components/Mural';
import Trending from './components/Trending';
import LiveCalls from './components/LiveCalls';
import PaymentModal from './components/PaymentModal';
import VideoPlayer from './components/VideoPlayer';
import ImageViewer from './components/ImageViewer';

function App() {
  const [activeTab, setActiveTab] = useState<'mural' | 'trending' | 'live'>('mural');
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    item: any;
  }>({
    isOpen: false,
    item: null
  });
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const openPaymentModal = (item: any) => {
    setPaymentModal({
      isOpen: true,
      item
    });
  };

  const closePaymentModal = () => {
    setPaymentModal({
      isOpen: false,
      item: null
    });
  };

  const openVideoPlayer = (video: any) => {
    setSelectedVideo(video);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const openImageViewer = (image: any) => {
    setSelectedImage(image);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'mural':
        return <Mural onImageClick={openImageViewer} />;
      case 'trending':
        return <Trending onBuyClick={openPaymentModal} onVideoClick={openVideoPlayer} />;
      case 'live':
        return <LiveCalls onBookCall={openPaymentModal} />;
      default:
        return <Mural onImageClick={openImageViewer} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900">
      <div className="pb-20">
        {renderActiveTab()}
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {paymentModal.isOpen && (
        <PaymentModal
          item={paymentModal.item}
          onClose={closePaymentModal}
        />
      )}
      
      {selectedImage && (
        <ImageViewer
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          onClose={closeImageViewer}
        />
      )}
      
      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
          onClose={closeVideoPlayer}
        />
      )}
    </div>
  );
}

export default App;