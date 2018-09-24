const express = require('express');
const router = express.Router();

// Controllers
const Account = require('../controllers/Account');
const Shop = require('../controllers/Shop');
const Product = require('../controllers/Product');
const Lineitem = require('../controllers/Lineitem');
const Order = require('../controllers/Order');
const Orderitem = require('../controllers/Orderitem');

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

// Product routes
router.route('/products')
    .get(Product.getProducts)
    .post(Product.createProduct)

router.route('/products/:productId')
    .get(Product.getSingleProduct)
    .put(Product.updateProduct)
    .delete(Product.deleteProduct)

// Line item routes
router.route('/products/:productId/lineItems')
    .get(Lineitem.getLineItems)
    .post(Lineitem.createLineItem)
router.route('/products/:productId/lineitems/:lineItemId')
    .get(Lineitem.getSingleLineItem)
    .put(Lineitem.updateLineItem)
    .delete(Lineitem.deleteLineItem)


// Order routes
router.route('/orders')
router.route('/orderitems');

// Exports
module.exports = router;
