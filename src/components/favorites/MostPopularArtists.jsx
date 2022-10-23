import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { StyledLink } from '../styles.js';
import { convertSlashes } from '../../helpers';

const MostPopularArtists = ({ favorites }) => {
  const projectCounts = {};
  for (const { artist } of favorites)
    projectCounts[artist] = 1 + (projectCounts[artist] || 0);

  const artists = [];
  for (const artist in projectCounts)
    if (projectCounts[artist] > 1)
      artists.push([ artist, projectCounts[artist] ]);

  artists.sort((a, b) => b[1] - a[1]);

  return (<>
    <br />
    <Header>
      <div style={{ display: 'inline-block', width: '20px' }}/>
      <TextWrapper $header={'true'} $type={'name'}>Name</TextWrapper>
      <TextWrapper $header={'true'} $type={'number'}># of Projects</TextWrapper>
    </Header>
    {artists.map(([ name, count ], idx) => (
      <Artist key={name}>
        <span>{idx + 1}. &nbsp; </span>
        <StyledLink to={`/artists/${convertSlashes(name)}`}>
          <TextWrapper $type={'name'}>{name}</TextWrapper>
        </StyledLink>
        <TextWrapper $type={'number'}>{count}</TextWrapper>
      </Artist>
    ))}
  </>);
};

const Artist = styled.div`
  margin: 3px;
  width: 500px;
  padding: 3px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
`;

const Header = styled(Artist)`
  font-family: Palatino, Lucida Console, serif;
  font-size: 13px;
  background-color: #e0e0e0;
  padding: 8px 8px 5px;
  width: 430px;
`;

const TextWrapper = styled.div`
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ $type }) => $type === 'number' && 'center'};
  width: ${({ $type }) => (
    $type === 'name' ? '300px' :
    $type === 'number' ? '80px' :
    null
  )};
  background-color: ${({ $header }) => $header && '#e0e0e0'};
`;

export default MostPopularArtists;
