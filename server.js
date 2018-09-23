const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger.json');

// Routes
const router = require('./routes/router');

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);


app.get('/', (err, res) => {
    res.send('<h1>Shopify Developer Challenge API</h1>');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
