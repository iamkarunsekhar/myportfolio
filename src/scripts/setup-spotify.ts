import { Buffer } from 'buffer';

// 🔧 Replace these values with your actual credentials
const clientId = 'e0ae32d02a9a445e83833234c63408b6';
const clientSecret = '455760791cea40cfa387e90d4a25054f';
const redirectUri = 'http://127.0.0.1:3000/callback'; // must match your Spotify app settings
const authCode = 'AQCxgz6a4MQYsBjvGRA-dE8FFs_N-LXd4_GDB3fpQcANxsjay3naAm2CC-Tm-5iT7YhoJeXZsmQPlCdCKF1eHSaH9S-36jw06hUc3674XDimWhNW2TWbGU2piJO5iZBsZ2rtH7ZXTOpSZ07hQULyAKeEVxFcqeBVNMcf1fTAhPxQ7GNwSpTzZkw6ol94G1hFGw'; // Replace with the ?code=... you received

async function exchangeCodeForToken() {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: authCode,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`❌ Error: ${response.status}`, error);
    return;
  }

  const data = await response.json();
  console.log('✅ Access Token:', data.access_token);
  console.log('🛠️ Refresh Token:', data.refresh_token);
  console.log('🕒 Expires in:', data.expires_in, 'seconds');
  console.log('📦 Scopes:', data.scope);
}

exchangeCodeForToken();
