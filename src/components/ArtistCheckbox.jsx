import React from 'react';
import styled from 'styled-components';

const ArtistCheckbox = () => (
  <Wrapper>
    <input type="checkbox" style={{ verticalAlign: 'middle', accentColor: 'blue' }} />
    <label>Include artists</label>
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #f2f2f2;
  padding: 12px 10px 10px;
  font-size: 10px;
  font-family: Helvetica, Arial, sans-serif;
`;

export default ArtistCheckbox;
