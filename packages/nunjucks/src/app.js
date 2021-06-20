const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const nunjucks = require('nunjucks');
require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  noCache: false,
  express: app
});

app.get('/', (req, res) => {
  res.render('index.njk', {
    message: 'Hello there from Nunjucks!',
    layout: 'layout.njk',
    title: 'Nunjucks'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
