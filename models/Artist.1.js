const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
  artistName: {
    type: String,
    required: true,
    unique: true
  },
  albums: [{
    albumName : { 
      type: String
    }
  }]
});

module.exports = mongoose.model("Artist", artistSchema);