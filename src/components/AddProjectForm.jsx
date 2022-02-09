import React, { useState } from 'react';

const AddProjectForm = ({ handleSubmit }) => {
  const [ title, setTitle ] = useState('');
  const [ artist, setArtist ] = useState('');
  const [ genre, setGenre ] = useState('');
  const [ year, setYear ] = useState('');

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
      <input
        type="text"
        id="genre"
        name="genre"
        value={genre}
        onChange={e => setGenre(e.target.value)}
      />
      <label htmlFor="year">Release Year: </label>
      <input
        type="text"
        id="year"
        name="year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProjectForm;
