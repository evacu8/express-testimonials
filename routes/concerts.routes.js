const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertController.getAll);

router.route('/concerts/random').get(ConcertController.getRandom);

router.route('/concerts/:id').get(ConcertController.getById);

router.route('/concerts').post(ConcertController.create);

router.route('/concerts/:id').put(ConcertController.update);

router.route('/concerts/:id').delete(ConcertController.delete);

module.exports = router;
