const validateInput = ({ title, artist, releaseYear }) => (
  (!title || !artist) ? 'Please fill in both the title and artist fields!' :
  isNaN(releaseYear) ? 'Please enter a number in the year field!' :
  (releaseYear > new Date().getYear() + 1900) ? 'Please enter a valid year!' : ''
);

const wrangleInput = projectData => {
  for (const key in projectData)
    if (key !== 'dateAdded')
      projectData[key] = projectData[key].value;

  let str = projectData.artist.toLowerCase(); // MongoDB doesn't allow case-insensitive sorting
  if (str.indexOf('the ') === 0)
    str = str.slice(4);

  const specialChars = {
    ' ': '',
    '.': '',
    ',': '',
    '!': '',
    ':': '',
    '$': 's',
    'ñ': 'n',
    'ä': 'a',
    'á': 'a',
    'å': 'a',
    'ë': 'e',
    'é': 'e',
    'ï': 'i',
    'í': 'i',
    'ö': 'o',
    'ó': 'o',
    'ø': 'o',
    'ü': 'u',
    'ú': 'u'
  };
  const artistForSorting = [];
  for (const char of str) {
    const charForSorting = specialChars[char];
    artistForSorting.push(charForSorting === undefined ? char : charForSorting);
  }

  projectData.artistForSorting = artistForSorting.join('');
};

export { validateInput, wrangleInput };
