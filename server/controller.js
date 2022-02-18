const Project = require('../database/models/Project');

exports.getAllProjects = (req, res) => {
  Project
    .find({})
    .sort({ artistForSorting: 1, dateAdded: 1 })
    .then(projects => res.send(projects));
};

exports.addProject = (req, res) => {
  new Project(req.body)
    .save()
    .then(() => res.send('success'))
    .catch(err => {
      if (err.code === 11000)
        res.send('duplicate input');
      else
        res.status(400).send(err);
    });
};

exports.getArtist = (req, res) => {
  const { name } = req.params;
  Project.find({ artist: name })
    .sort({ dateAdded: 1 })
    .then(projects => res.send(projects));
};

exports.getProject = (req, res) => {
  const { id } = req.params;
  Project.find({ _id: id })
    .then(project => res.send(project));
};

// exports.addProject = (req, res) => Project.create(
//   req.body,
//   (err, data) => err ? console.log(err) : res.send(data)
// );

// exports.edit = (req, res) => Project.updateOne(
//   { _id: req.body.id },
//   req.body,
//   (err, data) => err ? console.log(err) : res.send(data)
// );

// exports.delete = (req, res) => {
//   Project.deleteOne({ _id: req.body }, (err, deleted) => {
//     err ? console.log(err) : console.log(`DELETED: ${deleted}`);
//   });
// };
