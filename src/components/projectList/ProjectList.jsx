import React, { useState } from 'react';
import styled from 'styled-components';

import GenreData from './GenreData';
import NormalList from './NormalList';
import RawList from './RawList';

const ProjectList = ({ projects }) => {
  const [ displayGenres, setDisplayGenres ] = useState(false);
  const [ listFormat, setListFormat ] = useState('normal');
  const [ sortBy, setSortBy ] = useState('artist');
  const [ displayAllProjects, setDisplayAllProjects ] = useState(false);

  return (<>
    <Options>
      <TextWrapper>Total # of projects: {projects.length}</TextWrapper>
      {listFormat === 'normal' && (<>
        <Button onClick={() => setDisplayAllProjects(!displayAllProjects)}>
          {displayAllProjects ? 'Hide' : 'View'} All Projects
        </Button>
        <Button onClick={() => setDisplayGenres(!displayGenres)}>
          {displayGenres ? 'Hide' : 'View'} Genre Data
        </Button>
      </>)}
      {displayAllProjects && (<>
        <Button onClick={() => setListFormat(listFormat === 'normal' ? 'raw' : 'normal')}>
          {listFormat === 'raw' ? 'Back' : 'Raw Data'}
        </Button>
        {listFormat === 'normal' && (<>
          <label htmlFor="sortBy">Sort by: </label>
          <select id="sortBy" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="artist">Artist</option>
            <option value="recency">Recently Added</option>
          </select>
        </>)}
      </>)}
    </Options>
    {displayGenres && <GenreData projects={projects}/>}
    {displayAllProjects && (<>
      {listFormat === 'normal' && <NormalList projects={projects} sortBy={sortBy} />}
      {listFormat === 'raw' && <RawList projects={projects} />}
    </>)}
  </>);
};

const Options = styled.div`
  padding: 0 0 0 10px;
`;

const TextWrapper = styled.div`
  display: inline-block;
  margin: 0 10px;
`;

const Button = styled.button`
  margin: 15px;
`;

export default ProjectList;


// old toggleListFormat

    // let clickedState, setClickedState, otherState, setOtherState;

    // const lists = [
    //   { state: displayProjects, func: setDisplayProjects, btnText: 'View All Projects' },
    //   { state: displayRawList, func: setDisplayRawList, btnText: 'View Raw List' },
    //   { state: displayArtists, func: setDisplayArtists, btnText: 'View All Projects' },
    // ];
    // if (e.target.textContent === 'Back') {
    //   clickedState = listFormat;
    //   setClickedState = setDisplayNormalList;
    //   otherState = displayRawList;
    //   setOtherState = setDisplayRawList;
    // } else {
    //   clickedState = displayRawList;
    //   setClickedState = setDisplayRawList;
    //   otherState = displayNormalList;
    //   setOtherState = setDisplayNormalList;
    // }

    // setClickedState(!clickedState);
    // if (!displayNormalList && !displayRawList)
    //   return;
    // if (otherState === true)
    //   setOtherState(false);