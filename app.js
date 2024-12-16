require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDb = require('./server/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

// Connect to DB
connectDb();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// MIDDLEWARE
app.use(express.static('public'));

// middleware template engine
app.use(expressLayout)
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/route/main'));
app.use('/admin', require('./server/route/admin'));


app.listen(PORT, () => {
    console.log(`RUNNNIG SERVER ON ${PORT}`)
});