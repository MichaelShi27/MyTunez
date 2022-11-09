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

const ProjectImage = ({ project, style, onLoad, onClick }) => {
  const [ token, setToken ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  // get API access token from Spotify
  useEffect(() => {
    const { url, data, headers } = authOptions;
    axios.post(url, data, { headers })
      .then(({ data: { access_token} }) => setToken(access_token));
  }, []);

  // get project image URL from Spotify API
  useEffect(() => {
    if (!project.title || !token) return;

    const { title, artist } = project;

    axios({
      url: `https://api.spotify.com/v1/search`,
      headers: { 'Authorization': `Bearer ${token}` },
      params: {
        q: `${title} ${artist}`,
        type: 'album', 
        limit: 5
      }
    }).then(({ data: { albums: { items } } }) => setImageUrl(
      items.length ? items[0].images[1].url : '/images/questionMark.png'
    )).catch(console.log);
  }, [ project, token ]);

  return !imageUrl ? null : (
    <img 
      alt="project cover art" 
      src={imageUrl}
      {...{ style, onLoad, onClick }}
    />
  );
};

export default ProjectImage;
