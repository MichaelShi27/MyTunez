import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { clientId, clientSecret } from '../../auth.js';

const authStr = btoa(`${clientId}:${clientSecret}`);

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  data: qs.stringify({ grant_type: 'client_credentials' }),
  headers: {
    'Authorization': `Basic ${authStr}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

const ArtistImage = ({ name }) => {
  const [ token, setToken ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  // get API access token from Spotify
  useEffect(() => {
    const { url, data, headers } = authOptions;
    axios.post(url, data, { headers })
      .then(({ data: { access_token} }) => setToken(access_token));
  }, []);

  // get artist image URL from Spotify API
  useEffect(() => {
    if (!name || !token) return;

    axios({
      url: `https://api.spotify.com/v1/search`,
      headers: { 'Authorization': `Bearer ${token}` },
      params: {
        q: `${name}`,
        type: 'artist'
      }
    }).then( ({ data: { artists } }) => setImageUrl(artists.items[0].images[2].url) )
      .catch(console.log);
  }, [ name, token ]);

  return !imageUrl ? null : <img alt="artist" src={imageUrl} />;
};

export default ArtistImage;
