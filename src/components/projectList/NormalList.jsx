import React from 'react';
import styled from 'styled-components';
import { StyledLink } from '../styles.js';

const NormalList = ({ projects, sortBy }) => {
  const projectsCopy = projects.slice();
  const sortedProjects = sortBy === 'artist' ? projects : projectsCopy.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  return (<>
    <Header>
      <TextWrapper $header={'true'} $type={'title'}>Project Title</TextWrapper>
      <TextWrapper $header={'true'} $type={'artist'}>Artist</TextWrapper>
      <TextWrapper $header={'true'} $type={'genre'}>Genre</TextWrapper>
    </Header>
    {sortedProjects.map(({ title, artist, genre, _id }, idx) => (
      <Project key={idx}>
        <StyledLink to={`/projects/${_id}`}>
          <TextWrapper $type={'title'}><em>{title}</em></TextWrapper>
        </StyledLink>
        <StyledLink to={`/artists/${artist}`}>
          <TextWrapper $type={'artist'}>{artist}</TextWrapper>
        </StyledLink>
        <TextWrapper $type={'genre'} $genre={genre}>{genre[0].toUpperCase() + genre.slice(1)}</TextWrapper>
      </Project>
    ))}
  </>);
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
  background-color: ${({ $genre, $header }) => (
    $genre === 'rock' ? 'rgb(255, 255, 49)' :
    $genre === 'pop' ? 'rgb(255, 158, 242)' :
    $genre === 'hip-hop' ? 'rgb(71, 250, 86);)' :
    $genre === 'electronic' ? 'aqua' :
    $genre === 'other' ? '#ff9700' :
    $header ? '#e0e0e0' : 'white'
  )};
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
