const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    age :{
        type: Number,
        required: true,
    },
    releases : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Release'
    }
})

module.exports = mongoose.model('Artist', ArtistSchema);