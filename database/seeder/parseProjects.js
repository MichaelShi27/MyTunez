import { convertMoreSpecialChars } from '../../src/helpers';
const { projectTitles } = require('./projectTitles');

// const subgenres = {
//   rock: [ 'punk', 'singer-songwriter', 'other' ],
//   hipHop: [ 'trap', 'experimental', 'other' ],
//   pop: [ 'experimental', 'chart', 'R&B' ],
//   electronic: [ 'dance', 'experimental' ],
//   other: []
// };

const projects = [];

let title, artist;
let fakeDate = 0;
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

  let str = artist.toLowerCase(); // MongoDB doesn't allow case-insensitive sorting
  if (str.indexOf('the ') === 0)
    str = str.slice(4);

  const artistForSorting = convertMoreSpecialChars(str);

  // replace smart apostrophes w/ straight ones
  const obj = { artist, title, genre, artistForSorting };
  for (const key in obj) {
    const val = obj[key];
    const idx = val.indexOf('’');
    if (idx >= 0) {
      const split = val.split('');
      split.splice(idx, 1, "'");
      obj[key] = split.join('');
    }
  }

  projects.push({
    ...obj,
    dateAdded: `1900-01-${fakeDate}`,
    subgenre: '',
    releaseYear: 0
  });

  fakeDate++;
}


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
