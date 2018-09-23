const express = require('express');
const router = express.Router();
const Db = require('../db/googleCloudDB');

// Get all accounts
const getAccounts = (req, res, next) => {
    console.log('getting all accounts');
    Db.knex().select('*')
        .from('accounts')
        .then((results) => {
            res.send(results);
        })
        .catch((err) => {
          next(err);
        });
}

// Create an account
const createAccount = (req, res, next) => {
    console.log('creating account');
    const account = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    Db.knex()('accounts')
        .insert(account)
        .then((results) => res.status(201).send('account created'))
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
            res.status(200).send('account updated');
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
        .then((result) => res.status(204).send('account deleted'))
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
};
