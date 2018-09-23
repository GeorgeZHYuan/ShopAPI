// Local Variables
const cloud = require('../config/keys').db;
const INSTANCE_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME || cloud.INSTANCE_CONNECTION_NAME;

const Knex = require('knex');

// Instance of connection
let knex = null;

// Create connection instance to google cloud db
function connect () {
  console.log('db connected once');
  const config = {
    user: process.env.SQL_USER || cloud.SQL_USER,
    password: process.env.SQL_PASSWORD || cloud.SQL_PASSWORD,
    database: process.env.SQL_DATABASE || cloud.SQL_DATABASE
  };

  if (INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.host = `/cloudsql/${INSTANCE_CONNECTION_NAME}`;
  }

  // Connect to the database
  knex = Knex({
    client: 'pg',
    connection: config
  });
}

// Exports
module.exports = {
    connect,
    knex() {
        return knex;
    }
};
