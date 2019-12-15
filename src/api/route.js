const express = require('express');
const router = express.Router();

const RestaurantService = require('./services/restaurant');
const CollectionService = require('./services/collection');

/**
 * Restaurant Api
 */
router.get('/restaurants', RestaurantService.getRestaurants);

/**
 * Collection Api
 */
router.get('/collections', CollectionService.getCollections);

module.exports = router;