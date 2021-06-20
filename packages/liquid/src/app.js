const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const { Liquid } = require('liquidjs');
const engine = new Liquid();

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.engine('liquid', engine.express());
app.set('view engine', 'liquid');

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Liquid',
    message: 'Hello there from Liquid!'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
