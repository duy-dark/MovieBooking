const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  ConnectDB = require('./db'),
  errorHandler = require('./modules/middleware/error.middleware');

const resFail = require('./modules/response/res-fail');

const config = require('./config');

const {port} = config;

const app = express();
// app.use(authen) check token
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('hello world');
});

app.use('/user', require('./modules/customers/users'));
app.use('/login', require('./modules/admin/login'));

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
