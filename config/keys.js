//keys.js
// if(process.env.NODE_ENV === 'production'){
//     //we are in production - return prod keys
//     module.exports = require('./prod')
// }else{
//     //we are in development - return dev keys
//     module.exports = require('./dev')
// }

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI ,
    cookieKey: process.env.COOKIE_KEY,
   };