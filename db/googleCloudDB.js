// Local Variables
const cloud = require('../config/keys').db;
const INSTANCE_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME || cloud.INSTANCE_CONNECTION_NAME;

// console.log("cloud", cloud);
// console.log("user", cloud.SQL_USER);

const express = require('express');
const Knex = require('knex');
const prompt = require('prompt');
const crypto = require('crypto');

const app = express();
app.enable('trust proxy');

const knex = connect();

function connect () {
  const config = {
    user: process.env.SQL_USER || cloud.SQL_USER,
    password: process.env.SQL_PASSWORD || cloud.SQL_PASSWORD,
    database: process.env.SQL_DATABASE || cloud.SQL_DATABASE
  };

  if (INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.host = `/cloudsql/${INSTANCE_CONNECTION_NAME}`;
  }

  // Connect to the database
  const knex = Knex({
    client: 'pg',
    connection: config
  });

  return knex;
}

module.exports = knex;
