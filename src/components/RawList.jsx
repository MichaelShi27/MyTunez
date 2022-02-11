import React from 'react';
import styled from 'styled-components';

const RawList = ({ projects }) => {
  const convertToList = projects => {
    const list = [];
    let curArtist;

    for (const project of projects) {
      const { artist, title } = project;
      let newTitle = title;
      if (artist !== curArtist) {
        newTitle += ` - ${artist}`;
        curArtist = artist;
      }
      list.push({ ...project, title: newTitle });
    }
    return list;
  };
  const list = convertToList(projects);

  return list.map(({ title, genre }, idx) => (
    <div key={idx}>
      <Project genre={genre}>{title}</Project>
    </div>
  ));
};

const Project = styled.span`
  background-color: ${({ genre }) => (
    genre === 'rock' ? 'rgb(255, 255, 49)' :
    genre === 'pop' ? 'rgb(255, 158, 242)' :
    genre === 'hip-hop' ? 'rgb(71, 250, 86);)' :
    genre === 'electronic' ? 'aqua' :
    'white'
  )};
`;

export default RawList;
