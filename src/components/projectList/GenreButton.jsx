import React from 'react';
import styled from 'styled-components';

const GenreButton = ({ handleClick }) => <Button onClick={handleClick}>Genre Data</Button>;

const Button = styled.button`
  margin: 15px;
`;

export default GenreButton;
