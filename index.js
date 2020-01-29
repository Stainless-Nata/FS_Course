const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
<<<<<<< HEAD
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/biilingRoutes');
=======
const authRoutes = require('./routes/authRoutes');
>>>>>>> 877cc49506ec737f85115dd80879d29fce4f8683
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();
<<<<<<< HEAD
app.use(bodyParser.json())
=======
>>>>>>> 877cc49506ec737f85115dd80879d29fce4f8683

app.use(
    cookieSession({
//30 days in miliseconds = 30d * 24h * 60min * 60sec * 1000milisec = maxAge
        maxAge: 2592000000, 
        keys: [keys.cookieKey]
    })
);

<<<<<<< HEAD

=======
>>>>>>> 877cc49506ec737f85115dd80879d29fce4f8683
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
<<<<<<< HEAD
billingRoutes(app)

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
=======

>>>>>>> 877cc49506ec737f85115dd80879d29fce4f8683

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}!`));