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
router.get('/logout',Auth.verifyToken, Logout);

/**
 * Restaurant Api
 */
router.get('/restaurants', RestaurantService.getRestaurants);

/**
 * Collection Api
 */
router.get('/collections', Auth.verifyToken, CollectionService.getCollections);
router.put('/collections', Auth.verifyToken, CollectionService.addNewCollection);
router.post('/collections/rename', Auth.verifyToken, CollectionService.renameCollection);
router.post('/collections/relation', Auth.verifyToken, CollectionService.addRelation);
router.delete('/collections/relation', Auth.verifyToken, CollectionService.removeRelation);
router.delete('/collections/:id', Auth.verifyToken, CollectionService.deleteCollectionById); // this order will effect to rounting relatin could be consider as :id

module.exports = router;