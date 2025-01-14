const express = require('express');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('auth/signup'); // Render the signup page
});

router.post('/register', async (req, res) => {
    let { username, password, email, role, gender } = req.body; // Destructure request body
    let user = new User({ username, email, gender, role });
    try {
        await User.register(user, password); // Register user
        res.redirect('/login'); // Redirect to login page after successful registration
    } catch (err) {
        req.flash('error', err.message); // Flash error message if registration fails
        res.redirect('/register'); // Redirect back to register page
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login'); // Render the login page
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login', // Redirect to login if authentication fails
    failureMessage: true // Include failure message
  }),
  function(req, res) {
    req.flash('success', `Welcome Back ${req.user.username}`); // Flash success message after login
    res.redirect('/products'); // Redirect to products page after successful login
  }
);

router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('success', 'Logged out successfully'); // Flash success message on logout
        res.redirect('/login'); // Redirect to login page after logout
    });
});

module.exports = router;


