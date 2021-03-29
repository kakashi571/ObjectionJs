// Update with your config settings.

const { knexSnakeMappers } =  require('objection');

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'mysql_node',
      user:     'root',
      password: 'Rockstar@571'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },

    seeds : {
      directory: './seeds'
    },

    ...knexSnakeMappers
  }

};
