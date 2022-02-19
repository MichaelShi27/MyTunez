import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Button, StyledLink } from './styles.js';

const Project = () => {
  const [ project, setProject ] = useState({});
  const [ displayForm, setDisplayForm ] = useState(false);
  const { id } = useParams();

  const getProject = () => {
    axios(`/projects/${id}`)
      .then(({ data }) => setProject(data[0]));
  };
  useEffect(getProject, [ id ]);

  const { artist, dateAdded, genre, title } = project;
  const formatDate = dateStr => {
    const date = new Date(dateAdded);
    return `${1 + date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  };

  if (!artist) return null;

  const buttonStyle = {
    margin: 'auto',
    width: displayForm ? '50px' : '80px',
    display: 'block',
    'font-size': '10px'
  };
  return (<>
    <Container>
      <Name><em>{title}</em></Name>
      <Header>
        <TextWrapper $header={'true'} $type={'artist'}>Artist</TextWrapper>
        <TextWrapper $header={'true'} $type={'genre'}>Genre</TextWrapper>
        <TextWrapper $header={'true'} $type={'date'}>Date Added</TextWrapper>
      </Header>
      <Wrapper>
        <StyledLink to={`/artists/${artist}`}>
          <TextWrapper $type={'artist'}>{artist}</TextWrapper>
        </StyledLink>
        <TextWrapper $type={'genre'} $genre={genre}>{genre && (genre[0].toUpperCase() + genre.slice(1))}</TextWrapper>
        <TextWrapper $type={'date'}>{formatDate(dateAdded)}</TextWrapper>
      </Wrapper>
    </Container>
    <Button style={buttonStyle} onClick={() => setDisplayForm(!displayForm)}>
      {displayForm ? 'Cancel' : 'Edit Project'}
    </Button>
  </>);
};

const Container = styled.div`
  margin: auto;
  margin-bottom: 20px;
  width: 520px;
`;

const Name = styled.div`
  margin: 20px;
  font-size: 25px;
  text-align: center;
`;

const TextWrapper = styled.div`
  margin: ${({ $type }) => $type === 'date' && '0 0 0 20px'};
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ $type }) => ($type === 'genre' || $type === 'date') && 'center'};
  width: ${({ $type }) => (
    $type === 'artist' ? '250px' :
    $type === 'genre' ? '100px' :
    $type === 'date' ? '100px' :
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

const Wrapper = styled.div`
  margin: 3px;
  width: 500px;
  padding: 3px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
  border: 1px solid gray;
`;

const Header = styled(Wrapper)`
  font-family: Palatino, Lucida Console, serif;
  font-size: 13px;
  background-color: #e0e0e0;
  border: none;
  padding: 8px 2px 5px;
  width: 500x;
`;

export default Project;
