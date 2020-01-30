const passport = require('passport');

module.exports = app => {
    //Google Auth
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback',
     passport.authenticate('google'),
     (req, res) => {
         res.redirect('/surveys')
     }
     )

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    //FaceBook Auth
    // app.get('/auth/facebook',
    //     passport.authenticate('facebook')
    // );

    // app.get('/auth/facebook/callback', passport.authenticate('facebook'))
};