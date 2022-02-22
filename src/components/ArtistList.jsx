import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { StyledLink } from './styles.js';

const ArtistList = ({ projects, query }) => {
  const [ artists, setArtists ] = useState([]);
  const [ sortBy, setSortBy ] = useState('name');
  const [ sortedArtists, setSortedArtists ] = useState([]);
  const [ displayAll, setDisplayAll ] = useState(false);

  const getArtists = useCallback(() => {
    const artists = [];
    let curArtist = projects[0].artist;
    let projectCount = 0;
    const now = new Date();
    let firstAdded = now;

    for (const { artist, dateAdded } of projects) {
      if (artist !== curArtist) {
        artists.push({ name: curArtist, projectCount, firstAdded });
        curArtist = artist;
        projectCount = 0;
        firstAdded = now;
      }
      projectCount++;
      const projectDate = new Date(dateAdded);
      if (projectDate < firstAdded)
        firstAdded = projectDate;
    }
    setArtists(artists);
  }, [ projects ]);
  useEffect(() => projects.length && getArtists(), [ projects, getArtists ]);

  useEffect(() => {
    const key = sortBy === 'number' ? 'projectCount' : 'firstAdded';
    const sorted = artists.slice().sort((a, b) => b[key] - a[key]);
    setSortedArtists(sorted);
  }, [ artists, sortBy ]);

  return (<>
    <Options>
      <TextWrapper>Total # of artists: {artists.length}</TextWrapper>
      <Button onClick={() => setDisplayAll(!displayAll)}>{displayAll ? 'Hide' : 'Show'} All</Button>
      <div style={{ margin: '0 20px', display: 'inline-block' }}>
        {displayAll && (<>
          <label htmlFor="sortBy">Sort by: </label>
          <select id="sortBy" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="artist">Name</option>
            <option value="number"># of Projects</option>
            <option value="recency">Recently Added</option>
          </select>
        </>)}
      </div>
    </Options>
    {displayAll && (<>
      <Header>
        <TextWrapper $header={'true'} $type={'name'}>Name</TextWrapper>
        <TextWrapper $header={'true'} $type={'number'}># of Projects</TextWrapper>
      </Header>
      {sortedArtists.map(({ name, projectCount }, idx) => (
        <Artist key={idx}>
          <StyledLink to={`/artists/${name}`}>
            <TextWrapper $type={'name'}>{name}</TextWrapper>
          </StyledLink>
          <TextWrapper $type={'number'}>{projectCount}</TextWrapper>
        </Artist>
      ))}
    </>)}
  </>);
};

const Options = styled.div`
  padding: 0 0 0 10px;
  margin: 10px 0;
`;

const TextWrapper = styled.div`
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ $type }) => $type === 'number' && 'center'};
  width: ${({ $type }) => (
    $type === 'name' ? '350px' :
    $type === 'number' ? '80px' :
    null
  )};
  background-color: ${({ $header }) => $header && '#e0e0e0'};
`;

const Button = styled.button`
  margin-left: 20px;
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
