const express = require('express');
const router = express.Router();
const db = require('../db');
const { getById, randomId, randomItem } = require('../utils/utlis')

const testimonials = db.testimonials;

router.route('/testimonials').get((req, res) => {
  res.json(testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(getById(randomItem(testimonials), testimonials));
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(getById(+req.params.id, testimonials));
});

router.route('/testimonials').post((req, res) => {
  const bodyObj = {id: randomId(), ...req.body}
  testimonials.push(bodyObj);
  res.json({ message: 'OK' })
});

router.route('/testimonials/:id').put((req, res) => {
  const newData = req.body;
  const id = +req.params.id;
  const index = testimonials.findIndex((item) => item.id === id);
  testimonials[index] = { id: id, ...newData };
  res.json({ message: 'OK' })
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = +req.params.id;
  const index = testimonials.findIndex((item) => item.id === id);
  testimonials.splice(index, 1)
  res.json({ message: 'OK' })
});


module.exports = router;