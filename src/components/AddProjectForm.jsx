import React, { useState } from 'react';

const AddProjectForm = ({ handleSubmit }) => {
  const [ title, setTitle ] = useState('');
  const [ artist, setArtist ] = useState('');
  const [ genre, setGenre ] = useState('');
  const [ releaseYear, setReleaseYear] = useState('');

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="title">Project Title: </label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor="artist">Artist: </label>
      <input
        type="text"
        id="artist"
        name="artist"
        value={artist}
        onChange={e => setArtist(e.target.value)}
      />
      <label htmlFor="genre">Genre: </label>
      <select
        id="genre"
        value={genre}
        onChange={e => setGenre(e.target.value)}
      >
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
        <option value="hip-hop">Hip-hop</option>
        <option value="electronic">Electronic</option>
        <option value="other">Other</option>
      </select>
      <label htmlFor="releaseYear">Release Year: </label>
      <input
        type="text"
        id="releaseYear"
        name="releaseYear"
        value={releaseYear}
        onChange={e => setReleaseYear(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProjectForm;
