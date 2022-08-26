import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Message from './Message';

const messageStyles = {
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  width: '300px'
};

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => navigate('/'), 4000);
    return () => clearTimeout(timeout);
  }, [ navigate ]);

  return (
    <div style={{ padding: '100px', fontSize: '20px', lineHeight: '40px' }}>
      <Message
        message={'page not found!\nRedirecting to Home...'}
        style={messageStyles}
      />
    </div>
  );
};

export default ErrorPage;
