'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/photo';

interface PhotoModalProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotoModal({ photos, currentIndex, onClose, onNext, onPrev }: PhotoModalProps) {
  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center opacity-100 visible transition-all duration-400"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden transform scale-100 transition-transform duration-400">
        {/* Photo Counter */}
        <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white/80 z-10">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-500/50 z-10"
        >
          ×
        </button>

        {/* Navigation Buttons */}
        <button
          onClick={onPrev}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-500/50 hover:scale-110 z-10"
        >
          ‹
        </button>

        <button
          onClick={onNext}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-500/50 hover:scale-110 z-10"
        >
          ›
        </button>

        {/* Image */}
        <div className="relative">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.title}
            width={1200}
            height={800}
            className="max-h-[80vh] w-auto object-contain"
            priority
          />
          
          {/* Image Info */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
            <h3 className="text-2xl font-medium mb-2 text-white">{currentPhoto.title}</h3>
            <p className="text-white/80 leading-relaxed">{currentPhoto.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
