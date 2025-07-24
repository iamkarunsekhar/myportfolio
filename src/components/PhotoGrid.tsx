'use client';

import Image from 'next/image';
import { Photo } from '@/types/photo';
import Card from './Card';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

export default function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <Card layout='flex justify-center items-center'>
        <Link href="/" className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </Card>
      {photos.map((photo, index) => (
        <div
          key={photo.key}
          className="photo-card group relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10"
          onClick={() => onPhotoClick(index)}
        >
          <Image
            src={photo.url}
            alt={`Photo from gallery: ${index}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}
