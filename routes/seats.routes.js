const express = require('express');
const router = express.Router();
const db = require('../db');
const { getById, randomId, randomItem } = require('../utils/utlis')

const seats = db.seats;

router.route('/seats').get((req, res) => {
  res.json(seats);
});

router.route('/seats/random').get((req, res) => {
  res.json(getById(randomItem(seats), seats));
});

router.route('/seats/:id').get((req, res) => {
  res.json(getById(+req.params.id, seats));
});

router.route('/seats').post((req, res) => {
  const bodyObj = {id: randomId(), ...req.body}
  seats.push(bodyObj);
  res.json({ message: 'OK' })
});

router.route('/seats/:id').put((req, res) => {
  const newData = req.body;
  const id = +req.params.id;
  const index = seats.findIndex((item) => item.id === id);
  seats[index] = { id: id, ...newData };
  res.json({ message: 'OK' })
});

router.route('/seats/:id').delete((req, res) => {
  const id = +req.params.id;
  const index = seats.findIndex((item) => item.id === id);
  seats.splice(index, 1)
  res.json({ message: 'OK' })
});


module.exports = router;