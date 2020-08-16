const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  ConnectDB = require('./db');

const config = require('./config');

const {port} = config;

const app = express();
// app.use(authen) check token
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('hello world');
});

app.get('/user', require('./modules/customers/users'));

app.use((req, res) => {
  res.status(404).json({message: 'ko co api nha con'});
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
