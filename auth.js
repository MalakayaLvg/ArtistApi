const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.listen(8001, ()=>{
    console.log("route authentification test");
})



const users = [
    {
        username: "john",
        password: "password",
    }
]