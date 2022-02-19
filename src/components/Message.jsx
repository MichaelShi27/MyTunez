import React from 'react';
import styled from 'styled-components';

const Message = ({ message, projectsAdded, submit, edit, deleted }) => {
  if (submit)
    return <Wrapper $success={submit}>Project added! You have added {projectsAdded} project{projectsAdded === 1 ? '' : 's'}.</Wrapper>;
  if (edit)
    return <Wrapper $success={edit}>Project successfully edited!</Wrapper>;
  if (deleted)
    return <Wrapper $success={deleted}>Project successfully deleted!</Wrapper>;
  if (message)
    return <Wrapper message={message}>Error: {message}</Wrapper>;
  return null;
};

const Wrapper = styled.div`
  color: ${({ $success }) => $success ? '#0aca01' : 'red'};
  margin: 10px;
  font-family: Helvetica, Arial, sans-serif;
`;

export default Message;
