import React, { useState } from 'react';

const ListButton = ({ projects, handleClick }) => {
  return (
    <button onClick={handleClick}>
      Display List
    </button>
  );
};

export default ListButton;
