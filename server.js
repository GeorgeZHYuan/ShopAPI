const express = require('express');
const bodyParser = require('body-parser');

// Routes
const routes = require('./routes/api/router.js');

// Server
const app = express();
const port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection instance of Google cloud DB
const knex = require('./db/googleCloudDB');

// Routes
app.use('/api/v1', routes(knex));

app.get('/', (err, res) => {
    res.send('<h1>Shopify Developer Challenge API</h1>');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
