const { projectTitles } = require('./projectTitles');

// const subgenres = {
//   rock: [ 'punk', 'singer-songwriter', 'other' ],
//   hipHop: [ 'trap', 'experimental', 'other' ],
//   pop: [ 'experimental', 'chart', 'R&B' ],
//   electronic: [ 'dance', 'experimental' ],
//   other: []
// };

const projects = [];

let title, artist, artistForSorting, fakeDate = 0;
for (const projectTitle of projectTitles) {
  const [ text, genreChar ] = projectTitle.split('***');

  const genre = (genreChar === undefined || genreChar === 'h') ? 'hip-hop' :
    genreChar === 'r' ? 'rock' :
    genreChar === 'p' ? 'pop' :
    genreChar === 'e' ? 'electronic' :
    'other';

  if (text.includes(' - ')) { // if we have moved to a new artist
    [ title, artist ] = text.split(' - ');
    fakeDate = 10; // fakeDate just helps keep the relative order of projects for each artist
  } else
    title = text;

  artistForSorting = artist.toLowerCase(); // MongoDB doesn't allow case-insensitive sorting
  if (artistForSorting.indexOf('the ') === 0)
    artistForSorting = artistForSorting.slice(4);

  projects.push({
    artist,
    title,
    genre,
    artistForSorting,
    dateAdded: `1900-01-${fakeDate}`,
    subgenre: '',
    releaseYear: 0
  });

  fakeDate++;
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

module.exports = projects;
