'use client';

import { useState, useEffect } from 'react';
import PhotoGrid from '@/components/PhotoGrid';
import PhotoModal from '@/components/PhotoModal';
import { Photo } from '@/types/photo';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images')

        if(!response.ok) {
          throw new Error("Failed to fetch images");
        };

        const data = await response.json();
        setPhotos(data.images);
      } catch (err) {
        console.log("err", err);
      };
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">

      {/* Gallery */}
      <div className="relative z-5 py-10 px-5 max-w-7xl mx-auto">
        <PhotoGrid photos={photos} onPhotoClick={openModal} />
      </div>

      {/* Modal */}
      {selectedPhotoIndex !== null && (
        <PhotoModal
          photos={photos}
          currentIndex={selectedPhotoIndex}
          onClose={closeModal}
          onNext={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length)}
          onPrev={() => setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length)}
        />
      )}

      {/* Cursor follower effect */}
      <div 
        className="fixed w-3 h-3 bg-white/30 rounded-full pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
        }}
      />
    </div>
  );
}
