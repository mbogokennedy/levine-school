const pg = require('pg');
const dotEnv = require('dotenv').config()
const config = {
    user: process.env.DB_USER, //this is the db user credential
    database: process.env.DB,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    max: process.env.DB_MAX, // max number of clients in the pool
    idleTimeoutMillis: process.env.DB_ITM,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

module.exports = pool