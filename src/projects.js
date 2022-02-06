const { projectTitles } = require('./projectTitles');

const subgenres = {
  rock: [ 'punk', 'singer-songwriter', 'other' ],
  hipHop: [ 'trap', 'experimental', 'other' ],
  pop: [ 'experimental', 'chart', 'R&B' ],
  electronic: [ 'dance', 'experimental' ],
  other: []
};

const projects = [];

let title, artist;
for (let i = 0; i < projectTitles.length; i++) {
  const [ text, genreChar ] = projectTitles[i].split('***');

  const genre = genreChar === undefined || genreChar === 'h' ? 'hip-hop' :
    genreChar === 'r' ? 'rock' :
    genreChar === 'p' ? 'pop' :
    genreChar === 'e' ? 'electronic' :
    'other';

  if (text.includes(' - '))
    [ title, artist ] = text.split(' - ');
  else
    title = text;

  projects.push({
    artist,
    title,
    genre,
    subgenre: '',
    year: 0
  });
}

export default projects;
