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
import GenreButton from './GenreButton';
import GenreData from './GenreData';
import Header from './Header';
import ArtistButton from './ArtistButton';
import ArtistList from './ArtistList';

const App = () => {
  const [ projects, setProjects ] = useState([]);
  const [ projectsAdded, setProjectsAdded ] = useState(0);
  const [ successfulSubmit, setSuccessfulSubmit ] = useState(0);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ displayList, setDisplayList ] = useState(false);
  const [ displayRawList, setDisplayRawList ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ displayGenres, setDisplayGenres ] = useState(false);
  const [ displayArtists, setDisplayArtists ] = useState(false);

  const validateInput = ({ title, artist, releaseYear }) => (
    (!title || !artist) ? 'Please fill in both the title and artist fields!' :
    isNaN(releaseYear) ? 'Please enter a number in the year field!' :
    (releaseYear > new Date().getYear() + 1900) ? 'Please enter a valid year!' : ''
  );

  const addProject = e => {
    e.preventDefault();
    setSuccessfulSubmit(false);

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

  const toggleListDisplays = e => {
    let clickedState, setClickedState, otherState, setOtherState;

    // const lists = [
    //   { state: displayList, func: setDisplayList, btnText: 'View All Projects' },
    //   { state: displayRawList, func: setDisplayRawList, btnText: 'View Raw List' },
    //   { state: displayArtists, func: setDisplayArtists, btnText: 'View All Projects' },
    // ];
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
    <Header />
    {displayMessage && <Message message={errorMessage} successfulSubmit={successfulSubmit} projectsAdded={projectsAdded} />}
    <AddProjectForm handleSubmit={addProject} />
    <ListButton handleClick={toggleListDisplays} />
    <RawListButton handleClick={toggleListDisplays} />
    <GenreButton handleClick={() => setDisplayGenres(!displayGenres)} />
    <ArtistButton handleClick={() => setDisplayArtists(!displayArtists)} />
    {displayGenres && <GenreData projects={projects} successfulSubmit={successfulSubmit} />}
    {displayList && <ProjectsList projects={projects} />}
    {displayRawList && <RawList projects={projects} />}
    {displayArtists && <ArtistList projects={projects} />}
  </>);
};

export default App;
