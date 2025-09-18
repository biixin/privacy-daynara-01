import React, { useState, useEffect } from 'react';
import { Play, Heart, Eye } from 'lucide-react';
import ContentToggle from './ContentToggle';
import LazyImage from './LazyImage';
import VideoPlayer from './VideoPlayer';
import ImageViewer from './ImageViewer';
import { photosData, videosData } from '../data/content';

interface MuralProps {
  onImageClick?: (image: any) => void;
}

const Mural: React.FC<MuralProps> = ({ onImageClick }) => {
  const [contentType, setContentType] = useState<'photos' | 'videos'>('photos');
  const [content, setContent] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    loadContent();
  }, [contentType]);

  const loadContent = () => {
    if (contentType === 'photos') {
      setContent(photosData);
    } else {
      setContent(videosData);
    }
  };

  const handleVideoClick = (video: any) => {
    if (contentType === 'videos') {
      setSelectedVideo(video);
    } else {
      if (onImageClick) {
        onImageClick(video);
      } else {
        setSelectedImage(video);
      }
    }
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <div className="min-h-screen p-4 pt-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Conteúdo Exclusivo
        </h1>
        
        <ContentToggle
          activeType={contentType}
          onTypeChange={setContentType}
        />
        
        <div className="grid grid-cols-1 gap-3 mt-6">
          {content.map((item) => (
            <div
              key={item.id}
              className="relative bg-black/20 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-pink-400/50 transition-all duration-300 cursor-pointer"
              onClick={() => handleVideoClick(item)}
            >
              <div className="relative aspect-[3/4]">
                {contentType === 'videos' ? (
                  <div className="relative w-full h-full">
                    <LazyImage
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" fill="white" />
                    </div>
                    <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                      {item.duration && item.duration.trim() !== '' && item.duration}
                    </div>
                  </div>
                ) : (
                  <LazyImage
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                  <div className="flex items-center space-x-3 text-xs text-gray-300">
                    {item.views && item.views.trim() !== '' && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views}</span>
                      </div>
                    )}
                    {item.likes && item.likes.trim() !== '' && (
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-20" />
      </div>

      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
          onClose={closeVideoPlayer}
        />
      )}

      {selectedImage && (
        <ImageViewer
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
};

export default Mural;