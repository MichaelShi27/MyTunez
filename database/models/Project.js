const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  subgenre: String,
  year: { type: Number, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
