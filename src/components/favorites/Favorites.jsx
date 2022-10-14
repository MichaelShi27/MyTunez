import React, { useState } from 'react';

import SearchBar from '../searchBar/SearchBar';
import SearchResults from './SearchResults';

const Favorites = ({ projects }) => {
  const [ query, setQuery ] = useState('');
  const [ favorites, setFavorites ] = useState([]);

  return (<>
    <SearchBar
      list={'favorites'}
      searchQuery={query}
      handleChange={e => setQuery(e.target.value)}
    />
    <SearchResults 
      projects={projects}
      searchQuery={query}
      setQuery={setQuery}
      setFavorites={setFavorites}
      favorites={favorites}
    />
    {favorites.map(({ artist, title, id }) => (
      <div key={id}>{title} - {artist}</div>
    ))}
  </>);
};

export default Favorites;
