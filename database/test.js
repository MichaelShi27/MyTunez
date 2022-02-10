const Project = require('./models/Project');
const mongoose = require("mongoose");

mongoose
  .connect('mongodb://localhost/myTunez', { useNewUrlParser: true })
  .catch(err => console.log(err))
  .then(() => console.log('connected to db!'));



// // to delete the db
// const db = mongoose.connection;
// db.dropDatabase().then(() => console.log('dropped!'));
// const checkIfCleared = async () => {
//   const projects = await Project.find({});
//   console.log(projects[0], projects.length);
// };
// checkIfCleared();

// // to clear test projects
// const testArtists = [ '00', 'aa' ];
// for (const artist of testArtists)
//   Project.deleteMany({ artist })
//     .then(console.log);

// // to find by artist
// const artist = 'Future';
// Project.find({ artist })
//   .then(console.log);
