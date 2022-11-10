import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Message from '../Message';
import ErrorPage from '../ErrorPage';
import EditProjectForm from './EditProjectForm';
import DeletionModal from './DeletionModal';
import ProjectImage from './ProjectImage';

import { Button, StyledLink, colors } from '../styles.js';
import { wrangleInput, validateInput } from '../../helpers.js';

const ProjectPage = ({ getProjectsForArtist, setPageNotFound }) => {
  const [ project, setProject ] = useState({});
  const [ displayForm, setDisplayForm ] = useState(false);
  const [ successfulEdit, setSuccessfulEdit ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ deleted, setDeleted ] = useState(false);
  const [ displayModal, setDisplayModal ] = useState(false);
  const [ goBack, setGoBack ] = useState(false);
  const [ projectNotFound, setProjectNotFound ] = useState(false);
  const { id } = useParams();

  const getProject = () => {
    axios(`/projects/${id}`)
      .then(({ data }) => {
        if (data === 'project not found') {
          setProjectNotFound(true);
          setPageNotFound(true);
        } else
          setProject(data[0]);
      })
      .catch(err => console.log(err));
  };

  // retrieves project info after clicking project name & re-renders page after edit
  useEffect(getProject, [ id, successfulEdit, setPageNotFound ]);

  const { artist, dateAdded, genre, title, releaseYear } = project;

  const formatDate = () => {
    const date = new Date(dateAdded);
    return (date.getFullYear() > 2000)
      ? `${1 + date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
      : 'N/A';
  };

  const editProject = e => {
    e.preventDefault();
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

  const editButtonClick = ({ target: { textContent } }) => {
    setSuccessfulEdit(false);
    setDisplayMessage(false);
    setDisplayForm(textContent === 'Edit Project');
  };

  // handles form & success/error message rendering after edit
  useEffect(() => {
    successfulEdit && setDisplayForm(false);
    setDisplayMessage(errorMessage || successfulEdit);

    const timeout = setTimeout(() => {
      setDisplayMessage(false);
      setErrorMessage('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [ errorMessage, successfulEdit ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!goBack) return;

    let timeout;

    const asyncWrapper = async () => {
      const { data } = await getProjectsForArtist(artist);
      const destination = (data.length === 0) ? '/' : -1;
      timeout = setTimeout(() => navigate(destination), 3000);
    };

    asyncWrapper();
    return () => clearTimeout(timeout);
  }, [ goBack, navigate, getProjectsForArtist, artist ]);

  const deleteProject = () => {
    axios.delete(`/deleteProject/${id}`)
      .then(({ data }) => {
        setDeleted(data === 'success');
        setGoBack(true);
      })
      .catch(console.log);
  };

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

  return projectNotFound ? <ErrorPage /> : (<>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        padding: '1px 1px 0px',
        display: 'inline-block'
      }}>
        <ProjectImage project={project} style={{ border: '1px solid #d3d3d3' }} />
      </div>
    </div>
    <Container>
      <Name><em>{title}</em></Name>
      <Header>
        <TextWrapper $header={'true'} $type={'artist'}>Artist</TextWrapper>
        <TextWrapper $header={'true'} $type={'genre'}>Genre</TextWrapper>
        <TextWrapper $header={'true'} $type={'year'}>Release Year</TextWrapper>
        <TextWrapper $header={'true'} $type={'date'}>Date Added</TextWrapper>
      </Header>
      <Wrapper>
        <StyledLink to={`/artists/${artist}`}>
          <TextWrapper $type={'artist'}>{artist}</TextWrapper>
        </StyledLink>
        <TextWrapper $type={'genre'} $genre={genre}>
          {genre && (genre[0].toUpperCase() + genre.slice(1))}
        </TextWrapper>
        <TextWrapper $type={'year'}>{releaseYear || 'N/A'}</TextWrapper>
        <TextWrapper $type={'date'}>{formatDate()}</TextWrapper>
      </Wrapper>
    </Container>
    <Button style={buttonStyle} onClick={editButtonClick}>
      {displayForm ? 'Close' : 'Edit Project'}
    </Button>
    {displayMessage && (
      <MessageWrapper>
        <Message message={errorMessage} edited={successfulEdit} />
      </MessageWrapper>
    )}
    {displayForm && <EditProjectForm handleSubmit={editProject} project={project} />}
    <Button style={{ ...buttonStyle, width: '80px' }} onClick={() => setDisplayModal(true)}>
      Delete Project
    </Button>
    {displayModal && <DeletionModal deleteProject={deleteProject} hideModal={() => setDisplayModal(false)} />}
  </>);
};

const Container = styled.div`
  margin: auto;
  width: 650px;
`;

const Name = styled.div`
  margin: 20px;
  font-size: 25px;
  text-align: center;
`;

const TextWrapper = styled.div`
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ $type }) => $type !== 'artist' && 'center'};
  width: ${({ $type }) => (
    $type === 'artist' ? '250px' :
    $type === 'genre' ? '100px' :
    $type === 'date' ? '70px' :
    $type === 'year' ? '170px' :
    null
  )};
  background-color: ${({ $genre, $header }) => colors[$genre] ?? ($header ? '#e0e0e0' : 'white')};
`;

const Wrapper = styled.div`
  margin: 3px;
  width: 630px;
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
  width: 634px;
`;

const MessageWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export default ProjectPage;
