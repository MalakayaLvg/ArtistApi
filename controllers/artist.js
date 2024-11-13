const Artist = require('../models/Artist');

async function index(req, res) {
    const artists = await Artist.find();
    res.send(artists);
}

async function show(req, res) {
    const artist = await Artist.findById(req.params.id);
    res.send(artist);
}

async function create(req, res) {
    const {...data} = req.body;

    if (!data.name || !data.age) {
        return res.status(400).send('Missing data for create new artist');
    }

    const newArtist = await Artist.create({...data});
    res.status(201).send({ message: 'New artist created successfully' });
}

async function remove(req, res) {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (artist) {
        res.send({ message: 'Artist deleted successfully' });
    } else {
        res.status(404).send({ error: 'Artist not found' });
    }
}

async function update(req, res) {

    const { ...data } = req.body;
    const artist = await Artist.findByIdAndUpdate(req.params.id, data, { new: true });
    if (artist) {
        res.status(201).send({ message: 'Artist updated successfully' });
    } else {
        res.status(404).send({ error: 'Artist not found' });
    }

}

module.exports = {index, show, create, remove, update};