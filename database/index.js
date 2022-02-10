const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myTunez');

const db = mongoose.connection;
db.on('error', err => console.log('mongoose connection error:', err));
db.once('open', () => console.log('mongoose connected successfully'));

module.exports = db;
