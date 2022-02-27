import React from 'react';
import styled from 'styled-components';

const Message = ({ message, projectsAdded, added, edited, deleted }) => (
  added ? <Wrapper $success={added}>Project added! You have added {projectsAdded} project{projectsAdded === 1 ? '' : 's'}.</Wrapper> :
  edited ? <Wrapper $success={edited}>Project successfully edited!</Wrapper> :
  deleted ? <Wrapper $success={deleted}>Project successfully deleted!</Wrapper> :
  message ? <Wrapper message={message}>Error: {message}</Wrapper> :
  null
);

const Wrapper = styled.div`
  color: ${({ $success }) => $success ? '#0aca01' : 'red'};
  margin: 10px;
  font-family: Helvetica, Arial, sans-serif;
`;

export default Message;
