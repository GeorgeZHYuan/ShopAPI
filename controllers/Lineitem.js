const express = require('express');
const router = express.Router();
const Db = require('../db/googleCloudDB');

// Search lineItems
const getLineItems = (req, res, next) => {
    console.log('getting LineItems');

    // validation
    let productId = req.params.productId;
    let isValid = true;
    let errors = {};

    // Check for selections and filtering
    let select = req.query.select || [];
    let idFilter = (req.query.id) ? {id:req.query.id} : {};
    let shopIdFilter = req.query.shopId ? {shopid: req.query.shopId} : {};
    let productIdFilter = req.query.productId ? {productid: req.query.productId} : {};
    let priceFilter = req.query.price ? {productid: req.query.price} : {};
    let amountFilter = req.query.amount ? {productid: req.query.amount} : {};
    let nameFilter = (req.query.name) ? ['name', 'like', `%${req.query.name}%`] : [{}];

    // Pagination
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 10;
    let ordering = [req.query.orderBy || 'id', req.query.sort || 'asc'];

    // Query db
    Db.knex()('lineitems')
        .select(select)
        .where('productid', productId)
        .where(idFilter)
        .where(shopIdFilter)
        .where(productIdFilter)
        .where(priceFilter)
        .where(amountFilter)
        .where(...nameFilter)
        .offset(offset)
        .limit(limit)
        .orderBy(...ordering)
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((err) => {
          next(err);
        });
}

// Get single lineitemId
const getSingleLineItem = (req, res, next) => {
    let productId = req.params.productId;
    let lineitemIdId = req.params.lineitemIdId;

    console.log(`getting lineitemId: ${lineitemIdId}`);

    // Query db
    Db.knex()
        .select('*')
        .from('lineitems')
        .where('productid', productId)
        .where('id', lineitemIdId)
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((err) => {
            next(err);
        });
}

// Create a lineitemId
const createLineItem = (req, res, next) => {
    console.log('creating lineitemId');

    // Determing lineItem info
    let productId = req.params.productId;
    let name = req.body.name;
    let amount = req.body.amount;
    let price = req.body.price;
    let shopId = req.body.shopId;

    const lineitemId = {
        productid: productId,
        shopid: shopId,
        name: name,
        price: price,
        amount: amount
    }

    // Query database
    Db.knex()('lineitems')
        .where('productid', productId)
        .insert(lineitemId)
        .then((result) => {
            Db.knex()
                .select('*')
                .from('lineitems')
                .where(lineitemId)
                .then((results) => res.status(200).send(results));
        })
        .catch((err) => {
            next(err);
        });
}

// Update a lineitemId
const updateLineItem = (req, res, next) => {
    console.log(`updating lineitemId ${req.params.lineitemIdId}`);

    // Params
    let productId = req.params.productId;
    let lineitemIdId = req.params.lineitemIdId;

    let shopId = req.body.shopId
    let name = req.body.name;
    let amount = req.body.amount;
    let price = req.body.price;

    const params = {
        productid: productId,
        lineitemid: lineItemId,
        shopid: shopId,
        name: name,
        amount: amount,
        price: price,

    };

    Db.knex()('lineitems')
        .where('productid', productId)
        .where('id', lineitemIdId)
        .update(params)
        .then((result) => {
            Db.knex()
                .select('*')
                .from('lineitems')
                .where('id', lineitemIdId)
                .where('productid', productId)
                .then((results) => res.status(200).send(results));
        })
        .catch((err) => {
            next(err);
        });
}

// Delete a lineitemId
const deleteLineItem = (req, res, next) => {
    // Params
    let productId = req.params.productId;
    let lineitemId = req.params.lineItemId;

    console.log(`deleting lineitemId ${lineitemId}`);
    Db.knex()('lineitems')
        .where('id', lineitemId)
        .where('productid', productId)
        .del()
        .then((results => {
            res.status(204).json(results);
        }))
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    getLineItems,
    getSingleLineItem,
    createLineItem,
    updateLineItem,
    deleteLineItem,
};
