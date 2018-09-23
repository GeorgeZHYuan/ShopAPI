const express = require('express');
const router = express.Router();

// Controllers
const Account = require('../controllers/Account');
const Shop = require('../controllers/Shop');
const Lineitem = require('../controllers/Lineitem');
const Order = require('../controllers/Order');
const Orderitem = require('../controllers/Orderitem');
const Transaction = require('../controllers/Transaction');
const Test = require('../controllers/Test');

// Account routes
router.route('/accounts')
    .get(Account.getAccounts)
    .post(Account.createAccount)

router.route('/accounts/:accountId')
    .put(Account.updateAccount)
    .delete(Account.deleteAccount)

// Routes
router.route('/shops');
router.route('/lineitems');
router.route('/orders');
router.route('/orderitems');
router.route('/transactions');

// Test routes
router.route('/tests/accounts')
    .get(Test.getAccounts);

router.route('/tests/visits')
    .get(Test.getVisits);

// Exports
module.exports = router;
