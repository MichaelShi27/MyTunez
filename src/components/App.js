// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import AddProjectForm from './AddProjectForm';
import ProjectList from './projectList/ProjectList';
import Message from './Message';
import ArtistList from './ArtistList';
import Artist from './Artist';
import Project from './Project';

import { Header, Button } from './styles.js';
import { wrangleInput, validateInput } from '../helpers.js';

const App = () => {
  const [ projects, setProjects ] = useState([]);
  const [ projectsAdded, setProjectsAdded ] = useState(0);
  const [ successfulSubmit, setSuccessfulSubmit ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ currentList, setCurrentList ] = useState('');
  const [ displayForm, setDisplayForm ] = useState(true);

  const { pathname: path } = useLocation();
  useEffect(() => {
    setDisplayForm(!(path.indexOf('/projects') === 0));

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
        data === 'duplicate input' && setErrorMessage('This project has already been entered!')
      })
      .catch(console.log);
  };

  const getProjects = () => axios('/projects').then(({ data }) => setProjects(data));
  useEffect(getProjects, [ projectsAdded, currentList ]);

  useEffect(() => {
    (projectsAdded || errorMessage) && setDisplayMessage(true);
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
        submit={successfulSubmit}
        projectsAdded={projectsAdded}
      />
    )}
    {displayForm && <AddProjectForm handleSubmit={addProject} />}
    <Link to="/">
      <Button $selected={currentList === 'projects'}>Projects</Button>
    </Link>
    <Link to="/artists">
      <Button $selected={currentList === 'artists'}>Artists</Button>
    </Link>
    <Routes>
      <Route path="/" element={<ProjectList projects={projects} />} />
      <Route path="/artists" element={<ArtistList projects={projects} />} />
      <Route path="/artists/:name" element={<Artist allProjects={projects} />} />
      <Route path="/projects/:id" element={<Project />} />
    </Routes>
  </>);
};

export default App;
