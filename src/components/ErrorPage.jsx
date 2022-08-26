import React from 'react';
import styled from 'styled-components';

import Message from './Message';

const messageStyles = {
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  width: '300px'
};

const ErrorPage = ({ list, searchQuery, handleChange }) => (
  <div style={{ padding: '80px', fontSize: '20px' }}>
    <Message message={'Page not found!'} style={messageStyles} />
  </div>
);

export default ErrorPage;
