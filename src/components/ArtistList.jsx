import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ArtistList = ({ projects }) => {
  const [ artists, setArtists ] = useState([]);

  const getArtists = () => {
    const artists = [];
    let curArtist = projects[0].artist;
    let count = 0;
    for (const { artist } of projects) {
      if (artist !== curArtist) {
        artists.push({ name: curArtist, count });
        curArtist = artist;
        count = 0;
      }
      count++;
    }
    setArtists(artists);
  };
  useEffect(getArtists, [ projects ]);

  return (<>
    <Header>
      <TextWrapper header={'true'} type={'name'}>Name</TextWrapper>
      <TextWrapper header={'true'} type={'number'}># of Projects</TextWrapper>
    </Header>
    {artists.map(({ name, count }, idx) => (
      <Artist key={idx}>
        <TextWrapper type={'name'}>{name}</TextWrapper>
        <TextWrapper type={'number'}>{count}</TextWrapper>
      </Artist>
    ))}
  </>);
};

const TextWrapper = styled.div`
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ type }) => type === 'number' && 'center'};
  width: ${({ type }) => (
    type === 'name' ? '350px' :
    type === 'number' ? '80px' :
    null
  )};
  background-color: ${({ header }) => header && '#e0e0e0'};
`;

const Artist = styled.div`
  margin: 3px;
  width: 480px;
  padding: 3px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
  border: 1px solid gray;
`;

const Header = styled(Artist)`
  font-family: Palatino, Lucida Console, serif;
  font-size: 13px;
  background-color: #e0e0e0;
  border: none;
  padding: 8px 8px 5px;
  width: 470px;
`;

export default ArtistList;
