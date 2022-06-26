// convertSpecialChars & convertMoreSpecialChars are also in src/helpers.js
const specialChars = {
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

const convertSpecialChars = (str, charMap = specialChars) => {
  const arr = [];
  for (const char of str)
    arr.push(charMap[char] ?? char);
  return arr.join('').toLowerCase();
};

const moreSpecialChars = {
  ...specialChars,
  ' ': '',
  '.': '',
  ',': '',
  '!': '',
  ':': '',
  '$': 's'
};

exports.convertMoreSpecialChars = str => convertSpecialChars(str, moreSpecialChars);

// replace smart apostrophes w/ straight ones
exports.replaceApostrophes = obj => {
  for (const key in obj) {
    const val = obj[key];
    const idx = val.indexOf('’');
    if (idx >= 0) {
      const split = val.split('');
      split.splice(idx, 1, "'");
      obj[key] = split.join('');
    }
  }
  return obj;
};
