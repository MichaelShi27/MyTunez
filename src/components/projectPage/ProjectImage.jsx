import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const clientId = '00785d3dc1db4f7993e1bcb6ff6c8d36';
const clientSecret = 'a48ed976c25a403c9094dce87f2741f8';
const authStr = btoa(`${clientId}:${clientSecret}`);

const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  data: qs.stringify({ grant_type: 'client_credentials' }),
  headers: {
    'Authorization': `Basic ${authStr}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

const ProjectImage = ({ project }) => {
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

    let { title, artist } = project;

    axios({
      url: `https://api.spotify.com/v1/search`,
      headers: { 'Authorization': `Bearer ${token}` },
      params: {
        q: `${title} ${artist}`,
        type: 'album'
      }
    }).then( ({ data: { albums } }) => setImageUrl(albums.items[0].images[1].url) )
      .catch(console.log);
  }, [ project, token ]);

  return !imageUrl ? null : <img alt="project cover art" src={imageUrl} />;
};

export default ProjectImage;
