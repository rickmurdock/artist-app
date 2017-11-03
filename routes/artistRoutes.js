const express = require('express');
const artistRouter = express.Router();
const Artist = require('../models/Artist');

artistRouter.get('/', (req, res) => {
  //res.render('artist');
  Artist.find()
  .then(foundArtists => {
    res.render('artist', { performers: foundArtists});
  })
  .catch(err => {
    res.status(500).send(err);
  })

});

module.exports = artistRouter;