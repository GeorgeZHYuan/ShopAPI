const express = require('express');
const router = express.Router();
const Db = require('../db/googleCloudDB');

// Validators
const PaginationValidator = require('../validation/PaginationValidator');
const ShopCreationValidator = require('../validation/AccountValidators/AccountCreationValidator');
const ShopUpdateValidator = require('../validation/AccountValidators/AccountUpdateValidator');

// Search shops
const getShops = (req, res, next) => {
    console.log('getting shops');

    // validation
    let accountId = req.params.accountId;
    let isValid = true;
    let errors = {};

    // Check for selections and filtering
    let select = req.query.select || [];
    let idFilter = (req.query.id) ? ['id', 'like', `%${req.query.id}%`] : [{}];
    let ownerIdFilter = (req.query.ownerId) ? ['ownerid', 'like', `%${req.query.ownerId}%`] : [{}];
    let nameFilter = (req.query.name) ? ['name', 'like', `%${req.query.name}%`] : [{}];

    // Pagination
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 10;
    let ordering = [req.query.orderBy || 'id', req.query.sort || 'asc'];

    // Query db
    Db.knex()('shops')
        .select(select)
        .where('ownerid', accountId)
        .where(...idFilter)
        .where(...ownerIdFilter)
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

// Get single shop
const getSingleShop = (req, res, next) => {
    let accountId = req.params.accountId;
    let shopId = req.params.shopId;

    console.log(`getting shop: ${shopId}`);

    // Query db
    Db.knex()
        .select('*')
        .from('shops')
        .where('ownerid', accountId)
        .where('id', shopId)
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((err) => {
            next(err);
        });
}

// Create a shop
const createShop = (req, res, next) => {
    console.log('creating shop');

    // Determing account info
    let accountId = req.params.accountId;
    let ownerId = req.body.ownerId;
    let name = req.body.name;

    const shop = {
        ownerid: ownerId,
        name: name
    }

    // Query database
    Db.knex()('shops')
        .where('ownerid', accountId)
        .insert(shop)
        .then((result) => {
            Db.knex()
                .select('*')
                .from('shops')
                .where('ownerid', accountId)
                .then((results) => res.status(200).send(results));
        })
        .catch((err) => {
            next(err);
        });
}

// Update a shop
const updateShop = (req, res, next) => {
    console.log(`updating shop ${req.params.shopId}`);

    // Params
    let accountId = req.params.accountId;
    let shopId = req.params.shopId;
    let ownerId = req.body.ownerId;
    let name = req.body.name;

    const params = {
        ownerid: ownerId,
        name: name
    };

    Db.knex()('shops')
        .where('ownerid', accountId)
        .where('id', shopId)
        .update(params)
        .then((result) => {
            Db.knex()
                .select('*')
                .from('shops')
                .where('id', shopId)
                .where('ownerid', accountId)
                .then((results) => res.status(200).send(results));
        })
        .catch((err) => {
            next(err);
        });
}

// Delete a shop
const deleteShop = (req, res, next) => {
    // Params
    let accountId = req.params.accountId;
    let shopId = req.params.shopId;

    console.log(`deleting shop ${shopId}`);
    Db.knex()('shops')
        .where('id', shopId)
        .where('ownerid', accountId)
        .del()
        .then((results => {
            res.status(204).json(results);
        }))
        .catch((err) => {
            next(err);
        });
}



module.exports = {
    getShops,
    getSingleShop,
    createShop,
    updateShop,
    deleteShop,
};
