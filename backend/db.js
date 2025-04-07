import mysql from 'mysql';

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "14092004",
  database: "cachorros_react"
});

export default db;
