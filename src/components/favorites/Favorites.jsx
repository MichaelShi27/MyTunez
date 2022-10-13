import React, { useState } from 'react';
// import styled from 'styled-components';

import SearchBar from '../searchBar/SearchBar';
import SearchResults from './SearchResults';

const Favorites = ({ projects }) => {
  const [ query, setQuery ] = useState('');

  return (<>
    <SearchBar
      list={'favorites'}
      query={query}
      handleChange={e => setQuery(e.target.value)}
    />
    <SearchResults 
      projects={projects}
      searchQuery={query}
      setQuantity={() => {}}
      setNoSearchResults={() => {}}
    />
  </>);
};

export default Favorites;
