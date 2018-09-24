const express = require('express');
const router = express.Router();
const Db = require('../db/googleCloudDB');

// Validators
const PaginationValidator = require('../validation/PaginationValidator');
const AccountCreationValidator = require('../validation/AccountValidators/AccountCreationValidator');
const AccountUpdateValidator = require('../validation/AccountValidators/AccountUpdateValidator');

// Search accounts
const getAccounts = (req, res, next) => {
    console.log('getting accounts');

    // validation
    const {errors, isValid} = PaginationValidator(req.query);
    if(!isValid) {
        console.log('invaliiiddd');
        return res.status(400).json(errors);
    } else {
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

// Check if email is taken
const checkEmailAvailability = (email) => {
    return Db.knex()('accounts')
        .select('email')
        .where('email', email)
        .then(results => results);
}

// Create an account
const createAccount = (req, res, next) => {
    console.log('creating account');

    // validation
    const {errors, isValid} = AccountCreationValidator(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    // Determing account info
    const account = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    // Query db
    checkEmailAvailability(account.email)
    .then(results => {
        if (results.length === 0){
            Db.knex()('accounts')
                .insert(account)
                .then(() => {
                    Db.knex()('accounts')
                    .where('email', account.email)
                    .then((results) => {
                        res.status(201).json(results);
                    })
                })
                .catch((err) => {
                    next(err);
                })

        }
        else {
            errors.email = `${account.email} has already been taken.`;
            res.status(400).json(errors);
        }
    });
}

// Update an account
const updateAccount = (req, res, next) => {
    console.log(`updating account ${req.params.accountId}`);

    let params = req.body;
    params.accountId = req.params.accountId;
    const {errors, isValid} = AccountUpdateValidator(params);

    if (!isValid) {
        res.status(400).json(errors);
    }
    else {
        delete params['accountId'];

        Db.knex()('accounts')
            .where('id', req.params.accountId)
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
}

// Delete an account
const deleteAccount = (req, res, next) => {
    console.log(`deleting account ${req.params.accountId}`);
    Db.knex()('accounts')
        .where({id: req.params.accountId})
        .del()
        .then((results => {
            res.status(204).json({});
        }))
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
