import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Message = ({ message, projectsAdded, successfulSubmit }) => {
  // const [ display, setDisplay ] = useState(true);
  // useEffect(() => {
  //   const timeout = setTimeout(() => setDisplay(false), 10000);
  //   return () => clearTimeout(timeout);
  // }, [ message, projectsAdded ]);

  // if (!display)
  //   return null;
  if (successfulSubmit)
    return <Wrapper successfulSubmit={successfulSubmit}>Project added! You have added {projectsAdded} project{projectsAdded === 1 ? '' : 's'}.</Wrapper>;
  else if (message)
    return <Wrapper message={message}>Error: {message}</Wrapper>;
  else
    return null;
};

const Wrapper = styled.div`
  color: ${({ successfulSubmit }) => successfulSubmit ? 'green' : 'red'};
  margin: 10px;
`;

export default Message;
