import React, { useState } from 'react';
import styled from 'styled-components';

const EditProjectForm = ({ handleSubmit, project }) => {
  const [ title, setTitle ] = useState(project.title);
  const [ artist, setArtist ] = useState(project.artist);
  const [ genre, setGenre ] = useState(project.genre);
  const [ releaseYear, setReleaseYear] = useState(project.releaseYear || 0);

  return (
    <FormWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <FieldWrapper>
          <label htmlFor="title">Project Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="artist">Artist: </label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={artist}
            onChange={e => setArtist(e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="genre">Genre: </label>
          <select id="genre" value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="rock">Rock</option>
            <option value="hip-hop">Hip-hop</option>
            <option value="electronic">Electronic</option>
            <option value="pop">Pop</option>
            <option value="other">Other</option>
          </select>
        </FieldWrapper>
        <FieldWrapper>
          <label htmlFor="releaseYear">Release Year: </label>
          <input
            type="text"
            id="releaseYear"
            name="releaseYear"
            value={releaseYear}
            onChange={e => setReleaseYear(e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper>
          <button type="submit">Save</button>
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
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 950px;
`;

const FieldWrapper = styled.span`
  margin: 10px;
`;

export default EditProjectForm;
