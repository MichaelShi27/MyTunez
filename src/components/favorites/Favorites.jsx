import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SearchBar from '../searchBar/SearchBar';
import SearchResults from './SearchResults';
import Collage from './Collage';
import GenreData from '../projectList/dataCharts/GenreData';
import DecadeData from '../projectList/dataCharts/DecadeData';
import YearData from '../projectList/dataCharts/YearData';

const Favorites = ({ projects, filteredProjects, filters }) => {
  const [ query, setQuery ] = useState('');
  const [ favorites, setFavorites ] = useState([]);
  const [ displayGenreChart, setDisplayGenreChart ] = useState(false);
  const [ displayDecadeChart, setDisplayDecadeChart ] = useState(false);
  const [ displayYearChart, setDisplayYearChart ] = useState(false);

  useEffect(() => filteredProjects.length <= 180 && setFavorites(
    filteredProjects.sort((a, b) => a.favoritesIdx - b.favoritesIdx)
  ), [ filteredProjects ]);

  const charts = [
    [ 'genre', setDisplayGenreChart, displayGenreChart, GenreData, 'Genre' ],
    [ 'decade', setDisplayDecadeChart, displayDecadeChart, DecadeData, 'Decade' ],
    [ 'year', setDisplayYearChart, displayYearChart, YearData, 'Year' ]
  ];

  const chartButtonClick = () => console.log('clicked');

  return (<>
    <SearchBar
      list={'favorites'}
      searchQuery={query}
      handleChange={e => setQuery(e.target.value)}
      style={{ margin: '0 20px 5px 10px', display: 'inline-block' }}
    />
    <Options>
      {!query && (
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
          <Button onClick={() => {}}>Text List</Button>
        </span>
      )}
    </Options>
    <SearchResults 
      projects={projects}
      searchQuery={query}
      setQuery={setQuery}
      setFavorites={setFavorites}
      favorites={favorites}
    />
    <Collage favorites={favorites} />
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
