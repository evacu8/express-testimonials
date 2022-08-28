const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialController.getAll);

router.route('/testimonials/random').get(TestimonialController.getRandom);

router.route('/testimonials/:id').get(TestimonialController.getById);

router.route('/testimonials').post(TestimonialController.create);

router.route('/testimonials/:id').put(TestimonialController.update);

router.route('/testimonials/:id').delete(TestimonialController.delete);

module.exports = router;
