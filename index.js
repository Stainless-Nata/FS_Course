const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const dev = require('../config/dev')

mongoose.connect(dev.mongoURI);

const app = express();

app.use(
    cookieSession({
//30 days in miliseconds = 30d * 24h * 60min * 60sec * 1000milisec = maxAge
        maxAge: 2592000000, 
        keys: [dev.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}!`));