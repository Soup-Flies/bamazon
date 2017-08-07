const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

const database = {
  create: function() {},
  read: function(selector, place) {
    selector = typeof selector !== "undefined" ? selector : "*";
    place = typeof place !== "undefined" ? place : "products";
    const queryString = `SELECT ${selector} FROM ${place}`;
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
  update: function(place, id, qty) {
    selector = typeof selector !== "undefined" ? selector : "*";
    place = typeof place !== "undefined" ? place : "products";
    const queryString = `UPDATE ${place} SET stock_quantity = ${qty} WHERE id = ${id};`;
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
  delete: function() {},
  format: function() {
    console.log("\nID:   NAME  --  PRICE \n");
    this.read().then(ans => {
      for (item in ans) {
        const temp = 
          `${ans[item].id}: ${ans[item].product_name} -- $${ans[item].price}`;
        console.log(temp);
      }
      console.log("\n");
    });
  }
};

module.exports = database;
