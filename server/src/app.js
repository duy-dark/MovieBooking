const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  ConnectDB = require('./db'),
  passport = require('passport'),
  errorHandler = require('./middlewares/errors.middleware'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  resFail = require('./responses/res-fail'),
  config = require('./config');

const {port} = config;

const app = express();
// app.use(authen) check token
app.use(bodyParser.json());
app.use(cookieParser('login123123'));
app.use(
  session({
    secret: 'Insert randomized text here',
    resave: false,
    saveUninitialized: false
  })
);
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

ConnectDB()
  .then(() => {
    console.log('MongoDb connected');
    startSever();
  })
  .catch((err) => {
    console.log('err: ', err);
  });
