const pg = require("pg");
const settings = require("./settings"); // settings.json

var dateFormat = require('dateformat');
var now = new Date();

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const args = process.argv[2];

client.connect((error) => {
  if(error) throw error;

  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [args], (error, results) => {
    if(error) throw error;

    console.log("Searching...");
    for(const row of results.rows){
      const {id, first_name, last_name, birthdate} = row;
      console.log(`Found ${results.rows.length} person(s) by the name \'${args}\':`);
      console.log(`- ${id}: ${first_name} ${last_name}, born \'${dateFormat(birthdate,"isoDate")}\'`);
    }

    client.end((error) => {
      if(error) throw error;
    });
  });
});