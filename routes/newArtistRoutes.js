const express = require('express');
const newArtistRouter = express.Router();
const Artist = require('../models/Artist');

newArtistRouter.get('/', (req, res) => {
  res.render('newArtist');
  console.log('Entering New Artist');
});

newArtistRouter.post('/', (req, res) => {
  console.log('Hello from New Artist');
  console.log(req.body);

  let artistData = req.body;
  let newArtist = new Artist(artistData);
  //newArtist.albums.push({albumName: artistData.albumName})
  newArtist.albums.push(artistData.albumName)
  newArtist
    .save()
    .then(savedArtist => {
      res.redirect('/artist');
    })
    .catch(err => {
      res.status(500).send(err);
    });

});

module.exports = newArtistRouter;