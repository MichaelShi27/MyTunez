import React, { useEffect, useState } from 'react';

import SearchBar from '../searchBar/SearchBar';
import SearchResults from './SearchResults';
import Collage from './Collage';

const Favorites = ({ projects }) => {
  const [ query, setQuery ] = useState('');
  const [ favorites, setFavorites ] = useState([]);

  // // placeholder - fills in albums
  // useEffect(() => {
  //   const arr = []
  //   for (let i = 0; i < 180; i++) {
  //     if (i === 17)
  //       arr.push({ title: 'Red Light', artist: 'Bladee', id: i });
  //     else
  //       arr.push({ title: 'Spiderr', artist: 'Bladee', id: i });
  //   }
  //   setFavorites(arr);
  // }, []);

  return (<>
    <SearchBar
      list={'favorites'}
      searchQuery={query}
      handleChange={e => setQuery(e.target.value)}
      style={{ marginBottom: '20px' }}
    />
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

export default Favorites;
