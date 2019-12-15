const express = require('express');
const router = express.Router();

const RestaurantService = require('./services/restaurant');

router.get('/restaurants', RestaurantService.getRestaurants);

module.exports = router;