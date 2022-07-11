import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Loading } from '../styles.js';

const RawList = ({ projects }) => {
  const [ loading, setLoading ] = useState(true);
  useEffect(() => setLoading(false), []);

  const convertToList = projects => {
    const list = [];
    let curArtist;

    for (const { artist, title, genre, releaseYear, dateAdded } of projects) {
      let newTitle = title;
      if (artist !== curArtist) {
        newTitle += ` - ${artist}`;
        curArtist = artist;
      }

      const genreChar = genre === 'rock' ? 'r' :
        genre === 'hip-hop' ? 'h' :
        genre === 'electronic' ? 'e' :
        genre === 'pop' ? 'p' : '';

      newTitle += '***' + genreChar;

      const shortenedDate = dateAdded.slice(0, 10);

      list.push({ artist, genre, releaseYear, dateAdded: shortenedDate, title: newTitle });
    }
    return list;
  };
  const list = convertToList(projects);

  return loading ? <Loading>LOADING...</Loading> : (
    list.map(({ title, genre, releaseYear, dateAdded }, idx) => (
      <div key={idx}>
        <Project $genre={genre}>
          {`${title} --- ${releaseYear} ___ ${dateAdded}`}
        </Project>
      </div>
    ))
  );
};

const Project = styled.span`
  background-color: ${({ $genre }) => (
    $genre === 'rock' ? 'rgb(255, 255, 49)' :
    $genre === 'pop' ? 'rgb(255, 158, 242)' :
    $genre === 'hip-hop' ? 'rgb(71, 250, 86);)' :
    $genre === 'electronic' ? 'aqua' :
    '#ff9700'
  )};
`;

export default RawList;
