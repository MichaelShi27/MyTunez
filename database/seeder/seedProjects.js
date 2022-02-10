const Project = require('../models/Project');
const mongoose = require("mongoose");
const projectsData = require('./parseProjects');
// const dev = require("../config/dev"); // get your mongoose string

const projects = [];

for (const project of projectsData)
  projects.push(new Project(project));

mongoose
  .connect('mongodb://localhost/myTunez', { useNewUrlParser: true })
  .catch(err => console.log(err))
  .then(() => console.log('connected to db!'));

projects.forEach(async (project, idx) => {
  await project.save(() => {
    if (idx === projects.length - 1) {
      console.log("Done seeding data!");
      mongoose.disconnect();
    }
  });
});
