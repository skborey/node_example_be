const express = require('express');
const router = express.Router();

const Register = require('./auth/register');
const Login = require('./auth/login');
const Logout = require('./auth/logout');
const Auth = require('./auth/verify');
const RestaurantService = require('./services/restaurant');
const CollectionService = require('./services/collection');

/**
 * Authorization
 */
router.post('/register', Register);
router.post('/login', Login);
router.post('/logout',Auth.verifyToken, Logout);

/**
 * Restaurant Api
 */
router.get('/restaurants', RestaurantService.getRestaurants);

/**
 * Collection Api
 */
router.get('/collections', Auth.verifyToken, CollectionService.getCollections);

module.exports = router;