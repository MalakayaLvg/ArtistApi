const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name :{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    age :{
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
})

module.exports = mongoose.model('Artist', ArtistSchema);