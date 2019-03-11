const pool = require('./dbConf')
const uuid = require('uuid')
pool.on('connect', () => {
  console.log('connected to the Database');
});
const schoolTable = `CREATE TABLE IF NOT EXISTS
    students(
        id UUID PRIMARY KEY NOT NULL,
        student_name VARCHAR(128) NOT NULL,
        student_age INT NOT NULL,
        student_class VARCHAR(128) NOT NULL,
        parent_contact VARCHAR(128) NOT NULL,
        admission_date TIMESTAMP
    )`;
pool
    .query(schoolTable)
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

module.exports = schoolTable;