import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Message from '../Message';
import ErrorPage from '../ErrorPage';
import ArtistImage from './ArtistImage';

import { StyledLink, colors } from '../styles.js';
import { createArtistForSorting, convertSlashes } from '../../helpers.js';

const ArtistPage = ({ filteredProjects: allProjects, getProjectsForArtist, setPageNotFound }) => {
  const [ projects, setProjects ] = useState([]);

  const { name } = useParams();
  const [ text, setText ] = useState(name);

  // section 1 retrieves the artist's projects upon first render, & also after a new project is added
  const [ artistNotFound, setArtistNotFound ] = useState(false);
  useEffect(() => {
    getProjectsForArtist(name)
      .then(({ data }) => {
        if (data.length === 0) {
          setArtistNotFound(true);
          setPageNotFound(true);
        } else
          setProjects(data);
      });
  }, [ allProjects, name, getProjectsForArtist, setPageNotFound ]);

  // section 2 dynamically determines the width of the artist-name input field
  const [ width, setWidth ] = useState(0);
  const hiddenSpan = useRef();
  useEffect(() => setWidth(hiddenSpan.current.offsetWidth), [ text ]);

  // section 3 handles conditional rendering when user clicks outside the input field
  const [ nameClicked, setNameClicked ] = useState(false);
  const nameInput = useRef();

  useEffect(() => {
    const handleClickOutside = e => {
      if (nameInput.current && !nameInput.current.contains(e.target)) {
        setNameClicked(false);
        setText(name);
      }
    };

    document.addEventListener('click', handleClickOutside, false);
    return () => document.removeEventListener('click', handleClickOutside, false);
  }, [ name ]);

  // section 4 handles the edit-artist-name submit functionality
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    nameInput.current.blur();
    setNameClicked(false);

    for (const project of projects) {
      const newData = { ...project, artist: text };
      createArtistForSorting(newData);

      axios.patch(`/editProject/${newData._id}`, newData)
        .then(({ data }) => {
          if (data === 'success' || data === 'duplicate input') {
            setText(text);
            setErrorMessage('');
            navigate(`/artists/${convertSlashes(text)}`);
          } else
            setErrorMessage(data);
        })
        .catch(console.log);
    }

    setDisplayMessage(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayMessage(false);
      setErrorMessage('');
    }, errorMessage ? 5000 : 2000);
    return () => clearTimeout(timeout);
  }, [ displayMessage, errorMessage ]);

  const messageStyles = {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    width: '300px'
  };

  return artistNotFound ? <ErrorPage /> : (<>
      <div style={{ textAlign: 'center' }}>
      <div style={{
        padding: '1px 1px 0px',
        display: 'inline-block',
        backgroundColor: '#d3d3d3'
      }}>
        <ArtistImage name={name} />
      </div>
    </div>
    <Container>
      <HiddenSpan ref={hiddenSpan}>{text}</HiddenSpan> {/* for width-determing */}
      {projects.length > 0 && (<>
        <NameContainer>
          <form>
            <Name
              $width={width}
              value={text}
              onChange={e => setText(e.target.value)}
              onClick={() => setNameClicked(true)}
              ref={nameInput}
            />
            {displayMessage && (
              <Message
                saved={errorMessage ? false : true}
                message={errorMessage}
                style={messageStyles}
              />
            )}
            {!nameClicked && !displayMessage && <EditTooltip>Click to edit name</EditTooltip>}
            {nameClicked && <SaveButton onClick={handleSubmit}>Save</SaveButton>}
          </form>
        </NameContainer>
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
      </>)}
    </Container>
  </>);
};

const Container = styled.div`
  margin: auto;
  width: 720px;
`;

const HiddenSpan = styled.span`
  visibility: hidden;
  font-size: 25px;
`;

const Name = styled.input`
  display: table;
  margin: 15px auto;
  font-size: 25px;
  text-align: center;
  border: 1px solid white;
  width: ${({ $width }) => `${$width + ($width > 300 ? 80 : 50)}px`};
`;

const SaveButton = styled.button`
  display: flex;
  margin: auto;
`;

const EditTooltip = styled.div`
  visibility: hidden;
  position: absolute;
  left: 310px;
  font-size: 12px;
  color: transparent;
  background-color: transparent;
  transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s,
    padding 0.5s ease-in-out;
  &:before {
    content: "";
    left: 45px;
    top: -4px;
    position: absolute;
    border: 4px solid transparent;
    transform: rotate(135deg);
    transition: border 0.3s ease-in-out;
  }
`;

const NameContainer = styled.div`
  position: relative;
  & ${Name}:hover + ${EditTooltip} {
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 6px;
    border-radius: 4px;
    &:before {
      border-color: transparent transparent rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.5);
    }
  }
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
  background-color: ${({ $genre, $header }) => colors[$genre] ?? ($header ? '#e0e0e0' : 'white')};
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
  margin: 25px 0 0;
`;

export default ArtistPage;
