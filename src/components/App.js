// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import AddProjectForm from './AddProjectForm';
import ProjectList from './projectList/ProjectList';
import Message from './Message';
import ArtistList from './artistList/ArtistList';
import ArtistPage from './ArtistPage';
import ProjectPage from './projectPage/ProjectPage';
import SearchBar from './SearchBar';
import ArtistCheckbox from './ArtistCheckbox';

import { Header, Button } from './styles.js';
import { wrangleInput, validateInput } from '../helpers.js';

const App = () => {
  const [ projects, setProjects ] = useState([]);
  const [ projectsAdded, setProjectsAdded ] = useState(0);
  const [ successfulSubmit, setSuccessfulSubmit ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ currentList, setCurrentList ] = useState('projects');
  const [ displayForm, setDisplayForm ] = useState(true);
  const [ displaySearch, setDisplaySearch ] = useState(true);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ includeArtists, setIncludeArtists ] = useState(true);
  const [ displayCheckbox, setDisplayCheckbox ] = useState(true);

  const { pathname: path } = useLocation();

  // determines what to render based on current URL
  useEffect(() => {
    setDisplayForm(!(path.indexOf('/projects') === 0));
    setDisplaySearch(path === '/' || path === '/artists');
    setDisplayCheckbox(path === '/');

    if (path === '/')
      setCurrentList('projects');
    else if (path === '/artists')
      setCurrentList('artists');
    else
      setCurrentList('');
  }, [ path ]);

  const addProject = e => {
    e.preventDefault();
    setSuccessfulSubmit(false);

    const { title, artist, genre, releaseYear } = e.target;
    const dateAdded = new Date();
    const newProject = { title, artist, genre, releaseYear, dateAdded };
    wrangleInput(newProject);

    const errMsg = validateInput(newProject);
    setErrorMessage(errMsg);
    if (errMsg) return;

    axios.post('/addProject', newProject)
      .then(({ data }) => {
        if (data === 'success') {
          setSuccessfulSubmit(true);
          setProjectsAdded(projectsAdded + 1);
        }
        data === 'duplicate input' && setErrorMessage('This project has already been entered!');
      })
      .catch(console.log);
  };

  const getProjects = () => axios('/projects').then(({ data }) => setProjects(data));

  // updates list when a project is added
  useEffect(getProjects, [ projectsAdded ]);

  // displays success/error message
  useEffect(() => {
    setDisplayMessage(projectsAdded || errorMessage);
    const timeout = setTimeout(() => {
      setDisplayMessage(false);
      setErrorMessage('');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [ projectsAdded, errorMessage ]);

  return (<>
    <Header>myTunez</Header>
    {displayMessage && (
      <Message
        message={errorMessage}
        added={successfulSubmit}
        projectsAdded={projectsAdded}
      />
    )}
    {displayForm && <AddProjectForm addProject={addProject} />}
    <Link to="/">
      <Button $selected={currentList === 'projects'}>Projects</Button>
    </Link>
    <Link to="/artists">
      <Button $selected={currentList === 'artists'}>Artists</Button>
    </Link>
    <div style={{ display: 'flex' }}>
      {displaySearch && (
        <SearchBar
          list={currentList}
          searchQuery={searchQuery}
          handleChange={e => setSearchQuery(e.target.value)}
        />
      )}
      {displayCheckbox && <ArtistCheckbox {...{ includeArtists, setIncludeArtists }}/>}
    </div>
    <Routes>
      <Route path="/" element={
        <ProjectList {...{
          projects,
          searchQuery,
          setDisplaySearch,
          includeArtists,
          setDisplayCheckbox
        }}/>
      }/>
      <Route path="/artists" element={<ArtistList {...{ projects, searchQuery }} />} />
      <Route path="/artists/:name" element={<ArtistPage allProjects={projects} />} />
      <Route path="/projects/:id" element={<ProjectPage />} />
    </Routes>
  </>);
};

export default App;
