import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SearchBar from '../searchBar/SearchBar';
import SearchResults from './SearchResults';
import Collage from './Collage';
import MostPopularArtists from './MostPopularArtists';
import Message from '../Message';
import GenreData from '../projectList/dataCharts/GenreData';
import DecadeData from '../projectList/dataCharts/DecadeData';
import YearData from '../projectList/dataCharts/YearData';

const Favorites = ({ projects, filteredProjects, filters, setFilters }) => {
  const [ query, setQuery ] = useState('');
  const [ favorites, setFavorites ] = useState([]);
  const [ displayGenreChart, setDisplayGenreChart ] = useState(false);
  const [ displayDecadeChart, setDisplayDecadeChart ] = useState(false);
  const [ displayYearChart, setDisplayYearChart ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ displayTextList, setDisplayTextList ] = useState(false);
  // not actually a "separate" page, just renders to look like one
  const [ separatePage, setSeparatePage ] = useState(null); 

  // variables regarding the favorites collage
  const tileSize = 62;
  const rowLen = Math.floor(
    (window.innerWidth - 15) / (tileSize + 2) // + 2 bc of margin
  );

  useEffect(() => filteredProjects.length <= 180 && setFavorites(
    filteredProjects.sort((a, b) => a.favoritesIdx - b.favoritesIdx)
  ), [ filteredProjects ]);

  useEffect(() => {
    setDisplayMessage(true);
    const timeout = setTimeout(() => setDisplayMessage(false), 5000);
    return () => clearTimeout(timeout);
  }, [ message ]);

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

  const chartProps = {
    projects: favorites,
    filters,
    setFilters,
    setDisplayGenreChart,
    setDisplayDecadeChart,
    setDisplayYearChart,
    setMessage
  };

  return (<>
    {!separatePage && (
      <SearchBar
        list={'favorites'}
        searchQuery={query}
        handleChange={e => setQuery(e.target.value)}
        style={{ margin: '0 20px 5px 10px', display: 'inline-block' }}
      />
    )}
    <Options>
      {!query && (<>
        {!separatePage && (
          <span style={{ padding: '10px 0', backgroundColor: '#e0e0e0' }}>
            {charts.map(([ chart, setState, state, , upperChart ]) => (
              <ChartButton
                onClick={() => chartButtonClick(chart, setState, state, filters)}
                key={chart}
                {...{ filters, state, chart }}
              >
                {filters[chart]
                  ? `Clear ${upperChart} Filter`
                  : `${state ? 'Hide' : 'View'} ${upperChart} Data`}
              </ChartButton>
            ))}
            <Button 
              onClick={() => setDisplayTextList(!displayTextList)} 
              style={displayTextList ? { 
                border: '1px solid blue', 
                backgroundColor: '#cccccc' 
              } : {}}
            >
              {displayTextList ? 'Back To Collage' : 'Text List'}
            </Button>
          </span>
        )}
        <div style={{ width: '20px', display: 'inline-block' }} />
        {separatePage !== 'history' && (
          <Button 
            onClick={() => setSeparatePage(separatePage === 'popular' ? null : 'popular')}
          >
            {separatePage === 'popular' ? 'Back' : 'Most Popular Artists'}
          </Button>
        )}
        {separatePage !== 'popular' && (
          <Button
            onClick={() => setSeparatePage(separatePage === 'history' ? null : 'history')}
          >
            {separatePage === 'history' ? 'Back' : 'History'}
          </Button>
        )}
      </>)}
    </Options>
    <SearchResults 
      searchQuery={query}
      {...{ projects, setQuery, setFavorites, favorites }}
    />
    {displayMessage && (
      <Message
        msg={message}
        style={{ margin: '10px 10px 20px 30px', color: 'rgb(116, 43, 161)' }}
      />
    )}
    {charts.map(([ type, , displayChart, Component ]) => (
      (displayChart && !separatePage) ? <Component {...chartProps} key={type} /> : null
    ))}
    {!separatePage && (
      displayTextList ? (
        favorites.map(({ _id, artist, title }, idx) => (
          <div key={_id} style={{ fontSize: '8px', marginLeft: '10px' }}>
            {(idx % rowLen === 0) && <br />}
            <div>{artist} - {title}</div>
          </div>
        ))
      ) : (<Collage {...{ favorites, tileSize }} />)
    )}
    {separatePage === 'popular' && <MostPopularArtists favorites={favorites}/>}
    {separatePage === 'history' && <div>History</div>}
  </>);
};

const Options = styled.div`
  padding: 0 0 0 10px;
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

export default Favorites;
