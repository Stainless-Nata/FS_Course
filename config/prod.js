//prod.js - production keys here
module.exports = {
    googleClientID: process.env.googleClientID,
    googleClientSecret: process.env.googleClientSecret,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY, //can be any string I want
   };
