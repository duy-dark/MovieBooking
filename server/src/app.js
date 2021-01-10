const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  ConnectDB = require('./db'),
  passport = require('passport'),
  key = require('./config/keys.json'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  errorHandler = require('./middlewares/errors.middleware');

const resFail = require('./responses/res-fail');
const verifyToken = require('./middlewares/auth.admin.middleware');
const config = require('./config');

const {port} = config;

const app = express();
const swaggerDocument = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use(authen) check token
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json('Hello world :)))');
});

app.use('/api/customer', require('./modules/customers'));
app.use('/api/admin', require('./modules/admins'));
app.use('/api/film', require('./modules/films'));
app.use('/api/film_comment', require('./modules/film_comments'));
// app.use('/api/film_category', require('./modules/old.film_category'));
app.use('/api/film_schedule', require('./modules/film_schedules'));
app.use('/api/category', require('./modules/categories'));
app.use('/api/event', require('./modules/events'));
app.use('/api/event_info', require('./modules/event_infos'));
app.use('/api/news', require('./modules/news'));
app.use('/api/notification', require('./modules/notifications'));
app.use('/api/ticket', require('./modules/tickets'));
// app.use('/api/ticket_queue', require('./modules/ticket_queues'));
app.use('/api/seat', require('./modules/seats'));
app.use('/api/theaters', require('./modules/theaters'));
app.use('/api/room', require('./modules/rooms'));
app.use('/api/permission', require('./modules/permissions'));
// app.use('/api/admin_permission', require('./modules/admins_permissions'));
app.use('/api/voucher', require('./modules/vouchers'));

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
    console.log(`QLBH API is running on port ${port}`);
  });
};
startSever();

ConnectDB().then(() => {
  console.log('MongoDb connected');
});
