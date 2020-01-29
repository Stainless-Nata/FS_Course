const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


const User = mongoose.model('users')

<<<<<<< HEAD
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
=======
passport.serializeUser((user, done) =>{
    done(null,user.id);
});

passport.deserializeUser((id, done) => {
   User.findById(id).then(user => {
       done(null, user)
   })
>>>>>>> 877cc49506ec737f85115dd80879d29fce4f8683
})

//Google Auth
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
<<<<<<< HEAD
        async (accessToken, refreshToken, profile, done) => {

            const existingUser = await User.findOne({ googleId: profile.id })
            if (existingUser) {
                //already have record with the profile.id
                return done(null, existingUser);
            }
            
            //We don't have user with this profile.id and need to create one
            const user = await new User({ googleId: profile.id }).save()
            done(null, user);
=======
        (accessToken, refreshToken, profile, done) => {

            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if (existingUser) {
                        //already have record with the profile.id
                        done(null, existingUser);
                    } else {
                        //We don't have user with this profile.id and need to create one
                        new User({ googleId: profile.id }).save()
                        .then( user =>  done(null, user));
                    }
                })
>>>>>>> 877cc49506ec737f85115dd80879d29fce4f8683
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