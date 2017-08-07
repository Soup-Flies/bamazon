const database = require("./database");
const prompts = require("./prompts");
const inquirer = require("inquirer");

const controller = {
  currentQuestions: [],
  currentPurchaseQuantity: 0,
  currentSelection: 0,
  promptBuilder: function(questionsArray) {
    inquirer.prompt(
      questionsArray
    ).then(ans => {
      database.read().then((data) => {
        this.currentSelection = data[ans.userChoice - 1];
        this.currentPurchaseQuantity = parseInt(ans.purchaseQuantity);
        console.log(this);
        return setTimeout(() => this, 10);
      });
    })
  },
  checkInventory: function() {
    console.log("Checking inventory");
    let orderQty = this.currentPurchaseQuantity;
    let inventoryQty = this.currentSelection.stock_quantity;
    console.log(orderQty, inventoryQty);
    if (orderQty > inventoryQty) {
      console.log("I'm sorry we don't have that many in stock");
      this.promptBuilder([prompts.quantity]);
    } else {
      this.sellProduct();
    }
  },
  sellProduct: function() {

  },
  displayCost: function() {
    
  }
};



const engine = function() {
  database.format();
  controller.promptBuilder([prompts.start, prompts.quantity])
  controller.checkInventory();
}

engine();




