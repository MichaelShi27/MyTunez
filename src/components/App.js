// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import ListButton from './ListButton';
import AddProjectForm from './AddProjectForm';
import ProjectsList from './ProjectsList';
import axios from 'axios';

const App = () => {
  const [ startingUp, setStartingUp ] = useState(true);
  const [ projects, setProjects ] = useState([]);
  const [ addingNewProject, setAddingNewProject ] = useState(false);
  const [ displayList, setDisplayList ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  const validateInput = ({ title, artist, releaseYear }) => {
    console.log(new Date().getYear())
    if (!title || !artist)
      return 'Please fill in both the title and artist fields!';
    if (isNaN(releaseYear))
      return 'Please enter a number in the year field!';
    if (releaseYear > new Date().getYear() + 1900)
      return 'Please enter a valid year!';
    return '';
  };

  const addProject = e => {
    e.preventDefault();
    const { title, artist, genre, releaseYear } = e.target;
    const dateAdded = new Date();
    const newProject = { title, artist, genre, releaseYear, dateAdded };

    for (const key in newProject)
      if (key !== 'dateAdded')
        newProject[key] = newProject[key].value;

    let artistForSorting = newProject.artist.toLowerCase(); // MongoDB doesn't allow case-insensitive sorting
    if (artistForSorting.indexOf('the ') === 0)
      artistForSorting = artistForSorting.slice(4);
    newProject.artistForSorting = artistForSorting;

    const errMsg = validateInput(newProject);
    setErrorMessage(errMsg);

    if (!errMsg) {
      axios.post('/addProject', newProject)
        .then(({ data }) => data === 'duplicate input' && setErrorMessage('This project has already been entered!'))
        .catch(console.log);
      setAddingNewProject(true);
    }
  };

  const getProjects = () => {
    if (addingNewProject || startingUp) {
      axios('projects')
        .then(({ data }) => setProjects(data));
      addingNewProject && setAddingNewProject(false);
    }
  };
  useEffect(getProjects, [ addingNewProject, startingUp ]);

  useEffect(() => setStartingUp(false), []);

  return (<>
    {errorMessage && <div>Error: {errorMessage}</div>}
    <AddProjectForm handleSubmit={addProject} />
    <ListButton projects={projects} handleClick={() => setDisplayList(!displayList)} />
    {displayList && <ProjectsList projects={projects} />}
  </>);
};

export default App;
