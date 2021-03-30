const knex = require("knex");
const knexFile = require("./knexfile");
const { Model } = require('objection');

let env = process.env.NODE_ENV || 'development';

console.log("Env is ", env)

function setupDb()
{

    var config = knexFile[env];

    const db = knex(config);  
    Model.knex(db);
}

module.exports = setupDb;