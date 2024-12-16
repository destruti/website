require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const connectDb = require('./server/config/db');

const app = express();
const PORT = process.env.PORT;

// Connect to DB
connectDb();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'primeiro_campeao_mundial',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));

// MIDDLEWARE
app.use(express.static('public'));

// middleware template engine
app.use(expressLayout)
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/route/main'));
app.use('/', require('./server/route/admin'));


app.listen(PORT, () => {
    console.log(`RUNNNIG SERVER ON ${PORT}`)
});