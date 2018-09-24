const express = require('express');
const router = express.Router();
const Db = require('../db/googleCloudDB');
const PaginationValidator = require('../validation/PaginationValidator');

// Search accounts
const getAccounts = (req, res, next) => {
    console.log('getting accounts');

    // validation
    const {errors, isValid} = PaginationValidator(req.query);

    console.log('errors', errors);
    console.log('isValid', isValid);

    if(!isValid) {
        console.log('invaliiiddd');
        return res.status(400).json(errors);
    }

    // Check for selections and filtering
    let select = req.query.select || [];

    // Filter feilds
    let idFilter = (req.query.id) ? ['id', 'like', `%${req.query.id}%`] : [{}];
    let emailFilter = (req.query.email) ? ['email', 'like', `%${req.query.email}%`] : [{}];
    let usernameFilter = (req.query.username) ? ['username', 'like', `%${req.query.username}%`] : [{}];
    let passwordFilter = (req.query.password) ? ['password', 'like', `%${req.query.password}%`] : [{}];

    // Pagination
    let offset = req.query.offset || 0;
    let limit = req.query.limit || 10;
    let ordering = [req.query.orderBy || 'id', req.query.sort || 'asc'];

    // Query db
    Db.knex()('accounts')
        .select(select)
        .where(...idFilter)
        .where(...emailFilter)
        .where(...usernameFilter)
        .where(...passwordFilter)
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

// Get single account
const getSingleAccount = (req, res, next) => {
    let accountId = req.params.accountId;
    console.log(`getting account: ${accountId}`);

    // Query db
    Db.knex()
        .select('*')
        .from('accounts')
        .where({id: accountId})
        .then((results) => {
            res.status(200).send(results);
        })
        .catch((err) => {
          next(err);
        });
}

// Create an account
const createAccount = (req, res, next) => {
    console.log('creating account');

    // Determing account info
    const account = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    // Query db
    Db.knex()('accounts')
        .insert(account)
        .then((results) => {
            Db.knex()
                .select('*')
                .from('accounts')
                .where(account)
                .then((results) => {
                    res.status(201).send(results)
            });
        })
        .catch((err) => {
            next(err);
        });
}

// Update an account
const updateAccount = (req, res, next) => {
    console.log(`updating account ${req.params.accountId}`);

    Db.knex()('accounts')
        .where({id: req.params.accountId})
        .update(req.body)
        .then((result) => {
            Db.knex()
                .select('*')
                .from('accounts')
                .where({id: req.params.accountId})
                .then((results) => res.status(200).send(results));
        })
        .catch((err) => {
            next(err);
        });
}


// Delete an account
const deleteAccount = (req, res, next) => {
    console.log(`deleting account ${req.params.accountId}`);
    Db.knex()('accounts')
        .where({id: req.params.accountId})
        .del()
        .then((result) => res.sendStatus(204))
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    getAccounts,
    getSingleAccount,
    createAccount,
    updateAccount,
    deleteAccount,
};
