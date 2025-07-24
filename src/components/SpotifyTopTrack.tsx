"use client"

'use client';

import { useState, useEffect } from 'react';
import { SpotifyTrack, TimeRange } from '@/types/spotify';

interface SpotifyTopTrackProps {
  timeRange?: TimeRange;
  className?: string;
}

interface TopTrackResponse {
  track: SpotifyTrack;
  error?: string;
}

export default function SpotifyTopTrack({ 
  timeRange = 'medium_term', 
  className = '' 
}: SpotifyTopTrackProps) {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTrack = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/top-track?time_range=${timeRange}`);
        const data: TopTrackResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch track');
        }

        setTrack(data.track);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTopTrack();
  }, [timeRange]);

  if (loading) {
    return (
      <div className={`bg-green-500 text-black p-6 rounded-lg ${className}`}>
        <div className="animate-pulse">
          <h3 className="text-xl font-bold mb-2">My Current Favorite Track</h3>
          <div className="h-4 bg-black/20 rounded mb-2"></div>
          <div className="h-3 bg-black/20 rounded mb-4 w-2/3"></div>
          <div className="h-32 bg-black/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-500 text-white p-6 rounded-lg ${className}`}>
        <h3 className="text-xl font-bold mb-2">Error</h3>
        <p>Unable to load track: {error}</p>
      </div>
    );
  }

  if (!track) {
    return (
      <div className={`bg-gray-500 text-white p-6 rounded-lg ${className}`}>
        <h3 className="text-xl font-bold mb-2">No Track Found</h3>
        <p>No listening history available for this time period.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg overflow-hidden">
        <iframe
          src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`${track.name} by ${track.artists[0].name}`}
        />
      </div>

      <div className="mt-3 flex justify-between items-center text-xs opacity-75">
        <span>Popularity: {track.popularity}/100</span>
        <a 
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Open in Spotify
        </a>
      </div>
    </>
  );
};
