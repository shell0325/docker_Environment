const knex = require('../db/knex');
require('dotenv').config()


async function findById(userId) {
  const user = await where({ id: userId });
  if (user === null) {
    throw new Error('User not found');
  }
  return { ...user };
}

async function where(condition) {
  return await knex(process.env.TABLE_NAME)
    .where(condition)
    .then((results) => {
      console.log(condition);
      console.log('results');
      console.log(results);
      if (results.length === 0) {
        return null;
      }
      console.log(results[0]);
      return results[0];
    });
}

module.exports = {
  findById,
};
