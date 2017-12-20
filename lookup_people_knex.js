var pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});
const settings = require("./settings"); // settings.json

var dateFormat = require('dateformat');
var now = new Date();

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


// const args = process.argv[2];

// knex.select().from("famous_people").asCallback((error, results) => {
//   // handle error
//   results.forEach((result) => {
//     console.log(result);
//   });
// });

const args = process.argv[2];


knex.select().from("famous_people").where({first_name: args }).orWhere({last_name: args}).then((results) => {
  results.forEach((result) => {
    console.log("Searching...");
    console.log(`Found ${results.length} person(s) by the name \'${args}\':`);
    console.log(`- ${result.id}: ${result.first_name} ${result.last_name}, born \'${dateFormat(result.birthdate,"isoDate")}\'`);
  });
}).catch((error) => {
  // handle error
});
