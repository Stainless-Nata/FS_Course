const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

//Google Auth
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
        async (accessToken, refreshToken, profile, done) => {

            const existingUser = await User.findOne({ googleId: profile.id })
            if (existingUser) {
                //already have record with the profile.id
                return done(null, existingUser);
            }
            
            //We don't have user with this profile.id and need to create one
            const user = await new User({ googleId: profile.id }).save()
            done(null, user);
        }
    )
);

//FaceBook Auth
// passport.use(
//     new facebookStrategy({
//         clientID: keys.faceBookClientID,
//         clientSecret: keys.faceBookClientSecret,
//         callbackURL: '/auth/facebook/callback'
//     },
//         (accessToken, refreshToken, profile, done) => {
//             console.log('access token: ', accessToken);
//             console.log('refresh token: ', refreshToken);
//             console.log('profile: ', profile);
//         }
//     )
// );