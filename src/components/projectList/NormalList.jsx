import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { StyledLink, Loading, colors } from '../styles.js';
import { Virtuoso } from 'react-virtuoso';
import { convertMoreSpecialChars, convertSlashes } from '../../helpers';

const NormalList = ({
  projects, sortBy, searchQuery, setQuantity, noSearchResults, setNoSearchResults, includeArtists
}) => {
  const [ sortedProjects, setSortedProjects ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => setLoading(false), []);

  // sorts list based on 'sortBy' prop
  useEffect(() => {
    const projectsCopy = projects.slice();
    setSortedProjects(
      sortBy === 'artist'
        ? projects
        : projectsCopy.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    );
  }, [ projects, sortBy ]);

  // filters list based on 'searchQuery' && 'includeArtists' props
  useEffect(() => {
    const convertedQuery = convertMoreSpecialChars(searchQuery);
    const filtered = projects.filter(({ title, artist }) => (
      convertMoreSpecialChars(title).includes(convertedQuery) ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ( includeArtists && convertMoreSpecialChars(artist).includes(convertedQuery) ) ||
      ( includeArtists && artist.toLowerCase().includes(searchQuery.toLowerCase()) )
    ));
    setSortedProjects(filtered);
    setQuantity(filtered.length);
    setNoSearchResults(filtered.length === 0);
  }, [ searchQuery, projects, setQuantity, setNoSearchResults, includeArtists ]);

  return (
    loading ? <Loading>LOADING...</Loading> :
    noSearchResults ?  null : (<>
      <Header>
        <TextWrapper $header={'true'} $type={'title'}>Project Title</TextWrapper>
        <TextWrapper $header={'true'} $type={'artist'}>Artist</TextWrapper>
        <TextWrapper $header={'true'} $type={'genre'}>Genre</TextWrapper>
      </Header>
      <Virtuoso
        style={{
          height: Math.min(590, 30 * sortedProjects.length),
          width: 1030,
          border: '1px solid gray',
          marginTop: 5
        }}
        data={sortedProjects}
        totalCount={sortedProjects.length}
        itemContent={(idx, { title, artist, genre, _id }) => (
          <Project key={idx}>
            <StyledLink to={`/projects/${_id}`}>
              <TextWrapper $type={'title'}><em>{title}</em></TextWrapper>
            </StyledLink>
            <StyledLink to={`/artists/${convertSlashes(artist)}`}>
              <TextWrapper $type={'artist'}>{artist}</TextWrapper>
            </StyledLink>
            <TextWrapper $type={'genre'} $genre={genre}>
              {genre[0].toUpperCase() + genre.slice(1)}
            </TextWrapper>
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
    $type === 'title' ? '600px' :
    $type === 'artist' ? '280px' :
    $type === 'genre' ? '80px' :
    null
  )};
  background-color: ${({ $genre, $header }) => colors[$genre] ?? ($header ? '#e0e0e0' : 'white')};
`;

const Project = styled.div`
  margin: 3px;
  width: 1000px;
  padding: 3px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
  border: 1px solid gray;
`;

const Header = styled(Project)`
  font-family: Palatino, Lucida Console, serif;
  font-size: 13px;
  background-color: #e0e0e0;
  border: none;
  padding: 8px 8px 5px;
  width: 990px;
`;

export default NormalList;
