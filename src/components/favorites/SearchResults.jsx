import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Virtuoso } from 'react-virtuoso';

import { Loading, colors } from '../styles.js';
import { convertMoreSpecialChars } from '../../helpers';

const SearchResults = ({ projects, query, addFavorite, favorites }) => {
  const [ sortedProjects, setSortedProjects ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ hoveredId, setHoveredId ] = useState(null);

  const existingFavorites = useMemo(() => {
    const obj = {};
    for (const { title, artist } of favorites)
      obj[`${title} - ${artist}`] = true;
    return obj;
  }, [ favorites ]);

  useEffect(() => setLoading(false), []);

  // filters list based on 'query' props
  useEffect(() => {
    const convertedQuery = convertMoreSpecialChars(query);
    const filtered = projects.filter(({ title, artist }) => (
      existingFavorites[`${title} - ${artist}`] === undefined && (
        convertMoreSpecialChars(title).includes(convertedQuery) ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        convertMoreSpecialChars(artist).includes(convertedQuery) ||
        artist.toLowerCase().includes(query.toLowerCase())
      )
    ));
    setSortedProjects(filtered);
  }, [ query, projects, existingFavorites ]);

  return loading ? <Loading>LOADING...</Loading> : (
    !query ? null : (
      <Virtuoso
        style={{
          height: Math.min(200, 30 * sortedProjects.length),
          width: 850,
          border: '1px solid gray'
        }}
        data={sortedProjects}
        totalCount={sortedProjects.length}
        itemContent={(idx, { title, artist, _id }) => ( // idx is just for React Virtuoso
          <Project 
            key={_id}
            onClick={() => addFavorite(_id)}
            onMouseEnter={() => setHoveredId(_id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <TextWrapper $type={'title'} $hovered={_id === hoveredId}>
              <em>{title}</em>
            </TextWrapper>
            <TextWrapper $type={'artist'} $hovered={_id === hoveredId}>
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
