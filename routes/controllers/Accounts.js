const express = require('express');
const router = express.Router();

module.exports = (knex) => {
    router.get('/accounts', (req, res) => {
        knex.select('*')
            .from('accounts')
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
              next(err);
            });
    });

    router.post('/accounts/:accountId/shops', (req, res) => {
        const account = {
            username: 'test',
            email: 'test@test.com',
            password: 'password'
        }

        knex.insert('*')
            .from('accounts')
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
              next(err);
            });
    });

    return router
};
