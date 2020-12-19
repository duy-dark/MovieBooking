const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  ConnectDB = require('./db'),
  passport = require('passport'),
  key = require('./config/keys.json'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  errorHandler = require('./modules/middleware/error.middleware');

const resFail = require('./responses/res-fail');
const verifyToken = require('./modules/middleware/auth.middleware');
const config = require('./config');

const {port} = config;

const app = express();
// app.use(authen) check token
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', verifyToken, (req, res) => {
  res.json(req.token_payload);
});

app.use('/api/user', require('./modules/customers/users'));
app.use('/api/admin', require('./modules/admin/users'));
app.use('/api/adminlogin', require('./modules/admin/login'));
app.use('/api/film', require('./modules/films'));
app.use('/api/film_comment', require('./modules/film_comments'));
app.use('/api/film_category', require('./modules/film_category'));
app.use('/api/film_schedule', require('./modules/film_schedules'));
app.use('/api/category', require('./modules/categories'));
app.use('/api/event', require('./modules/events'));
app.use('/api/event_info', require('./modules/event_infos'));

const {Authenticator, authenticate} = require('passport');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.web.client_id,
      clientSecret: key.web.client_secret,
      callbackURL: '/auth/google/callback'
    },

    (accessToken, refreshToken, profile, done) => {
      console.log('access_token', accessToken);
      console.log('refeshToken', refreshToken);
      console.log('profile', profile);
      console.log('email_address', profile._json.email);
      console.log('user name', profile.displayName);
      console.log('avatar', profile._json.picture);
      console.log('done', done);
      return done(null, profile);
    }
  )
);

// login google
app.get(
  '/auth/google',
  passport.authenticate(
    'google',

    {scope: ['https://www.googleapis.com/auth/userinfo.profile email openid']}
  )
);
const {google} = require('googleapis');
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

// log out google
app.get('/logout', (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect('https://google.com.vn');
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json(resFail());
});

// app.use() error

const startSever = async () => {
  app.listen(port, async () => {
    console.log(`QLBH API is running on port ${port} http://localhost:${port}`);
  });
};
startSever();

ConnectDB().then(() => {
  console.log('MongoDb connected');
});
