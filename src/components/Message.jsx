import React from 'react';
import styled from 'styled-components';

const Message = ({ message }) => (
  <>{
    message
      ? <Wrapper message={message}>Error: {message}</Wrapper>
      : <Wrapper message={message}>Project added!</Wrapper>
  }</>
);

const Wrapper = styled.div`
  color: ${({ message }) => message ? 'red' : 'green'};
  margin: 10px;
`;

export default Message;
