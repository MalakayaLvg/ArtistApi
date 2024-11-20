const express = require("express");
const app = express()
const path = require('path');
const port = 8000
const mongoose = require('mongoose')
const dbURI = "mongodb://127.0.0.1:27017/artists";


const artistRoutes = require('./routes/artist');
const releaseRoutes = require('./routes/release');
const authRoutes = require("./routes/auth");

mongoose.connect(dbURI)
    .then(()=>{
        console.log("mongoDB connected")
    })
    .catch((err)=>{
        console.error(err)
    })

app.use(express.json())

app.use("/artist", artistRoutes);
app.use("/release", releaseRoutes);
app.use("", authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, ()=>{
    console.log("express is running")
})

