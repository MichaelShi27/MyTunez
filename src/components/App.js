// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddProjectForm from './AddProjectForm';
import ListButton from './ListButton';
import ProjectsList from './ProjectsList';
import RawListButton from './RawListButton';
import RawList from './RawList';
import Message from './Message';

const App = () => {
  const [ projects, setProjects ] = useState([]);
  const [ projectsAdded, setProjectsAdded ] = useState(0);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ displayList, setDisplayList ] = useState(false);
  const [ displayRawList, setDisplayRawList ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  const validateInput = ({ title, artist, releaseYear }) => (
    (!title || !artist) ? 'Please fill in both the title and artist fields!' :
    isNaN(releaseYear) ? 'Please enter a number in the year field!' :
    (releaseYear > new Date().getYear() + 1900) ? 'Please enter a valid year!' : ''
  );

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
    if (errMsg) return;

    axios.post('/addProject', newProject)
      .then(({ data }) => {
        data === 'success' && setProjectsAdded(projectsAdded + 1);
        data === 'duplicate input' && setErrorMessage('This project has already been entered!')
      })
      .catch(console.log);
  };

  const getProjects = () => axios('projects').then(({ data }) => setProjects(data));
  useEffect(getProjects, [ projectsAdded ]);

  useEffect(() => {
    if (projectsAdded || errorMessage) {
      setDisplayMessage(true);
      setTimeout(() => setDisplayMessage(false), 5000);
    }
  }, [ projectsAdded, errorMessage ]);

  const toggleListDisplays = e => {
    let clickedState, setClickedState, otherState, setOtherState;
    if (e.target.textContent === 'View All Projects') {
      clickedState = displayList;
      setClickedState = setDisplayList;
      otherState = displayRawList;
      setOtherState = setDisplayRawList;
    } else {
      clickedState = displayRawList;
      setClickedState = setDisplayRawList;
      otherState = displayList;
      setOtherState = setDisplayList;
    }

    setClickedState(!clickedState);
    if (!displayList && !displayRawList)
      return;
    if (otherState === true)
      setOtherState(false);
  };

  return (<>
    {displayMessage && <Message message={errorMessage || 'success'} projectsAdded={projectsAdded} />}
    <AddProjectForm handleSubmit={addProject} />
    <ListButton projects={projects} handleClick={toggleListDisplays} />
    <RawListButton projects={projects} handleClick={toggleListDisplays} />
    {displayList && <ProjectsList projects={projects} />}
    {displayRawList && <RawList projects={projects} />}
  </>);
};

export default App;
