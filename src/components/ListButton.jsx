import React from 'react';
import styled from 'styled-components';

const ListButton = ({ projects, handleClick }) => (
  <Button onClick={handleClick}>
    View All Projects
  </Button>
);

const Button = styled.button`
  margin: 15px;
`;

export default ListButton;
