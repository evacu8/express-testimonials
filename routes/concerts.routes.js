const express = require('express');
const router = express.Router();
const db = require('../db');
const { getById, randomId, randomItem } = require('../utils/utlis')

const concerts = db.concerts;

router.route('/concerts').get((req, res) => {
  res.json(concerts);
});

router.route('/concerts/random').get((req, res) => {
  res.json(getById(randomItem(concerts), concerts));
});

router.route('/concerts/:id').get((req, res) => {
  res.json(getById(+req.params.id, concerts));
});

router.route('/concerts').post((req, res) => {
  const bodyObj = {id: randomId(), ...req.body}
  concerts.push(bodyObj);
  res.json({ message: 'OK' })
});

router.route('/concerts/:id').put((req, res) => {
  const newData = req.body;
  const id = +req.params.id;
  const index = concerts.findIndex((item) => item.id === id);
  concerts[index] = { id: id, ...newData };
  res.json({ message: 'OK' })
});

router.route('/concerts/:id').delete((req, res) => {
  const id = +req.params.id;
  const index = concerts.findIndex((item) => item.id === id);
  concerts.splice(index, 1)
  res.json({ message: 'OK' })
});


module.exports = router;