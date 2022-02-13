// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddProjectForm from './AddProjectForm';
import ListButton from './ListButton';
import ProjectsList from './projectsList/ProjectsList';
import Message from './Message';
import Header from './Header';
import ArtistButton from './ArtistButton';
import ArtistList from './ArtistList';

const App = () => {
  const [ projects, setProjects ] = useState([]);
  const [ projectsAdded, setProjectsAdded ] = useState(0);
  const [ successfulSubmit, setSuccessfulSubmit ] = useState(0);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ displayProjects, setDisplayProjects ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ displayArtists, setDisplayArtists ] = useState(false);

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
    console.log('wtf1')
    const errMsg = validateInput(newProject);
    setErrorMessage(errMsg);
    if (errMsg) return;

    axios.post('/addProject', newProject)
      .then(({ data }) => {
        console.log('wtf2')
        if (data === 'success') {
          setSuccessfulSubmit(true);
          setProjectsAdded(projectsAdded + 1);
        }
        data === 'duplicate input' && setErrorMessage('This project has already been entered!')
      })
      .catch(console.log);
  };

  const getProjects = () => axios('projects').then(({ data }) => setProjects(data));
  useEffect(getProjects, [ projectsAdded ]);

  useEffect(() => {
    (projectsAdded || errorMessage) && setDisplayMessage(true);
    const timeout = setTimeout(() => setDisplayMessage(false), 5000);
    return () => clearTimeout(timeout);
  }, [ projectsAdded, errorMessage ]);

  return (<>
    <Header />
    {displayMessage && <Message message={errorMessage} successfulSubmit={successfulSubmit} projectsAdded={projectsAdded} />}
    <AddProjectForm handleSubmit={addProject} />
    <ListButton handleClick={() => setDisplayProjects(!displayProjects)} />
    <ArtistButton handleClick={() => setDisplayArtists(!displayArtists)} />
    {displayProjects && <ProjectsList projects={projects} />}
    {displayArtists && <ArtistList projects={projects} />}
  </>);
};

export default App;
