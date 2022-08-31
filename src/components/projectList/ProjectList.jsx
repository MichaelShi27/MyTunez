import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GenreData from './dataCharts/GenreData';
import DecadeData from './dataCharts/DecadeData';
import YearData from './dataCharts/YearData';
import NormalList from './NormalList';
import RawList from './RawList';

const ProjectList = ({
  filteredProjects: projects, searchQuery, setDisplaySearch, includeArtists, setDisplayCheckbox, setFilter
}) => {
  const [ displayGenres, setDisplayGenres ] = useState(false);
  const [ displayDecades, setDisplayDecades ] = useState(false);
  const [ displayYears, setDisplayYears ] = useState(false);
  const [ listFormat, setListFormat ] = useState('normal');
  const [ sortBy, setSortBy ] = useState('artist');
  const [ quantity, setQuantity ] = useState(projects.length);
  const [ noSearchResults, setNoSearchResults ] = useState(false);

  // displays # of projects upon initial render,
  // & prevents overriding of # of projects when query changes
  useEffect(() => !searchQuery && setQuantity(projects.length), [ searchQuery, projects ]);

  // ensures no-results message disappears after deleting text in search bar
  useEffect(() => !searchQuery && setNoSearchResults(false), [ searchQuery ]);

  const rawListClick = () => {
    setFilter({});
    setDisplaySearch(listFormat === 'raw');
    setDisplayCheckbox(listFormat === 'raw');
    setListFormat(listFormat === 'normal' ? 'raw' : 'normal');

    setDisplayGenres(false);
    setDisplayDecades(false);
    setDisplayYears(false);
  };

  const charts = [
    [ 'Genre', setDisplayGenres, displayGenres ],
    [ 'Decade', setDisplayDecades, displayDecades ],
    [ 'Year', setDisplayYears, displayYears ]
  ];

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
          charts.map(([ chart,  setState, state ]) => (
            <Button onClick={() => setState(!state)} key={chart} >
              {state ? 'Hide' : 'View'} {chart} Data
            </Button>
          ))
        )}
        <Button onClick={rawListClick}>
          {listFormat === 'raw' ? 'Back' : 'Raw Project List'}
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
    {displayGenres && !searchQuery && <GenreData projects={projects} />}
    {displayDecades && !searchQuery && <DecadeData projects={projects} setFilter={setFilter} />}
    {displayYears && !searchQuery && <YearData projects={projects} />}
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
