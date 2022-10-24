import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import GenreData from './dataCharts/GenreData';
import DecadeData from './dataCharts/DecadeData';
import YearData from './dataCharts/YearData';
import NormalList from './NormalList';
import RawList from './RawList';
import Message from '../Message';

const ProjectList = ({
  filteredProjects: projects, searchQuery, setDisplaySearch,
  includeArtists, setDisplayCheckbox, setFilters, filters
}) => {
  const [ displayGenreChart, setDisplayGenreChart ] = useState(false);
  const [ displayDecadeChart, setDisplayDecadeChart ] = useState(false);
  const [ displayYearChart, setDisplayYearChart ] = useState(false);
  const [ listFormat, setListFormat ] = useState('normal');
  const [ sortBy, setSortBy ] = useState('artist');
  const [ quantity, setQuantity ] = useState(projects.length);
  const [ noSearchResults, setNoSearchResults ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ message, setMessage] = useState('');

  // displays # of projects upon initial render,
  // & prevents overriding of # of projects when query changes
  useEffect(() => !searchQuery && setQuantity(projects.length), [ searchQuery, projects ]);

  useEffect(() => {
    if (searchQuery) {
      setDisplayGenreChart(false);
      setDisplayDecadeChart(false);
      setDisplayYearChart(false);
    } else
      setNoSearchResults(false) // clear no-results message after clearing search bar
  }, [ searchQuery ]);

  useEffect(() => {
    setDisplayMessage(true);
    const timeout = setTimeout(() => setDisplayMessage(false), 5000);
    return () => clearTimeout(timeout);
  }, [ message ]);

  const rawListClick = () => {
    setFilters({ genre: '', decade: '', year: '' });
    setDisplaySearch(listFormat === 'raw');
    setDisplayCheckbox(listFormat === 'raw');
    setListFormat(listFormat === 'normal' ? 'raw' : 'normal');

    setMessage('');
    setDisplayGenreChart(false);
    setDisplayDecadeChart(false);
    setDisplayYearChart(false);
  };

  const chartButtonClick = (chart, setState, state, filters) => {
    setState(!state);
    if (filters[chart]) { // clicked a 'Clear ___ Filter' button
      setFilters({ ...filters, [chart]: '' });
      setMessage(`Cleared ${chart} filter!`);
    } else // just opened/closed a chart
      setMessage(state ? '' : `Click on a ${chart} to view those projects!`);
  };

  const charts = [
    [ 'genre', setDisplayGenreChart, displayGenreChart, GenreData, 'Genre' ],
    [ 'decade', setDisplayDecadeChart, displayDecadeChart, DecadeData, 'Decade' ],
    [ 'year', setDisplayYearChart, displayYearChart, YearData, 'Year' ]
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

  const chartProps = {
    projects,
    filters,
    setFilters,
    setDisplayGenreChart,
    setDisplayDecadeChart,
    setDisplayYearChart,
    setMessage
  };

  return (<>
    <Options>
      {noSearchResults ? (
        <div style={{ margin: '20px 90px', color: 'red' }}>No projects found!</div>
      ) : (
        quantity !== 0 && listFormat === 'normal' && (
          <TextWrapper># of projects: {quantity}</TextWrapper>
        )
      )}
      {!searchQuery && (<>
        <span style={{
          padding: '10px 0',
          backgroundColor: '#e0e0e0',
          margin: '0 30px 0 20px'
        }}>
          {listFormat === 'normal' && (
            charts.map(([ chart, setState, state, , upperChart ]) => (
              <ChartButton
                onClick={() => chartButtonClick(chart, setState, state, filters)}
                key={chart}
                {...{ filters, state, chart }}
              >
                {filters[chart]
                  ? `Clear ${upperChart} Filter`
                  : `${state ? 'Hide' : ''} ${upperChart} Data`}
              </ChartButton>
            ))
          )}
          {!filters.genre && !filters.decade && !filters.year && (
            <Button onClick={rawListClick}>
              {listFormat === 'raw' ? 'Back' : 'Raw List'}
            </Button>
          )}
        </span>
        {listFormat === 'normal' && (<>
          <label htmlFor="sortBy">Sort by: </label>
          <select id="sortBy" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="artist">Artist</option>
            <option value="recency">Recently Added</option>
          </select>
        </>)}
      </>)}
    </Options>
    {displayMessage && (
      <Message
        msg={message}
        style={{ margin: '10px 10px 20px 30px', color: 'rgb(116, 43, 161)' }}
      />
    )}
    {charts.map(([ type, , displayChart, Component ]) => (
      displayChart ? <Component {...chartProps} key={type} /> : null
    ))}
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

const ChartButton = styled(Button)`
  border: ${({ filters, chart, state }) => (
    (filters[chart] || state) && '1px solid blue'
  )};
  background-color: ${({ filters, chart, state }) => (
    (filters[chart] || state) && '#cccccc'
  )};
`;

export default ProjectList;
