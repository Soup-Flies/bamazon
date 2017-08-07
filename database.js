const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  console.log("Connected to Database");
  if (err) throw err;
  else {
    // start();
  }
});

const query = {
  create: function() {
    
  },

  read: function(selector, place) {
    selector = (typeof selector !== 'undefined') ? selector : "*";
    place = (typeof place !== 'undefined') ? place : "products";
    let queryString = `SELECT ${selector} FROM ${place}`
    return new Promise(function(resolve, reject) {
      connection.query(queryString, function(err, res) {
        if (err) reject(err);
        else if (!res) {
          console.log("No Results");
        } else {
          resolve(res);
        }
      });
    });
  },

  update: function() {},

  delete: function() {}
};

query.read().then(function(readResults) {
  console.log(readResults[0].product_name);
});

module.exports = query;
