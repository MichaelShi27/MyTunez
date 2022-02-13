import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Message = ({ message, projectsAdded }) => {
  const [ display, setDisplay ] = useState(true);
  // useEffect(() => {
  //   const timeout = setTimeout(() => setDisplay(false), 5000);
  //   return () => clearTimeout(timeout);
  // }, []);

  // console.log(display, message);
  if (!display)
    return null;
  return (
    <>{
      message === 'success'
        ? <Wrapper message={message}>Project added! You have added {projectsAdded} project{projectsAdded === 1 ? '' : 's'}.</Wrapper>
        : <Wrapper message={message}>Error: {message}</Wrapper>
    }</>
  );
};

const Wrapper = styled.div`
  color: ${({ message }) => message === 'success' ? 'green' : 'red'};
  margin: 10px;
`;

export default Message;
