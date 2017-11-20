const express = require('express');
const newArtistRouter = express.Router();
const Artist = require('../models/Artist');

newArtistRouter.get('/', (req, res) => {
  res.render('newArtist');
});

newArtistRouter.post('/', (req, res) => {
  let artistData = req.body;
  let artist = artistData.artistName;
  let album = artistData.albumName.replace(/,/g, " ");

  if(artistData.albumName != '') {
    Artist
      .findOneAndUpdate({ artistName: artist }, { artistName: artist, $addToSet: { albums: album }}, { upsert: true } )
      .then(savedArtist => {
        res.redirect('/artist');
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
     Artist
      .findOneAndUpdate({ artistName: artist }, { artistName: artist }, { upsert: true } )
      .then(savedArtist => {
        res.redirect('/artist');
      })
      .catch(err => {
        res.status(500).send(err);
      });   
  }
});

module.exports = newArtistRouter;