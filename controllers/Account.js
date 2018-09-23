const express = require('express');
const router = express.Router();
const Db = require('../db/googleCloudDB');

// Get all accounts
const getAccounts = (req, res, next) => {
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
    const account = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    console.log('got to create account');

    Db.knex()('accounts').insert(account)
        .then(res.status(200).send('account created'))
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    getAccounts,
    createAccount,
};
