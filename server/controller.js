const Project = require('../database/models/Project');

exports.getAllProjects = (req, res) => {
  Project.find({})
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
    .catch(err => {
      if (err.message.indexOf('Cast to ObjectId failed') === 0)
        res.send('project not found');
      else
        console.log(err);
    });
};

exports.editProject = (req, res) => {
  const { params: { id }, body } = req;
  Project.updateOne({ _id: id }, { ...body })
    .then(({ modifiedCount }) => res.send(modifiedCount ? 'success' : 'duplicate input'))
    .catch(err => {
      if (err.code === 11000)
        res.send('duplicate input');
      else
        res.status(400).send(err);
    });
};

exports.deleteProject = (req, res) => {
  Project.deleteOne({ _id: req.params.id })
    .then(({ deletedCount }) => deletedCount === 1 && res.send('success'))
    .catch(console.log);
};

exports.addFavorite = (req, res) => {
  const { id, idx } = req.body;
  Project.findOneAndUpdate({ _id: id }, { favoritesIdx: idx })
    .then(newFavorite => res.send(newFavorite))
    .catch(console.log);
};

exports.removeFavorite = (req, res) => {
  const { id } = req.body;
  Project.findOneAndUpdate({ _id: id }, { favoritesIdx: -1 })
    .then(() => res.send('success'))
    .catch(console.log);
};
