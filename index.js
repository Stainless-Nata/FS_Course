const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/biilingRoutes');
const surveygRoutes = require('./routes/surveyRoutes');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json())

app.use(
    cookieSession({
    //30 days in miliseconds = 30d * 24h * 60min * 60sec * 1000milisec = maxAge
        maxAge: 2592000000, 
        keys: [keys.cookieKey]
    })
);


app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);
surveygRoutes(app);

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}!`));