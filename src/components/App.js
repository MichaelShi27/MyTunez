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

    axios.post('/addProject', newProject);
    setAddingNewProject(true);
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
    <AddProjectForm handleSubmit={addProject} />
    <ListButton projects={projects} handleClick={() => setDisplayList(!displayList)} />
    {displayList && <ProjectsList projects={projects} />}
  </>);
};

export default App;
