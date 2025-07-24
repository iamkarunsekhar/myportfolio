import { SpotifyTokenResponse, SpotifyTopTracksResponse, TimeRange } from '@/types/spotify';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';

class SpotifyService {
  async getAccessToken(): Promise<string> {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data: SpotifyTokenResponse = await response.json();
    return data.access_token;
  }

  async getTopTracks(
    timeRange: TimeRange = 'medium_term',
    limit: number = 1
  ): Promise<SpotifyTopTracksResponse> {
    console.log("ENTERED")
    const accessToken = await this.getAccessToken();

    const response = await fetch(
      `${TOP_TRACKS_ENDPOINT}?time_range=${timeRange}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get top tracks: ${response.statusText}`);
    }

    return await response.json();
  }

  async getTopTrack(timeRange: TimeRange = 'medium_term') {
    const data = await this.getTopTracks(timeRange, 1);
    return data.items[0] || null;
  }
}

export const spotifyService = new SpotifyService();
