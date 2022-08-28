const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.route('/seats').get(SeatController.getAll);

router.route('/seats/random').get(SeatController.getRandom);

router.route('/seats/:id').get(SeatController.getById);

router.route('/seats').post(SeatController.create);

router.route('/seats/:id').put(SeatController.update);

router.route('/seats/:id').delete(SeatController.delete);

module.exports = router;
