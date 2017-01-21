/* eslint-disable no-console */

// BUDGET CONTROLLER
let BudgetController = (function () {

  let data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    },
    budget: 0,
    percentage: -1
  };

  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  let Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };


  let addItem = function (type, descr, val) {
    let newItem, ID;

    //Create new ID
    if (data.allItems[type].length > 0) {
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
      ID = 0;
    }
    //Create new item based on 'expense' or 'income' type
    if (type === "expense") {
      newItem = new Expense(ID, descr, val);
    } else if (type === "income") {
      newItem = new Income(ID, descr, val);
    }

    // Push it into our data structure
    data.allItems[type].push(newItem);

    // Return the new element
    return newItem;

  };

  let deleteItem = (type, id) => {
    let ids, index;

    ids = data.allItems[type].map(function (current) {
      return current.id;
    });

    index = ids.indexOf(id);

    if (index !== -1) {
      data.allItems[type].splice(index, 1);
    }

  };


  let calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function (curr) {
      sum += curr.value;
    });
    data.totals[type] = sum;
  };

  let calculateBudget = function () {

    // Calculate the total income and expenses
    calculateTotal("expense");
    calculateTotal("income");

    // Calculate the budget: income - expenses
    data.budget = data.totals.income - data.totals.expense;

    // Calculate the percentage of income that we spent
    if (data.totals.income > 0) {
    data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
    } else {
      data.percentage = -1;
    }

  };

  let calculatePercentages = function () {
    data.allItems.expense.forEach(function (curr) {
      curr.calcPercentage(data.totals.income);
    });
  };

  let getPercentages = function () {
    let allPerc = data.allItems.expense.map(function (curr) {
      return curr.getPercentage();
    });
    return allPerc;
  };

  let getBudget = function () {
    return {
      budget: data.budget,
      totalIncome: data.totals.income,
      totalExpenses: data.totals.expense,
      percentage: data.percentage
    };
  };

  let printing = function () {
    console.log("Overall: ", data);
  };

  return {
    addItem,
    deleteItem,
    calculateBudget,
    calculatePercentages,
    getPercentages,
    getBudget,
    printing
  };

})();

export default BudgetController;
