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

// const genreCounts = { rock: 0, hipHop: 0, pop: 0, electronic: 0, other: 0 };
// for (const project of project)
//   genreCounts[project.genre]++;
// console.log(genreCounts);

// // to find artists w/ most projects
// const seen = {};
// for (let i = 0; i < 15; i++) {
//   let curArtist, maxArtist;
//   let curCt = 0, maxCt = 0;
//   for (const project of projects) {
//     const { artist } = project;
//     if (seen[artist]) continue;
//     if (artist !== curArtist) {
//       curArtist = artist;
//       curCt = 0;
//     } else
//       curCt++;

//     if (curCt > maxCt) {
//       maxCt = curCt;
//       maxArtist = curArtist;
//     }
//   }
//   seen[maxArtist] = maxCt;
// }
// console.log(seen);

export default projects;
