import React from 'react';
import styled from 'styled-components';

const ProjectsList = ({ projects }) => (<>
  <Row>
    <TextWrapper label={'true'} type={'title'}>Project Title</TextWrapper>
    <TextWrapper label={'true'} type={'artist'}>Artist</TextWrapper>
    <TextWrapper label={'true'} type={'genre'}>Genre</TextWrapper>
  </Row>
  {projects.map(({ title, artist, genre }, idx) => (
    <Project key={idx} genre={genre}>
      <TextWrapper type={'title'}><em>{title}</em></TextWrapper>
      <TextWrapper type={'artist'}>{artist}</TextWrapper>
      <TextWrapper type={'genre'} genre={genre}>{genre[0].toUpperCase() + genre.slice(1)}</TextWrapper>
    </Project>
  ))}
</>);

const Row = styled.div`
  margin: 3px;
  width: 1000px;
  padding: 3px;
  background-color: #e0e0e0;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
`;

const TextWrapper = styled.div`
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ type }) => type === 'genre' && 'center'};
  width: ${({ type }) => (
    type === 'title' ? '600px' :
    type === 'artist' ? '280px' :
    type === 'genre' ? '80px' :
    null
  )};
  background-color: ${({ genre, label }) => (
    genre === 'rock' ? 'rgb(255, 255, 49)' :
    genre === 'pop' ? 'rgb(255, 158, 242)' :
    genre === 'hip-hop' ? 'rgb(71, 250, 86);)' :
    genre === 'electronic' ? 'aqua' :
    label ? '#e0e0e0' : 'white'
  )};
`;

const Project = styled(Row)`
  background-color: white;
  border: 1px solid gray;
`;

export default ProjectsList;
