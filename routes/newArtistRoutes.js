const express = require('express');
const newArtistRouter = express.Router();
const Artist = require('../models/Artist');

newArtistRouter.get('/', (req, res) => {
  res.render('newArtist');
});

newArtistRouter.post('/', (req, res) => {
  let artistData = req.body;
  let query = artistData.artistName

  if(artistData.albumName != '') {
    Artist
      .findOneAndUpdate({ artistName: artistData.artistName }, { artistName: artistData.artistName, $addToSet: { albums: artistData.albumName }}, { upsert: true } )
      .then(savedArtist => {
        res.redirect('/artist');
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
     Artist
      .findOneAndUpdate({ artistName: artistData.artistName }, { artistName: artistData.artistName}, { upsert: true } )
      .then(savedArtist => {
        res.redirect('/artist');
      })
      .catch(err => {
        res.status(500).send(err);
      });   
  }
});

module.exports = newArtistRouter;