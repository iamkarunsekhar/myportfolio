'use client';

import { useState, useEffect } from 'react';
import PhotoGrid from '@/components/PhotoGrid';
import PhotoModal from '@/components/PhotoModal';
import { Photo } from '@/types/photo';

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Mountain Vista",
    description: "Captured during golden hour in the Rockies. The interplay of light and shadow creates a dramatic landscape."
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    title: "Forest Path",
    description: "A serene walking path through ancient woods, where dappled sunlight filters through the canopy."
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Ocean Waves",
    description: "The rhythmic dance of waves against weathered rocks, captured in the blue hour."
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    title: "Desert Dunes",
    description: "Endless patterns carved by wind in the sand, creating natural abstract art."
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "City Lights",
    description: "Urban nightscape showcasing the vibrant energy of metropolitan life."
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    title: "Autumn Colors",
    description: "Nature's annual masterpiece painted in warm hues of red, gold, and amber."
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    title: "Lake Reflection",
    description: "Perfect mirror reflections on a calm morning, doubling the beauty of the landscape."
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Snow Summit",
    description: "Pristine winter landscape from a mountain peak, where silence speaks volumes."
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    title: "Wildflower Meadow",
    description: "A carpet of colorful wildflowers dancing in the gentle summer breeze."
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    title: "Coastal Cliffs",
    description: "Dramatic coastline where land meets sea in an eternal embrace."
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Starry Night",
    description: "The cosmos revealed in all its glory above a silhouetted landscape."
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    title: "Morning Mist",
    description: "Ethereal fog rolling through valleys, creating a dreamlike atmosphere."
  }
];

export default function GalleryPage() {
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
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      
      {/* Header */}
      <header className="relative z-10 py-5 text-center border-b border-white/10">
        <h1 className="text-4xl md:text-5xl font-light mb-2 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
          Photography
        </h1>
        <p className="text-white/70 text-lg">
          Capturing moments through my lens
        </p>
      </header>

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
    </div>
  );
}
