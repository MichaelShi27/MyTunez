import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { StyledLink, Loading, colors } from '../styles.js';
import { Virtuoso } from 'react-virtuoso';
import { convertMoreSpecialChars, convertSlashes } from '../../helpers';

const SearchResults = ({
  projects, searchQuery
}) => {
  const [ sortedProjects, setSortedProjects ] = useState([]);
  const [ loading, setLoading ] = useState(true);

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

  return (
    loading ? <Loading>LOADING...</Loading> :
    !searchQuery ? null : (<>
      {/* <Header>
        <TextWrapper $header={'true'} $type={'title'}>Project Title</TextWrapper>
        <TextWrapper $header={'true'} $type={'artist'}>Artist</TextWrapper>
      </Header> */}
      <Virtuoso
        style={{
          height: Math.min(200, 30 * sortedProjects.length),
          width: 850,
          border: '1px solid gray',
          marginTop: 5
        }}
        data={sortedProjects}
        totalCount={sortedProjects.length}
        itemContent={(idx, { title, artist, genre, _id }) => (
          <Project key={idx}>
            <TextWrapper $type={'title'}><em>{title}</em></TextWrapper>
            <TextWrapper $type={'artist'}>{artist}</TextWrapper>
          </Project>
        )}
      />
    </>)
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
  background-color: ${({ $genre, $header }) => colors[$genre] ?? ($header ? '#e0e0e0' : 'white')};
`;

const Project = styled.div`
  margin: 3px;
  width: 825px;
  padding: 3px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
  border: 1px solid gray;
`;

// const Header = styled(Project)`
//   font-family: Palatino, Lucida Console, serif;
//   font-size: 13px;
//   background-color: #e0e0e0;
//   border: none;
//   padding: 8px 8px 5px;
//   width: 990px;
// `;

export default SearchResults;
