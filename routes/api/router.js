const express = require('express');
const router = express.Router();

module.exports = (knex) => {

    // Controllers
    const accounts = require('../controllers/Accounts')(knex);
    const shops = require('../controllers/Shops')(knex);
    const lineitems = require('../controllers/Lineitems')(knex);
    const orders = require('../controllers/Orders')(knex);
    const orderitems = require('../controllers/Orderitems')(knex);
    const transactions = require('../controllers/Transactions')(knex);
    const tests = require('../controllers/Tests')(knex);

    // Routes
    router.route('/accounts');
    router.route('/shops');
    router.route('/lineitems');
    router.route('/orders');
    router.route('/orderitems');
    router.route('/transactions');
    router.route('/tests/accounts')
        .get(tests.getAccounts);
    router.route('/tests/visits')
        .get(tests.getVisits);

    return router;
}
