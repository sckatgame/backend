const knex = require('knex');
const configuration = require('../../knexfile').development;

const connection = knex(configuration);

module.exports = connection;
