import React from 'react';
import styled from 'styled-components';

const ErrorMessage = ({ message }) => <Wrapper>Error: {message}</Wrapper>;

const Wrapper = styled.div`
  color: red;
  margin: 10px;
`;

export default ErrorMessage;
