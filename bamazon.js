const database = require("./database");
const prompts = require("./prompts");
const inquirer = require("inquirer");

const controller = {
  currentQuestions: [],
  currentSelection: {},
  currentPurchaseQuantity: 0,
  promptBuilder: function(questionsArray) {
    setTimeout(() => {
      inquirer.prompt(questionsArray).then(ans => {
        if (ans.menuNavigation) {
          (ans.menuNavigation === "Exit") ? process.exit(): engine();
          return;
        };
        database
          .read()
          .then(data => {
            if (typeof data[ans.userChoice - 1]);
            controller.currentSelection = data[ans.userChoice - 1];
            controller.currentPurchaseQuantity = parseInt(ans.purchaseQuantity);
            return this;
          })
          .then(current => {
            current.checkInventory();
          });
      });
    }, 20);
    return this;
  },
  checkInventory: function() {
    const orderQty = this.currentPurchaseQuantity;
    const inventoryQty = parseInt(this.currentSelection.stock_quantity);
    if (orderQty > inventoryQty) {
      console.log("I'm sorry we don't have that many in stock, please try again.");
      //Make the call to prompt builder only ask for quantity -- just cause I like it that way.
      return this.promptBuilder([prompts.start, prompts.quantity]);
    } else {
      this.sellProduct();
    }
  },
  sellProduct: function() {
    console.log("\nThank you for your purchase");
    const id = controller.currentSelection.id;
    const qty =
      controller.currentSelection.stock_quantity -
      controller.currentPurchaseQuantity;
    database.update("products", id, qty).then(() => this.displayCost());
    return this;
  },
  displayCost: function() {
    const price = this.currentSelection.price;
    const qty = this.currentPurchaseQuantity;
    const total = price * qty;
    console.log(`Your total today was: $${total}.00 for your ${qty < 2 ? this.currentSelection.product_name: this.currentSelection.product_name + "s"} \n`)
    this.promptBuilder([prompts.continue]);
  }
};

const engine = function() {
  database.format();
  controller.promptBuilder([prompts.start, prompts.quantity]);
};

engine();
