const Project = require('../../database/models/Project');

exports.getProjects = (req, res) => {
  Project
    .find({})
    .sort({ artistForSorting: 1, dateAdded: 1 })
    .then(projects => res.send(projects));
};

exports.addProject = (req, res) => new Project(req.body).save();

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
