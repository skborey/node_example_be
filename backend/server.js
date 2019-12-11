
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./respository/restaurant');
const config = require('./config.json');
var ObjectId = require('mongodb').ObjectID;
const defaultConfig = config.development;

const API_PORT = defaultConfig.app_port;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = defaultConfig.db_url;
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Get restaurants with query parames: ?name=res1
router.get('/restaurants', (req, res) => {

  var params = req.query;
  
  var condition = {};
  if (params.name) condition.name = params.name;
  if (params.startAfter) condition._id = { $gt: ObjectId(params.startAfter) }
  if (params.endBefore) condition._id = { $lt: ObjectId(params.endBefore) }

  Data.find( condition, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({
      success: true,
      data: data
    });
  }).limit(10).sort({_id: 1});
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));