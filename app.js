const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

app.use('./uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next ) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Accept, Authorization');
  if (req.methode === 'OPTIONS') {
    res.header('Access-Control-Allow-Methodes', 'PUT, POST, PATCH, DELETE');
    return res.status(200).json({})
  }
  next();
});

const db = 'mongodb://jensakrom:kDWkA84Mg5BNtpr@cluster0-shard-00-00-9hcoy.mongodb.net:27017,'
    + 'cluster0-shard-00-01-9hcoy.mongodb.net:27017,'
    + 'cluster0-shard-00-02-9hcoy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(db,
    {
      useNewUrlParser: true
    }).then(
    () => {
      console.log("Database connected");
    },
    err => {
      /** handle initial connection error */
      console.log("Error in database connection. ", err);
    });

mongoose.Promise = global.Promise;
//Route
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next ) => {
  const error = new Error('Not Found');   
  error.status = 404;
  next(error)

});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  })
});

module.exports = app;