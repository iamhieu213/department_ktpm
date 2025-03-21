const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cookieParser = require('cookie-parser');
const connectDb = require('../backend/config/db');

//midlleware
app.use(express.json());
app.use(cookieParser());

//database init
connectDb(app);

//use api
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
})

app.use('/api',require('./routes/api'))
//error handle


module.exports = app;