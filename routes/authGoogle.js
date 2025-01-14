const express = require('express');
const passport = require('passport');

const router = express.Router();

// Route to initiate Google login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
    (req, res) => {
        req.flash('success', `Welcome ${req.user.username}`);
        res.redirect('/products');
    }
);

module.exports = router;
