'use client';

import Image from 'next/image';
import { Photo } from '@/types/photo';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

export default function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="photo-card group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-400 ease-out bg-white/5 backdrop-blur-sm border border-white/10 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:border-orange-500/30"
          onClick={() => onPhotoClick(index)}
        >
          <Image
            src={photo.src}
            alt={photo.title}
            fill
            className="object-cover transition-transform duration-400 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <h3 className="text-lg font-medium mb-1">{photo.title}</h3>
            <p className="text-sm text-white/70">{photo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
