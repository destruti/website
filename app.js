require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 5000 || process.env.PORT;

// MIDDLEWARE
app.use(express.static('public'));

// middleware template engine
app.use(expressLayout)
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/route/main'))

app.listen(PORT, () => {
    console.log(`RUNNNIG SERVER ON ${PORT}`)
});