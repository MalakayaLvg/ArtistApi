const express = require("express");
const app = express()
const port = 8000
const mongoose = require('mongoose')
const dbURI = "mongodb://127.0.0.1:27017/artists";

// const artistRoutes = require('./routes/artist');

mongoose.connect(dbURI)
    .then(()=>{
        console.log("mongoDB connected")
    })
    .catch((err)=>{
        console.error(err)
    })

app.listen(port, ()=>{
    console.log("express is running")
})

