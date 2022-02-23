//initial configuration for express server
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const personRoutes = require('./routes/personRoutes')


//read json
app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json());

//api routes
app.use('/person', personRoutes)
app.use('/', personRoutes)

//set a port and connect with mongoose listening on port 3000
const DB_USER= process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@luckcluster.t1xjq.mongodb.net/bancocrud?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000);
    })
    .catch((err) => {
        console.error('Deu ruim', err)
    })
