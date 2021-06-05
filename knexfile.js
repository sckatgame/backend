require('dotenv').config();
const parse = require("pg-connection-string").parse;
// Update with your config settings.

const pgconfig = parse(process.env.DBSTRING);
pgconfig.ssl = { rejectUnauthorized: false };

module.exports = {
  development: {
    client: 'postgresql',
    connection:pgconfig,
    migrations:{
      directory: './src/database/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  
  production: {
    client: 'postgresql',
    connection:pgconfig,
    migrations:{
      directory: './src/database/migrations'
    }
  },
};
