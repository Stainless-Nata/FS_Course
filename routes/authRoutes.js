const passport = require('passport');

module.exports = app => {
    //Google Auth
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

<<<<<<< HEAD
    app.get('/auth/google/callback',
     passport.authenticate('google'),
     (req, res) => {
         res.redirect('/surveys')
     }
     )

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
=======
    app.get('/auth/google/callback', passport.authenticate('google'))

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user)
>>>>>>> 877cc49506ec737f85115dd80879d29fce4f8683
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