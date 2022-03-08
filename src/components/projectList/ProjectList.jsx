import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GenreData from './GenreData';
import NormalList from './NormalList';
import RawList from './RawList';

const ProjectList = ({ projects, searchQuery, setDisplaySearch, includeArtists, setDisplayCheckbox }) => {
  const [ displayGenres, setDisplayGenres ] = useState(false);
  const [ listFormat, setListFormat ] = useState('normal');
  const [ sortBy, setSortBy ] = useState('artist');
  const [ quantity, setQuantity ] = useState(projects.length);
  const [ noSearchResults, setNoSearchResults ] = useState(false);

  const rawDataClick = () => {
    setDisplaySearch(listFormat === 'raw');
    setDisplayCheckbox(listFormat === 'raw');
    setListFormat(listFormat === 'normal' ? 'raw' : 'normal');
  };

  // displays # of projects upon initial render,
  // & prevents overriding of # of projects when query changes
  useEffect(() => !searchQuery && setQuantity(projects.length), [ searchQuery, projects ]);

  // ensures no-results message disappears after deleting text in search bar
  useEffect(() => !searchQuery && setNoSearchResults(false), [ searchQuery ]);

  const normalListProps = {
    projects,
    sortBy,
    searchQuery,
    setQuantity,
    noSearchResults,
    setNoSearchResults,
    includeArtists
  };
  return (<>
    <Options>
      {noSearchResults ? (
        <div style={{ margin: '20px 90px', color: 'red' }}>No projects found!</div>
      ) : (<>
        {quantity !== 0 && listFormat === 'normal' && (
          <TextWrapper># of projects: {quantity}</TextWrapper>
        )}
      </>)}
      {!searchQuery && (<>
        {listFormat === 'normal' && (
          <Button onClick={() => setDisplayGenres(!displayGenres)}>
            {displayGenres ? 'Hide' : 'View'} Genre Data
          </Button>
        )}
        <Button onClick={rawDataClick}>
          {listFormat === 'raw' ? 'Back' : 'Raw Data'}
        </Button>
        {listFormat === 'normal' && (<>
          <label htmlFor="sortBy">Sort by: </label>
          <select id="sortBy" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="artist">Artist</option>
            <option value="recency">Recently Added</option>
          </select>
        </>)}
      </>)}
    </Options>
    {displayGenres && !searchQuery && <GenreData projects={projects}/>}
    {listFormat === 'normal' && <NormalList {...normalListProps} />}
    {listFormat === 'raw' && <RawList projects={projects} />}
  </>);
};

const Options = styled.div`
  padding: 0 0 0 10px;
`;

const TextWrapper = styled.div`
  display: inline-block;
  margin: 15px 10px;
`;

const Button = styled.button`
  margin: 15px;
`;

export default ProjectList;
