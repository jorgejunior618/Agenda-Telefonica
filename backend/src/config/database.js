const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: "postgres://postgres:pgpassword@localhost:5432/AgendaTelefonica",
});

pool.on('connect', () => {
  console.log("Connected");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
