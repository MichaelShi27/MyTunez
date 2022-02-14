import React from 'react';
import styled from 'styled-components';

const ProjectsButton = ({ handleClick }) => <Button onClick={handleClick}>Projects</Button>;

const Button = styled.button`
  margin: 15px;
  font-size: 18px;
`;

export default ProjectsButton;
