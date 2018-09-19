const express = require('express');
const bodyParser = require('body-parser');

const lineitems = require('./routes/api/lineitems');
const orders = require('./routes/api/orders');
const orderitems = require('./routes/api/orderitems');
const accounts = require('./routes/api/accounts');
const shops = require('./routes/api/shops');
const transactions = require('./routes/api/transactions');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use('api/v1/lineitems', lineitems);
app.use('api/v1/orders', orders);
app.use('api/v1/orderitems', orderitems);
app.use('api/v1/accouts', accounts);
app.use('api/v1/shops', shops);
app.use('api/v1/transactions', transactions);

app.get('/', (err, res) => {
    res.send('<h1>Shopify Developer Challenge API</h1>');
});


app.listen(port, () => console.log(`Server running on port ${port}`));
