const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
var cors = require('cors');
const app = express();

const api = require('./api/route.js');
const APP_PORT = config.get('app.port');

// databse connection
mongoose.connect(config.get('mongo.uri'), { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// bodyParser, parses the request body to be a readable json format
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// check health
app.use('/ping', (req, res) => res.json('ok'));
app.use('/api/v1/', api);

// launch our backend into a port
app.listen(APP_PORT, () => console.log(`LISTENING ON PORT ${APP_PORT}`));