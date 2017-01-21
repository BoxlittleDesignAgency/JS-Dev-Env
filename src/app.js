/* eslint-disable no-console */


import BudgetController from "./budget";
import UIController from "./ui";

//APP CONTROLLER
let AppController = (function (budgetCtrl, UICtrl) {


  let updateBudget = function () {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    let budget = budgetCtrl.getBudget();

    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
    //console.log(budget);
  };

  let updatePercentages = function () {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();

    // 2. Read percentages from the budget controller
    let percentages = budgetCtrl.getPercentages();

    // 3. Update the UI with the new percentages.
    UICtrl.displayPercentages(percentages);
    console.log(percentages);
  };

  let ctrlAddItem = function () {

    let input, newItem;
    //TODO:
      // 1. Get the filled input data
      input = UICtrl.getInput();

      if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and Update Budget
      updateBudget();

      // 6. Calculate and Update percentages
      updatePercentages();
      }


      //console.log("It works!");
      budgetCtrl.printing();
  };

  let ctrlDeleteItem = (evt) => {
    let itemID, splitID, type, ID;

    itemID = evt.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(itemID);

    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);

      // 2. delete the item from the UI
      UICtrl.deleteListItem(itemID);

      // 3. Update and show the new budget
      updateBudget();

      // 4. Calculate and Update percentages
      updatePercentages();
    }
  };


  let setupEventListeners = function () {

    let DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", (evt) => {

      if (evt.keyCode === 13 || evt.which === 13) {
        ctrlAddItem();
      }
      console.log(evt);
    });

    document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
  };

  let init = function () {
    console.log("Application has started!");
    UICtrl.displayBudget({
      budget: 0,
      totalIncome: 0,
      totalExpenses: 0,
      percentage: -1
    });
    setupEventListeners();
    };

    return {
      init
    };


})(BudgetController, UIController);


export default AppController;
