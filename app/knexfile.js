// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: 'my_db',
      password: 'my_dbpass',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: 'my_db',
      password: 'my_dbpass',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: 'my_db',
      password: 'my_dbpass',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
