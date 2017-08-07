const questions = {
  validate: function(input) {
    if (input !== "" && parseInt(input) > 0) {
      return true;
    } else {
      console.log("Please make sure your input is a number");
      return false;
    }
  },
  start: {
    name: "userChoice",
    message: `What is the ID of the item would you like to buy? \n`,
    type: "input",
    validate: this.validate
  },
  quantity: {
    name: "purchaseQuantity",
    message: "How many would you like to purchase? \n",
    type: "input",
    validate: this.validate
  },
  continue: {
    name: "menuNavigation",
    message: "What would you like to do?",
    type: "list",
    choices: ["Buy another Item", "Exit"]
  }
};

module.exports = questions;
