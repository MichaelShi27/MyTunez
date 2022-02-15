import React from 'react';
import styled from 'styled-components';

const Message = ({ message, projectsAdded, successfulSubmit }) => {
  if (successfulSubmit)
    return <Wrapper successfulSubmit={successfulSubmit}>Project added! You have added {projectsAdded} project{projectsAdded === 1 ? '' : 's'}.</Wrapper>;
  if (message)
    return <Wrapper message={message}>Error: {message}</Wrapper>;
  return null;
};

const Wrapper = styled.div`
  color: ${({ successfulSubmit }) => successfulSubmit ? '#0aca01' : 'red'};
  margin: 10px;
  font-family: Helvetica, Arial, sans-serif;
`;

export default Message;
