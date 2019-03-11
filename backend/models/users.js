const uuid = require('uuid');
const pool =  require('./dbConf')

const user = `CREATE TABLE IF NOT EXISTS
    users(
        id UUID PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        avatar VARCHAR,
        date TIMESTAMP
    )`;
pool
    .query(user)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });
pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = user;