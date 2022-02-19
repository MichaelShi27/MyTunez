const Project = require('../database/models/Project');

exports.getAllProjects = (req, res) => {
  Project
    .find({})
    .sort({ artistForSorting: 1, dateAdded: 1 })
    .then(projects => res.send(projects))
    .catch(console.log);
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
  Project.find({ artist: req.params.name })
    .sort({ dateAdded: 1 })
    .then(projects => res.send(projects))
    .catch(console.log);
};

exports.getProject = (req, res) => {
  Project.find({ _id: req.params.id })
    .then(project => res.send(project))
    .catch(console.log);
};

exports.editProject = (req, res) => {
  const { params: { id }, body } = req;
  Project.updateOne({ _id: id }, { ...body })
    .then(({ modifiedCount }) => res.send(modifiedCount ? 'success' : 'duplicate input'))
    .catch(console.log);
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
