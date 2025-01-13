import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const CLIENT_ID = 'b79d5992990d40bb84bfe92a02480cc2'; // This should be replaced with user's client ID 
const REDIRECT_URI = window.location.origin;
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
];

export const spotifyApi = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  SCOPES
);

export const fetchSpotifyPlaylists = async () => {
  try {
    const response = await spotifyApi.currentUser.playlists.playlists();
    console.log('Fetched playlists:', response.items);
    return response.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

export const fetchSpotifyTracks = async (playlistId: string) => {
  try {
    const response = await spotifyApi.playlists.getPlaylistItems(playlistId);
    console.log('Fetched tracks:', response.items);
    return response.items.map(item => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(', '),
      uri: item.track.uri
    }));
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};