import React, { useState } from 'react';
import ListButton from './ListButton';
import ProjectsList from './ProjectsList';
import projects from '../projects.js';

const App = () => {
  const [ clicked, setClicked ] = useState(false);
  return (<>
    <ListButton projects={projects} handleClick={() => setClicked(!clicked)} />
    {clicked && <ProjectsList projects={projects} />}
  </>);
};

export default App;
