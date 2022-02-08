import React, { useState } from 'react';

const ProjectsList = ({ projects }) => {
  const convertToList = projects => {
    const list = [];
    let curArtist;

    for (const project of projects) {
      const { artist } = project;
      if (artist !== curArtist) {
        project.title += ` - ${artist}`;
        curArtist = artist;
      }
      list.push(project);
    }
    return list;
  };
  const list = convertToList(projects);

  return list.map(({ title, genre }, idx) => (
    <div key={idx} >
      <span className={genre}>{title}</span>
    </div>
  ));
};

export default ProjectsList;
