'use strict';
const { knex } = require('knex');
const config = require('../config/config')

const db = knex({
    client: 'mysql2',
    connection: {
        host: config.db_host,
        user: config.db_user,
        password: config.db_pass,
        database: config.db_name,
        decimalNumbers: true,
    },
    pool: {
        min: 0,
        max: 5,
    },
    acquireConnectionTimeout: 3600 * 1000
});


module.exports = db;
