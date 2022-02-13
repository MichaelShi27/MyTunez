import React from 'react';
import styled from 'styled-components';

const ListButton = ({ handleClick }) => <Button onClick={handleClick}>Projects</Button>;

const Button = styled.button`
  margin: 15px;
`;

export default ListButton;
