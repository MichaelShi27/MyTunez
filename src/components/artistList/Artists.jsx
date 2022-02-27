import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledLink } from '../styles.js';

const Artists = ({ sortedArtists }) => {
  const [ loading, setLoading ] = useState(true);
  useEffect(() => setLoading(false), []);

  return loading ? <Loading>LOADING...</Loading> : (<>
    <Header>
      <TextWrapper $header={'true'} $type={'name'}>Name</TextWrapper>
      <TextWrapper $header={'true'} $type={'number'}># of Projects</TextWrapper>
    </Header>
    <ListContainer>
      {sortedArtists.map(({ name, projectCount }, idx) => (
        <Artist key={idx}>
          <StyledLink to={`/artists/${name}`}>
            <TextWrapper $type={'name'}>{name}</TextWrapper>
          </StyledLink>
          <TextWrapper $type={'number'}>{projectCount}</TextWrapper>
        </Artist>
      ))}
    </ListContainer>
  </>);
};

const Loading = styled.div`
  margin: 50px 160px;
  color: blue;
  font-size: 25px;
`;

const TextWrapper = styled.div`
  padding: 0 5px;
  display: inline-block;
  text-align: ${({ $type }) => $type === 'number' && 'center'};
  width: ${({ $type }) => (
    $type === 'name' ? '350px' :
    $type === 'number' ? '80px' :
    null
  )};
  background-color: ${({ $header }) => $header && '#e0e0e0'};
`;

const ListContainer = styled.div`
  border: 1px solid gray;
  width: 510px;
  max-height: 600px;
  overflow: auto;
  margin-top: 5px;
`;

const Artist = styled.div`
  margin: 3px;
  width: 480px;
  padding: 3px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 15px;
  border: 1px solid gray;
`;

const Header = styled(Artist)`
  font-family: Palatino, Lucida Console, serif;
  font-size: 13px;
  background-color: #e0e0e0;
  border: none;
  padding: 8px 8px 5px;
  width: 470px;
`;

export default Artists;
