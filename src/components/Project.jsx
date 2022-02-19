import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import EditProjectForm from './EditProjectForm';
import Message from './Message';

import { Button, StyledLink } from './styles.js';
import { wrangleInput, validateInput } from '../helpers.js';


const Project = () => {
  const [ project, setProject ] = useState({});
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ successfulEdit, setSuccessfulEdit ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ deleted, setDeleted ] = useState(false);
  const { id } = useParams();

  const getProject = () => axios(`/projects/${id}`).then(({ data }) => setProject(data[0]));
  useEffect(getProject, [ id, successfulEdit ]);

  const { artist, dateAdded, genre, title } = project;
  const formatDate = dateStr => {
    const date = new Date(dateAdded);
    return `${1 + date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  };

  const editProject = e => {
    e.preventDefault();
    setSuccessfulEdit(false);

    const { title, artist, genre, releaseYear } = e.target;
    const newData = { title, artist, genre, releaseYear };
    wrangleInput(newData);

    const errMsg = validateInput(newData);
    setErrorMessage(errMsg);
    if (errMsg) return;

    axios.patch(`/editProject/${id}`, newData)
      .then(({ data }) => {
        setSuccessfulEdit(data === 'success');
        data === 'duplicate input' && setErrorMessage('This information has already been entered!');
      })
      .catch(console.log);
  };

  useEffect(() => {
    displayForm && setDisplayForm(!successfulEdit);
    setDisplayMessage(errorMessage || successfulEdit);
    const timeout = setTimeout(() => {
      setDisplayMessage(false);
      setErrorMessage('');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [ errorMessage, successfulEdit, displayForm ]);

  const deleteProject = () => {
    axios.delete(`/deleteProject/${id}`)
      .then(({ data }) => setDeleted(data === 'success'))
      .catch(console.log);
  };

  if (!artist) return null;
  if (deleted) return (
    <MessageWrapper>
      <Message deleted={deleted} />
    </MessageWrapper>
  );

  const buttonStyle = {
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    width: displayForm ? '50px' : '80px',
    display: 'block',
    fontSize: '10px'
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
      {displayForm ? 'Close' : 'Edit Project'}
    </Button>
    {displayMessage && (
      <MessageWrapper>
        <Message message={errorMessage} edited={successfulEdit} />
      </MessageWrapper>
    )}
    {displayForm && <EditProjectForm handleSubmit={editProject} project={project} />}
    <Button style={{ ...buttonStyle, width: '80px' }} onClick={deleteProject}>
      Delete Project
    </Button>
  </>);
};

const Container = styled.div`
  margin: auto;
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

const MessageWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export default Project;