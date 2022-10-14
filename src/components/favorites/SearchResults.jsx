import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Virtuoso } from 'react-virtuoso';

import Message from '../Message';
import { Loading, colors } from '../styles.js';
import { convertMoreSpecialChars } from '../../helpers';

const SearchResults = ({ projects, searchQuery, setQuery, setFavorites, favorites }) => {
  const [ sortedProjects, setSortedProjects ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ hoveredId, setHoveredId ] = useState(null);
  const [ message, setMessage ] = useState('');

  const existingFavorites = useMemo(() => {
    const obj = {};
    for (const { title, artist } of favorites)
      obj[`${title} - ${artist}`] = true;
    return obj;
  }, [ favorites ]);

  useEffect(() => setLoading(false), []);

  // filters list based on 'searchQuery' props
  useEffect(() => {
    const convertedQuery = convertMoreSpecialChars(searchQuery);
    const filtered = projects.filter(({ title, artist }) => (
      existingFavorites[`${title} - ${artist}`] === undefined && (
        convertMoreSpecialChars(title).includes(convertedQuery) ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        convertMoreSpecialChars(artist).includes(convertedQuery) ||
        artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ));
    setSortedProjects(filtered);
  }, [ searchQuery, projects, existingFavorites ]);

  useEffect(() => {
    const timeout = setTimeout(() => setMessage(''), 4000);
    return () => clearTimeout(timeout);
  }, [ message ]);

  const addFavorite = (id, title, artist) => {
    setQuery('');
    setHoveredId(null);

    if (favorites.length === 180)
      setMessage("You can't add any more favorites!");
    else
      setFavorites([ ...favorites, { id, title, artist } ]);
  };

  return loading ? <Loading>LOADING...</Loading> : (<>
    {message && <Message msg={message} />}
    {!searchQuery ? null : (
      <Virtuoso
        style={{
          height: Math.min(200, 30 * sortedProjects.length),
          width: 850,
          border: '1px solid gray',
          marginTop: 5
        }}
        data={sortedProjects}
        totalCount={sortedProjects.length}
        itemContent={(idx, { title, artist, _id }) => (
          <Project 
            key={_id}
            onClick={() => addFavorite(_id, title, artist)}
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
    )}
  </>);
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
