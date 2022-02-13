import React from 'react';
import styled from 'styled-components';

const ListFormatButton = ({ handleClick, format }) => <Button onClick={handleClick}>{format === 'raw' ? 'Back' : 'Raw Data'}</Button>;

const Button = styled.button`
  margin: 15px;
`;

export default ListFormatButton;
