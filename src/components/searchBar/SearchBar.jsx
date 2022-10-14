import React from 'react';
import styled from 'styled-components';

const SearchBar = ({ list, searchQuery, handleChange, style }) => (
  <FormWrapper $favorites={list === 'favorites'} style={style}>
    <form className="form">
      <label htmlFor="search">
        {list === 'favorites' ? `Add to Favorites:` : `Search ${list}:`}
      </label>
      <FieldWrapper>
        <InputField
          value={searchQuery}
          onChange={handleChange}
        />
      </FieldWrapper>
    </form>
  </FormWrapper>
);

const FormWrapper = styled.div`
  background-color: #f2f2f2;
  width: ${({ $favorites }) => $favorites ? '270px' : '260px'};
  margin-left: 15px;
  padding: 10px;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 12px;
`;

const FieldWrapper = styled.span`
  margin: 10px 0 10px 10px;
`;

const InputField = styled.input.attrs({
  type: "search",
  id: "search",
  name: "search"
})`
  &::-webkit-search-cancel-button {
    opacity: 50%;
  }
`;

export default SearchBar;
