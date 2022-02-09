// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import ListButton from './ListButton';
import AddProjectForm from './AddProjectForm';
import ProjectsList from './ProjectsList';
import { projectsData } from '../projects.js';
import axios from 'axios';

const App = () => {
  const [ projects, setProjects ] = useState(projectsData);
  const [ displayList, setDisplayList ] = useState(false);

  const addProject = e => {
    e.preventDefault();
    const { title, artist, genre, year } = e.target;
    const newProject = { title, artist, genre, year };
    for (const key in newProject)
      newProject[key] = newProject[key].value;
    // setProjects([ ...projects, newProject ]);
    axios.post('/addProject', newProject)
      .then(res => console.log(res));
  };

  // const getProjects = useEffect();

  return (<>
    <AddProjectForm handleSubmit={addProject} />
    <ListButton projects={projects} handleClick={() => setDisplayList(!displayList)} />
    {displayList && <ProjectsList projects={projects} />}
  </>);
};

export default App;
