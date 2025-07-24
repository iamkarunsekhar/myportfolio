// app/api/top-track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { spotifyService } from '@/lib/spotify';
import { TimeRange } from '@/types/spotify';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = (searchParams.get('time_range') as TimeRange) || 'medium_term';

    const topTrack = await spotifyService.getTopTrack(timeRange);

    if (!topTrack) {
      return NextResponse.json(
        { error: 'No top track found' },
        { status: 404 }
      );
    }

    // Cache the response for 1 hour
    const response = NextResponse.json({ track: topTrack });
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    return response;
  } catch (error) {
    console.error('Error fetching top track:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top track' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
