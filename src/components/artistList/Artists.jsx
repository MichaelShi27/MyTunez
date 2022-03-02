import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledLink, Loading } from '../styles.js';
import { FixedSizeList as List } from 'react-window';

const Artists = ({ sortedArtists }) => {
  const [ loading, setLoading ] = useState(true);
  useEffect(() => setLoading(false), []);

  return loading ? <LoadingText>LOADING...</LoadingText> : (<>
    <Header>
      <TextWrapper $header={'true'} $type={'name'}>Name</TextWrapper>
      <TextWrapper $header={'true'} $type={'number'}># of Projects</TextWrapper>
    </Header>
    <List
      itemData={sortedArtists}
      height={600}
      width={510}
      itemCount={sortedArtists.length}
      itemSize={30}
      style={{ border: '1px solid gray', marginTop: '5px' }}
    >
      {({ data, index, style }) => { // following react-window rules
        const { name, projectCount } = data[index];
        return (
          <div style={style}>
            <Artist key={index}>
              <StyledLink to={`/artists/${name}`}>
                <TextWrapper $type={'name'}>{name}</TextWrapper>
              </StyledLink>
              <TextWrapper $type={'number'}>{projectCount}</TextWrapper>
            </Artist>
          </div>
        );
      }}
    </List>
  </>);
};

const LoadingText = styled(Loading)`
  margin: 50px 160px;
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
