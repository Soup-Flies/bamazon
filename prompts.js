const questions = {
  validate: function(input) {
      if (typeof input === "number") {
        return true;
      } else {
        console.log("Please make sure your input is a number");
        return false;
      };
    },
  start: {
    name: "userChoice",
    message: `What is the ID of the item would you like to buy? \n`,
    type: "input",
    validate: this.validate
  },
  quantity: {
    name: "purchaseQuantity",
    message: "How many would you like to purchase?",
    type: "input",
    validate: this.validate
  }
};

module.exports = questions;