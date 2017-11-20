const express = require('express');
const indexRouter = express.Router();
const Artist = require('../models/Artist');

indexRouter.get('/', function (req, res) {
  let countString = '';
  let totalAlbums = '';

  Artist.aggregate({$unwind: '$albums'}, {$group: { _id: null, count: { $sum: 1 }}} )
    .then(sum => {
      totalAlbums = (sum.length ? sum[0].count : 0);
    });

  Artist
    .count({}, function(err, count) {})
    .then(count => {
      countString = 'Collection Contains ' + count + (count == 1 ? ' Artist' : ' Artists') + ' and ' + totalAlbums + (totalAlbums == 1 ? ' Album' : ' Albums');
    res.render('index', { artistCount: countString })
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

module.exports = indexRouter;