import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
// import { StyledLink } from './styles.js';
import Artists from './Artists';

const ArtistList = ({ projects, searchQuery }) => {
  const [ artists, setArtists ] = useState([]);
  const [ sortBy, setSortBy ] = useState('name');
  const [ sortedArtists, setSortedArtists ] = useState([]);
  const [ displayAllArtists, setDisplayAllArtists ] = useState(false);
  const [ noSearchResults, setNoSearchResults ] = useState(false);

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

  // extracts artists from 'projects' prop
  useEffect(() => projects.length && getArtists(), [ projects, getArtists ]);

  // sorts list according to 'sortBy' state
  useEffect(() => {
    const key = sortBy === 'number' ? 'projectCount' : 'firstAdded';
    const sorted = artists.slice().sort((a, b) => b[key] - a[key]);
    setSortedArtists(sorted);
  }, [ artists, sortBy ]);

  // filters list based on 'searchQuery' prop
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = artists.filter(({ name }) => name.toLowerCase().includes(lowerCaseQuery));
    setSortedArtists(filtered);
    setNoSearchResults(filtered.length === 0);
  }, [ searchQuery, artists ]);

  return (<>
    <Options>
      {noSearchResults ? (
        <div style={{ margin: '20px 90px', color: 'red' }}>No artists found!</div>
      ) : (
        <TextWrapper style={{ margin: '15px 10px' }}>
          # of artists: {sortedArtists.length}
        </TextWrapper>
      )}
      {!searchQuery && (
        <Button onClick={() => setDisplayAllArtists(!displayAllArtists)}>
          {displayAllArtists ? 'Hide' : 'View'} All Artists
        </Button>
      )}
      <div style={{ margin: '0 20px', display: 'inline-block' }}>
        {displayAllArtists && (<>
          <label htmlFor="sortBy">Sort by: </label>
          <select id="sortBy" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="artist">Name</option>
            <option value="number"># of Projects</option>
            <option value="recency">Recently Added</option>
          </select>
        </>)}
      </div>
    </Options>
    {(displayAllArtists || searchQuery) && !noSearchResults && (
      <Artists sortedArtists={sortedArtists} />
    )}
  </>);
};

const Options = styled.div`
  padding: 0 0 0 10px;
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
  margin: 15px;
`;

export default ArtistList;
