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

const App = () => {
  const [ projects, setProjects ] = useState([]);
  const [ projectsAdded, setProjectsAdded ] = useState(0);
  const [ successfulSubmit, setSuccessfulSubmit ] = useState(0);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ currentList, setCurrentList ] = useState('');

  const { pathname: path } = useLocation();
  useEffect(() => {
    if (path === '/')
      setCurrentList('projects');
    else if (path === '/artists')
      setCurrentList('artists');
    else
      setCurrentList('');
  }, [ path ]);

  const validateInput = ({ title, artist, releaseYear }) => (
    (!title || !artist) ? 'Please fill in both the title and artist fields!' :
    isNaN(releaseYear) ? 'Please enter a number in the year field!' :
    (releaseYear > new Date().getYear() + 1900) ? 'Please enter a valid year!' : ''
  );

  const wrangleInput = newProject => {
    for (const key in newProject)
      if (key !== 'dateAdded')
        newProject[key] = newProject[key].value;

    let str = newProject.artist.toLowerCase(); // MongoDB doesn't allow case-insensitive sorting
    if (str.indexOf('the ') === 0)
      str = str.slice(4);

    const artistForSorting = [];
    for (const char of str) {
      if (char === '.' || char === ',' || char === ' ')
        continue;
      artistForSorting.push(char === '$' ? 's' : char);
    }
    newProject.artistForSorting = artistForSorting.join('');
  };

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
  useEffect(getProjects, [ projectsAdded ]);

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
        successfulSubmit={successfulSubmit}
        projectsAdded={projectsAdded}
      />
    )}
    <AddProjectForm handleSubmit={addProject} />
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
