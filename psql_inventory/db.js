var { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	password: "m8354211m",
	host: "localhost",
	port: 5432,
	database: "inventory",
});

module.exports = pool;
