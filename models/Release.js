const mongoose = require('mongoose');

const ReleaseSchema = new mongoose.Schema({
    title: { type: String, required: true},
    releaseDate: {type: Number, required: true},
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true},
})

const Release = mongoose.model('Release', ReleaseSchema);
module.exports = Release;