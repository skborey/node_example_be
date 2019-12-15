const express = require('express');
const router = express.Router();

const Login = require('./auth/login');
const Authorization = require('./auth/verify');
const RestaurantService = require('./services/restaurant');
const CollectionService = require('./services/collection');

/**
 * Authorization
 */
router.post('/login', Login);

/**
 * Restaurant Api
 */
router.get('/restaurants', RestaurantService.getRestaurants);

/**
 * Collection Api
 */
router.get('/collections', Authorization.verifyToken, CollectionService.getCollections);

module.exports = router;