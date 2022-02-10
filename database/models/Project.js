const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  subgenre: String,
  dateAdded: { type: Date, required: true },
  artistForSorting: { type: String, required: true },
  releaseYear: { type: Number }
});

module.exports = mongoose.model('Project', projectSchema);
