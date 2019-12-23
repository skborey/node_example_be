const express = require('express');
const router = express.Router();

const Register = require('./auth/register');
const Login = require('./auth/login');
const Logout = require('./auth/logout');
const Auth = require('./auth/verify');
const User = require('./services/user');
const RestaurantService = require('./services/restaurant');
const CollectionService = require('./services/collection');
const CollaborationService = require('./services/collaboration');

/**
 * Authorization
 */
router.post('/register', Register);
router.post('/login', Login);
router.get('/logout',Auth.verifyToken, Logout);

/**
 * Users
 */
router.get('/user', Auth.verifyToken, User.getUser);
router.get('/user/assets', Auth.verifyToken, User.getUserAssets);

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
router.post('/collections/relation', Auth.verifyToken, CollectionService.addRestaurant);
router.delete('/collections/relation', Auth.verifyToken, CollectionService.removeRestaurant);
router.delete('/collections/:id', Auth.verifyToken, CollectionService.deleteCollectionById); // this order will effect to rounting relatin could be consider as :id

/**
 * Collaboration Api
 */
router.put('/collaborations', Auth.verifyToken, CollaborationService.addNewCollaboration);
router.post('/collaborations/rename', Auth.verifyToken, CollaborationService.renameCollaboration);
router.delete('/collaborations/:id', Auth.verifyToken, CollaborationService.deleteCollaboration);

module.exports = router;