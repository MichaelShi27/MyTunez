const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  subgenre: String,
  dateAdded: { type: Date, required: true },
  artistForSorting: { type: String, required: true },
  releaseYear: Number,
  favoritesIdx: Number
});

projectSchema.index({ artist: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('Project', projectSchema);
