const express = require('express');
const router = express.Router();
const Db = require('../db/googleCloudDB');

// Validators
const PaginationValidator = require('../validation/PaginationValidator');
const ShopCreationValidator = require('../validation/AccountValidators/AccountCreationValidator');
const ShopUpdateValidator = require('../validation/AccountValidators/AccountUpdateValidator');

// Search products
const getProducts= (req, res, next) => {
    console.log('getting products');

    // validation
    let isValid = true;
    let errors = {};

    // Check for selections and filtering
    let select = req.query.select || [];
    let idFilter = req.query.id ? {id: req.query.id} : {};
    let lineItemIdFilter = req.query.lineItemId ? {lineitemid: req.query.lineItemId} : {};
    let nameFilter = (req.query.name) ? ['name', 'like', `%${req.query.name}%`] : [{}];


    // Pagination
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 10;
    let ordering = [req.query.orderBy || 'id', req.query.sort || 'asc'];

    // Query db
    Db.knex()('products')
        .select(select)
        .where(idFilter)
        .where(lineItemIdFilter)
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

// Get single product
const getSingleProduct = (req, res, next) => {
    let productId = req.params.productId;

    console.log(`getting product: ${productId}`);

    // Query db
    Db.knex()
        .select('*')
        .from('products')
        .where('id', productId)
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((err) => {
            next(err);
        });
}

// Create a product
const createProduct = (req, res, next) => {
    console.log('creating shop');

    // Determing product info
    let lineItemId = req.body.lineItemId;
    let name = req.body.name;

    const product = {
        lineitemid: lineItemId,
        name: name
    }

    // Query database
    Db.knex()('products')
        .insert(product)
        .then((result) => {
            Db.knex()
                .select('*')
                .from('products')
                .where('name', name)
                .then((results) => res.status(200).send(results));
        })
        .catch((err) => {
            next(err);
        });
}

// Update a product
const updateProduct = (req, res, next) => {
    console.log(`updating product ${req.params.productId}`);

    // Params
    let productId = req.params.productId;
    let name = req.body.name;
    let lineItemId = req.body.lineItemId;

    const params = {
        name: name,
        lineitemid: lineItemId
    }

    Db.knex()('products')
        .where('id', productId)
        .update(params)
        .then((result) => {
            Db.knex()
                .select('*')
                .from('products')
                .where('id', productId)
                .then((results) => res.status(200).send(results));
        })
        .catch((err) => {
            next(err);
        });
}

// Delete a product
const deleteProduct = (req, res, next) => {
    // Params
    let productId = req.params.productId;

    console.log(`deleting product ${productId}`);
    Db.knex()('products')
        .where('id', productId)
        .del()
        .then((results => {
            res.status(204).json(results);
        }))
        .catch((err) => {
            next(err);
        });
}



module.exports = {
    getProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
