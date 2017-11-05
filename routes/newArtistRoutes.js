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
  console.log('Arist Name is ', artistData.artistName);

//
  let query = artistData.artistName
  
  Artist
    .findOneAndUpdate({ artistName: artistData.artistName }, { artistName: artistData.artistName, $addToSet: { albums: artistData.albumName }}, { upsert: true } )
    .then(savedArtist => {

      // if(artistData.albumName != ''){
      //   console.log('ALBUM ENTERED', artistData.albumName );
      //   Artist.update(
      //     { artistName: artistData.artistName },
      //     { $addToSet: { albums: artistData.albumName }}
      //   )


      // } else{
      //   console.log('ALUBUM BLANK----');
      // }
        
  

      res.redirect('/artist');
    })
    .catch(err => {
      res.status(500).send(err);
    });

  // let newArtist = new Artist(artistData);
  // newArtist.albums.push(artistData.albumName)
  // newArtist
  //   .save()
  //   .then(savedArtist => {
  //     res.redirect('/artist');
  //   })
  //   .catch(err => {
  //     res.status(500).send(err);
  //   });

});

module.exports = newArtistRouter;