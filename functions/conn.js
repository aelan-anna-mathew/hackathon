var mysql = require('mysql2');
var dbConfig = {
  // host: "sql.freedb.tech",
  // user: "",
  // password: "",
  // database: '',

 
  // Adjust the pool size as per your requirements
}
const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database as id', connection.threadId);
  connection.release(); // Release the initial connection back to the pool
});
const commonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "1800",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
};

function executeQuery(sql, values = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
   
        resolve(results);
      }
    });
  });
}

function closeConnection() {
  pool.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.stack);
    } else {
      console.log('All connections in the pool have been closed.');
    }
  });
}

module.exports = { executeQuery, closeConnection,commonHeaders };