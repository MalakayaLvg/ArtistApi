const Release = require("../models/Release");
const Artist = require("../models/Artist")

async function index(req,res){
    const releases = await Release.find().populate('artist');
    res.send(releases)
}

async function addRelease(req,res){
    const { artistId } = req.params;
    const { title, releaseDate } = req.body;
    console.log(artistId)
    const artist = await Artist.findById(artistId);

    const release = new Release({
        title,
        releaseDate,
        artist: artistId,
    });
    console.log(release)
    const savedRelease = await release.save();
    res.send(savedRelease,artist);

}

async function remove(req,res){
    const release = Release.findByIdAndDelete(req.params.id)
    if (release){
        res.send("release deleted successfully");
    } else {
        res.send("release not found ");
    }
}

async function update(req,res){
    const {...data} = req.body;
    console.log(data)
    const release = Release.findByIdAndUpdate(req.params.id, data, {new: true}).lean();
    console.log(release)
    if (release) {
        res.send({message:"release update successfully"})
    } else {
        res.status(404).send({error:"release update failed"})
    }


}

module.exports = {index,addRelease,remove,update}