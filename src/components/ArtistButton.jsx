import React from 'react';
import styled from 'styled-components';

const ArtistButton = ({ handleClick }) => (
  <Button onClick={handleClick}>
    View Artists
  </Button>
);

const Button = styled.button`
  margin: 15px;
`;

export default ArtistButton;
