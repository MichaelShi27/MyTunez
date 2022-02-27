import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GenreData from './GenreData';
import NormalList from './NormalList';
import RawList from './RawList';

const ProjectList = ({ projects, searchQuery, setDisplaySearch }) => {
  const [ displayGenres, setDisplayGenres ] = useState(false);
  const [ listFormat, setListFormat ] = useState('normal');
  const [ sortBy, setSortBy ] = useState('artist');
  const [ displayAllProjects, setDisplayAllProjects ] = useState(false);
  const [ quantity, setQuantity ] = useState(projects.length);
  const [ noSearchResults, setNoSearchResults ] = useState(false);

  const handleRawDataClick = () => {
    setDisplaySearch(listFormat !== 'normal');
    setListFormat(listFormat === 'normal' ? 'raw' : 'normal');
  };

  // displays # of projects upon initial render
  useEffect(() => !searchQuery && setQuantity(projects.length), [ searchQuery, projects ]);

  const normalListProps = {
    projects,
    sortBy,
    searchQuery,
    setQuantity,
    noSearchResults,
    setNoSearchResults
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
        {listFormat === 'normal' && (<>
          <Button onClick={() => setDisplayAllProjects(!displayAllProjects)}>
            {displayAllProjects ? 'Hide' : 'View'} All Projects
          </Button>
          <Button onClick={() => setDisplayGenres(!displayGenres)}>
            {displayGenres ? 'Hide' : 'View'} Genre Data
          </Button>
        </>)}
        {displayAllProjects && (<>
          <Button onClick={handleRawDataClick}>
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
      </>)}
    </Options>
    {displayGenres && !searchQuery && <GenreData projects={projects}/>}
    {(displayAllProjects || searchQuery) && (<>
      {listFormat === 'normal' && <NormalList {...normalListProps} />}
      {listFormat === 'raw' && <RawList projects={projects} />}
    </>)}
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
