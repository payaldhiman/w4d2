const settings = require("./settings"); // settings.json


var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const args1 = process.argv[2];
const args2 = process.argv[3];
const args3 = process.argv[4];


knex.insert({first_name: args1, last_name: args2, birthdate: args3}).into("famous_people").asCallback((error, results) =>{
  console.log(results);
  knex.destroy();
});



