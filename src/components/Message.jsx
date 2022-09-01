import React from 'react';
import styled from 'styled-components';
import { colors } from './styles.js';

const Message = ({ message, projectsAdded, added, edited, deleted, saved, style }) => (
  added ? (
    <Wrapper $success={added}>
      Project added! You have added {projectsAdded} project{projectsAdded === 1 ? '' : 's'}.
    </Wrapper>
  ) :
  edited ? <Wrapper $success={edited}>Project successfully edited!</Wrapper> :
  deleted ? <Wrapper $success={deleted}>Project successfully deleted!</Wrapper> :
  saved ? <Wrapper $success={saved} style={style}>Saved!</Wrapper> :
  message ? <Wrapper style={style}>Error: {message}</Wrapper> :
  null
);

const Wrapper = styled.div`
  color: ${({ $success }) => $success ? colors.green : 'red'};
  margin: 10px;
  font-family: Helvetica, Arial, sans-serif;
`;

export default Message;
