import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading, colors } from '../styles.js';
import { Virtuoso } from 'react-virtuoso';
import { convertMoreSpecialChars } from '../../helpers';

const SearchResults = ({ projects, searchQuery, setQuery }) => {
  const [ sortedProjects, setSortedProjects ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ hoveredIdx, setHoveredIdx ] = useState(null);

  useEffect(() => setLoading(false), []);

  // filters list based on 'searchQuery' props
  useEffect(() => {
    const convertedQuery = convertMoreSpecialChars(searchQuery);
    const filtered = projects.filter(({ title, artist }) => (
      convertMoreSpecialChars(title).includes(convertedQuery) ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convertMoreSpecialChars(artist).includes(convertedQuery) ||
      artist.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    setSortedProjects(filtered);
  }, [ searchQuery, projects ]);

  const addFavorite = () => {
    setQuery('');
    setHoveredIdx(null);
  };

  return (
    loading ? <Loading>LOADING...</Loading> :
    !searchQuery ? null : (
      <Virtuoso
        style={{
          height: Math.min(200, 30 * sortedProjects.length),
          width: 850,
          border: '1px solid gray',
          marginTop: 5
        }}
        data={sortedProjects}
        totalCount={sortedProjects.length}
        itemContent={(idx, { title, artist }) => (
          <Project 
            key={idx}
            onClick={() => addFavorite()}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <TextWrapper $type={'title'} $hovered={idx === hoveredIdx}>
              <em>{title}</em>
            </TextWrapper>
            <TextWrapper $type={'artist'} $hovered={idx === hoveredIdx}>
              {artist}
            </TextWrapper>
          </Project>
        )}
      />
    )
  );
};

const TextWrapper = styled.div`
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ $type }) => $type === 'genre' && 'center'};
  width: ${({ $type }) => (
    $type === 'title' ? '500px' :
    $type === 'artist' ? '280px' :
    null
  )};
  background-color: ${({ $genre, $hovered }) => colors[$genre] ?? ($hovered ? '#edeeee' : 'white')};
`;

const Project = styled.div`
  margin: 3px;
  width: 825px;
  padding: 3px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
  border: 1px solid gray;
  cursor: pointer;
  &:hover {
    color: blue;
    border: 1px solid blue;
    background-color: #edeeee;
  }
`;

export default SearchResults;
