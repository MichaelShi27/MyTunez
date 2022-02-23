import React from 'react';
import styled from 'styled-components';

const SearchBar = ({ list, searchQuery, handleChange }) => (
  <FormWrapper>
    <form className="form">
      <label htmlFor="search">Search {list}:</label>
      <FieldWrapper>
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

const FormWrapper = styled.div`
  background-color: #f2f2f2;
  width: 270px;
  margin-left: 15px;
  padding: 10px;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 12px;
`;

const FieldWrapper = styled.span`
  margin: 10px;
`;

export default SearchBar;
