const express = require('express');
const router = express.Router();

const crypto = require('crypto');

module.exports = (knex) => {
    /**
     * Insert a visit record into the database.
     *
     * @param {object} knex The Knex connection object.
     * @param {object} visit The visit record to insert.
     * @returns {Promise}
     */
    function insertVisit (knex, visit) {
      return knex('visits').insert(visit);
    }

    /**
     * Retrieve the latest 10 visit records from the database.
     *
     * @param {object} knex The Knex connection object.
     * @returns {Promise}
     */
    function getVisits (knex) {
      return knex.select('timestamp', 'userIp')
        .from('visits')
        .orderBy('timestamp', 'desc')
        .limit(10)
        .then((results) => {
          return results.map((visit) => `Time: ${visit.timestamp}, AddrHash: ${visit.userIp}`);
        });
    }

    return {
        getVisits: (req, res, next) => {
            // Create a visit record to be stored in the database
            const visit = {
                timestamp: new Date(),
                // Store a hash of the visitor's ip address
                userIp: crypto.createHash('sha256').update(req.ip).digest('hex').substr(0, 7)
            };

            insertVisit(knex, visit)
                // Query the last 10 visits from the database.
                .then(() => getVisits(knex))
                .then((visits) => {
                    res
                    .status(200)
                    .set('Content-Type', 'text/plain')
                    .send(`Last 10 visits:\n${visits.join('\n')}`)
                    .end();
                })
                .catch((err) => {
                    next(err);
                });
        },
        getAccounts: (req, res, next) => {
            knex.select('*')
                .from('accounts')
                .then((results) => {
                    res.send(results);
                });
        },
    };
}
