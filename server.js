const express = require('express');
const bodyParser = require('body-parser');

// Routes
const lineitems = require('./routes/api/lineitems');
const orders = require('./routes/api/orders');
const orderitems = require('./routes/api/orderitems');
const accounts = require('./routes/api/accounts');
const shops = require('./routes/api/shops');
const transactions = require('./routes/api/transactions');
const tests = require('./routes/api/tests');

// Server
const app = express();
const port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Google cloud DB
const knex = require('./db/googleCloudDB');

// Ues routes
app.use('/api/v1/lineitems', lineitems(knex));
app.use('/api/v1/orders', orders(knex));
app.use('/api/v1/orderitems', orderitems(knex));
app.use('/api/v1/accouts', accounts(knex));
app.use('/api/v1/shops', shops(knex));
app.use('/api/v1/transactions', transactions(knex));
app.use('/api/v1/tests', tests(knex));

app.get('/', (err, res) => {
    res.send('<h1>Shopify Developer Challenge API</h1>');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
