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
    .get(Account.getSingleAccount)
    .put(Account.updateAccount)
    .delete(Account.deleteAccount)

// Shop routes
router.route('/accounts/:accountId/shops')
    .get(Shop.getShops)
    .post(Shop.createShop)

router.route('/accounts/:accountId/shops/:shopId')
    .get(Shop.getSingleShop)
    .put(Shop.updateShop)
    .delete(Shop.deleteShop)

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
