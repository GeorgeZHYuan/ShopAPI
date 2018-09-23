const express = require('express');
const bodyParser = require('body-parser');

// Routes
const routes = require('./routes/api/router');

// Server
const app = express();
const port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to Google cloud DB
const Db = require('./db/googleCloudDB');
Db.connect();

// Routes
app.use('/api/v1', routes);

app.get('/', (err, res) => {
    res.send('<h1>Shopify Developer Challenge API</h1>');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
