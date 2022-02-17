const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
// const controller = require('./controller.js');
const db = require('../database');
const { getProjects, addProject, getArtist } = require('./controller');
const PORT = 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const buildDir = path.resolve(__dirname + '/../build');
app.use( express.static(buildDir) );

// app.get('/', (req, res) => res.sendFile(buildIndexFile)); // we don't appear to actually need this line

app.get('/projects', getProjects);
app.post('/addProject', addProject);
app.get('/artists/:name', getArtist);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
