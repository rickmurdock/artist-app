const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', function (req, res) {
  //res.send('Artist & Album App');
  res.render('index', { userName: 'Rick'});
});

module.exports = indexRouter;