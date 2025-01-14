
const express = require('express');
const app = express(); // Instance
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi'); // API
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const dotenv = require('dotenv').config();

mongoose.set('strictQuery', true);
let url = 'mongodb+srv://Ram123:Ram321@cluster0.yedozvf.mongodb.net/E-CommerceretryWrites=true&w=majority';
mongoose
  .connect(url)
  .then(() => { console.log("DB connected") })
  .catch((err) => { console.log(err) });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

app.use(session(configSession));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Local Strategy for authentication
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'hwxSB5KljDQA0pSjQspGcIDe6dhXOC65',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'JQ6RO7PMsQLvs3_qCe-OO8QMcU9PExZX1vDcZF6J6Q4OEHGi8US1ua1bDD9Qc1r4',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
        });

        const savedUser = await newUser.save();
        done(null, savedUser);
    } catch (error) {
        done(error, null);
    }
}));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Home Page
app.get("/", (req, res) => {
    res.render("home");
});

// Routes
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);

// Google OAuth Routes
const authGoogleRoutes = require('./routes/authGoogle');
app.use(authGoogleRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
