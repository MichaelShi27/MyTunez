import React from 'react';
import styled from 'styled-components';

const ArtistButton = ({ handleClick }) => <Button onClick={handleClick}>Artists</Button>;

const Button = styled.button`
  margin: 15px;
`;

export default ArtistButton;
