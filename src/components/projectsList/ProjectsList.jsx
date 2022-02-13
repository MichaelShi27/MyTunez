import React, { useState } from 'react';
import styled from 'styled-components';

import GenreButton from './GenreButton';
import GenreData from './GenreData';
import ListFormatButton from './ListFormatButton';
import NormalList from './NormalList';
import RawList from './RawList';

const ProjectsList = ({ projects }) => {
  const [ displayGenres, setDisplayGenres ] = useState(false);
  const [ displayNormalList, setDisplayNormalList ] = useState(true);
  const [ displayRawList, setDisplayRawList ] = useState(false);

  const toggleListFormat = e => {
    let clickedState, setClickedState, otherState, setOtherState;

    // const lists = [
    //   { state: displayProjects, func: setDisplayProjects, btnText: 'View All Projects' },
    //   { state: displayRawList, func: setDisplayRawList, btnText: 'View Raw List' },
    //   { state: displayArtists, func: setDisplayArtists, btnText: 'View All Projects' },
    // ];
    if (e.target.textContent === 'Back') {
      clickedState = displayNormalList;
      setClickedState = setDisplayNormalList;
      otherState = displayRawList;
      setOtherState = setDisplayRawList;
    } else {
      clickedState = displayRawList;
      setClickedState = setDisplayRawList;
      otherState = displayNormalList;
      setOtherState = setDisplayNormalList;
    }

    setClickedState(!clickedState);
    if (!displayNormalList && !displayRawList)
      return;
    if (otherState === true)
      setOtherState(false);
  };

  return (<>
    <Options>
      <TextWrapper>Total # of projects: {projects.length}</TextWrapper>
      <GenreButton handleClick={() => setDisplayGenres(!displayGenres)} />
      <ListFormatButton handleClick={toggleListFormat} format={displayNormalList ? 'normal' : 'raw'} />
    </Options>
    {displayGenres && <GenreData projects={projects}/>}
    {displayNormalList && <NormalList projects={projects} />}
    {displayRawList && <RawList projects={projects} />}
  </>);
};

const Options = styled.div`
  border: 1px solid red;
  padding: 0 0 0 10px;
`;

const TextWrapper = styled.div`
  display: inline-block;
  margin: 0 10px;
`;

export default ProjectsList;
