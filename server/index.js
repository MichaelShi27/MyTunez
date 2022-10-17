const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
// const controller = require('./controller.js');
require('../database');
const { 
  getAllProjects, addProject, getArtist, getProject, 
  editProject, deleteProject, addFavorite 
} = require('./controller');
const PORT = 8080;

const app = express();

app.use( express.urlencoded({ extended: true }) );
app.use(express.json());

const buildDir = path.resolve(__dirname + '/../build');
app.use( express.static(buildDir) );

// app.get('/', (req, res) => res.sendFile(buildIndexFile)); // we don't appear to actually need this line

app.get('/projects', getAllProjects);
app.post('/addProject', addProject);
app.get('/artists/:name(*)', getArtist);
app.get('/projects/:id', getProject);
app.patch('/editProject/:id', editProject);
app.patch('/addFavorite', addFavorite);
app.delete('/deleteProject/:id', deleteProject);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
