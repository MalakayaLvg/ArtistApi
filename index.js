const express = require("express");
const app = express()
const path = require('path');
const port = 3000
const mongoose = require('mongoose')
const dbURI = "mongodb://127.0.0.1:27017/artists";

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Artist API',
            version: '1.0.0',
            description: 'API pour gerer des artist, et leurs créations'
        },
        tags: [
            { name: 'Auth', description: 'Gestion de l’authentification' },
            { name: 'Artists', description: 'Gestion des artistes' },
            { name: 'Releases', description: 'Gestion des sorties (releases)' },
        ],
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Local server',
            },
            {
                url: 'https://artistapi.malakayalauvergnat.com',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


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
app.use(express.json());

app.use("/artist", artistRoutes);
app.use("/release", releaseRoutes);
app.use("", authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// localhost
app.listen(port, ()=>{
    console.log(`express is running on port ${port}`)
})

// réseau local
// app.listen(port,'0.0.0.0', ()=>{
//     console.log(`express is running at http://0.0.0.0:${port}`)
// })

