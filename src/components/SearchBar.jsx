import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { Routes, Route, Link, useLocation } from 'react-router-dom';
// import axios from 'axios';

// import { Header, Button } from './styles.js';

const SearchBar = ({ list, searchQuery, handleChange }) => {
  return (
    <FormWrapper>
      <form className="form">
        <FieldWrapper>
          <label htmlFor="search">Search {list}:</label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchQuery}
            onChange={handleChange}
          />
        </FieldWrapper>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 12px;
`;

const FieldWrapper = styled.span`
  margin: 10px;
`;

export default SearchBar;
