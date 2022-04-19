const path = require('path');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const staticCache = require('koa-static-cache');
const catchError = require('./catchError');
const beautyRes = require('./beautyRes');

global.verifyToken = require('./verifyToken');
global.verifyMapAuth = require('./verifyMapAuth');

module.exports = function (app) {
  app.use(catchError());
  app.use(bodyParser());
  app.use(cors());
  app.use(
    staticCache(path.join(__dirname, '../../static'), {
      prefix: '/static/',
      preload: false,
      dynamic: true
    })
  );
  app.use(beautyRes());
};
