const router = require('express').Router();
let Name = require('../models/name.model');

router.route('/').get((req, res) => {
  Name.find()
    .then(names => res.json(names))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;

  const newName = new Name({title});

  newName.save()
    .then(() => res.json('Name added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
