import React from 'react';
import styled from 'styled-components';

const ProjectsList = ({ projects }) => (
  projects.map(({ title, artist, genre }, idx) => (
    <Project key={idx} genre={genre}>
      <TextWrapper type={'title'}><em>{title}</em></TextWrapper>
      <TextWrapper type={'artist'}>{artist}</TextWrapper>
      <TextWrapper type={'genre'} genre={genre}>{genre}</TextWrapper>
    </Project>
  ))
);

const TextWrapper = styled.div`
  padding: 0 5px;
  // border: 1px solid red;
  display: inline-block;
  width: ${({ type }) => (
    type === 'title' ? '600px' :
    type === 'artist' ? '280px' :
    type === 'genre' ? '80px' :
    null
  )};
  background-color: ${({ type, genre }) => (
    genre === 'rock' ? 'rgb(255, 255, 49)' :
    genre === 'pop' ? 'rgb(255, 158, 242)' :
    genre === 'hip-hop' ? 'rgb(71, 250, 86);)' :
    genre === 'electronic' ? 'aqua' :
    'white'
  )};
`;

const Project = styled.div`
  margin: 3px;
  width: 1000px;
  padding: 3px;
  border: 1px solid gray;
`;

export default ProjectsList;
