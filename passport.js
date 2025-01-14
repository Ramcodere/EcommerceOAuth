require('dotenv').config();


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');  // Import User model from models directory

passport.use(new GoogleStrategy({
  clientID: hwxSB5KljDQA0pSjQspGcIDe6dhXOC65,   // Use environment variables
  clientSecret: JQ6RO7PMsQLvs3_qCe-OO8QMcU9PExZX1vDcZF6J6Q4OEHGi8US1ua1bDD9Qc1r4,
  callbackURL: 'http://localhost:5000/auth/google/callback'  // Adjust for production
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user exists
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // Create new user if not found
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;
