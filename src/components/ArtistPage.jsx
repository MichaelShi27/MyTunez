import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { StyledLink } from './styles.js';

const ArtistPage = ({ allProjects }) => {
  const [ projects, setProjects ] = useState([]);
  const { name } = useParams();

  const getProjects = () => {
    axios(`/artists/${name}`)
      .then(({ data }) => setProjects(data));
  };

  // retrieves the artist's projects upon first render, & also after a new project is added
  useEffect(getProjects, [ allProjects, name ]);

  return (
    <Container>
      <Name>{name}</Name>
      <Header>
        <TextWrapper $header={'true'} $type={'title'}>Project Title</TextWrapper>
        <TextWrapper $header={'true'} $type={'genre'}>Genre</TextWrapper>
      </Header>
      {projects.map(({ title, genre, _id }, idx) => (
        <Project key={idx}>
          <StyledLink to={`/projects/${_id}`}>
            <TextWrapper $type={'title'}><em>{title}</em></TextWrapper>
          </StyledLink>
          <TextWrapper $type={'genre'} $genre={genre}>
            {genre[0].toUpperCase() + genre.slice(1)}
          </TextWrapper>
        </Project>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 720px;
`;

const Name = styled.div`
  margin: 20px;
  font-size: 25px;
  text-align: center;
`;

const TextWrapper = styled.div`
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ $type }) => $type === 'genre' && 'center'};
  width: ${({ $type }) => (
    $type === 'title' ? '600px' :
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
  width: 700px;
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
  padding: 8px 2px 5px;
  width: 700x;
`;

export default ArtistPage;
