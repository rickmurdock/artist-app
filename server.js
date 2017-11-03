const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Artist = require('./models/Artist');
const indexRouter = require('./routes/indexRoutes');
const artistRouter = require('./routes/artistRoutes');
const newArtistRouter = require('./routes/newArtistRoutes');
const app = express();
const dbURL = "mongodb://localhost:27017/artists";

// RENDER ENGINE
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// MIDDLEWARE
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DB CONNECTION
mongoose.connect(dbURL).then(function(err, db) {
  if (err) {
    console.log("error", err);
  }
  console.log("connected to artists DB.");
});

// ROUTES
app.use('/', indexRouter);
app.use('/artist', artistRouter);
app.use('/newArtist', newArtistRouter);

// LISTENER
app.listen(3000, function () {
  console.log('Successfully started artist application!');
})