import React from 'react';
import styled from 'styled-components';

const RawListButton = ({ handleClick }) => (
  <Button onClick={handleClick}>
    View Raw List
  </Button>
);

const Button = styled.button`
  margin: 15px;
`;

export default RawListButton;
