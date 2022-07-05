import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Artists from './Artists';
import { convertSpecialChars } from '../../helpers';

const ArtistList = ({ projects, searchQuery }) => {
  const [ artists, setArtists ] = useState([]);
  const [ sortBy, setSortBy ] = useState('name');
  const [ sortedArtists, setSortedArtists ] = useState([]);
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
    artists.push({ name: curArtist, projectCount, firstAdded });
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
    const filtered = artists.filter(({ name }) => convertSpecialChars(name).includes(lowerCaseQuery));
    setSortedArtists(filtered);
    setNoSearchResults(filtered.length === 0);
  }, [ searchQuery, artists ]);

  return (<>
    <Options>
      {noSearchResults ? (
        (artists.length > 0) && <div style={{ margin: '20px 90px', color: 'red' }}>No artists found!</div>
      ) : (
        <TextWrapper style={{ margin: '15px 10px' }}>
          # of artists: {sortedArtists.length}
        </TextWrapper>
      )}
      <div style={{ margin: '0 20px', display: 'inline-block' }}>
        {!searchQuery && (<>
          <label htmlFor="sortBy">Sort by: </label>
          <select id="sortBy" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="artist">Name</option>
            <option value="number"># of Projects</option>
            <option value="recency">Recently Added</option>
          </select>
        </>)}
      </div>
    </Options>
    {!noSearchResults && <Artists sortedArtists={sortedArtists} />}
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

export default ArtistList;
