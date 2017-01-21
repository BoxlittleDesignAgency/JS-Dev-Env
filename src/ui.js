/* eslint-disable no-console */


// UI CONTROLLER
let UIController = (function () {

  // Logic Code
  let DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage"
  };

  let formatNumber = function (num, type) {
    let numSplit, int, dec;
    /*
    + or - before number
    exactly 2 decimal points
    comma separating the thousands
     */
    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split(".");

    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);//input: 23510 output: 23,510
    }

    dec = numSplit[1];

    return (type === "expense" ? "-" : "+") + " " + int + "." + dec;
  };


  let getInput = function () {
    return {
      type: document.querySelector(DOMstrings.inputType).value,//will be either income or expense
      description: document.querySelector(DOMstrings.inputDesc).value,
      value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
    };
  };

  let addListItem = function (obj, type) {
    let html, newHtml, element;

    // Create HTML string with placeholder text
    if (type === "income") {
      element = DOMstrings.incomeContainer;
      html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    } else if (type === "expense") {
      element = DOMstrings.expensesContainer;
      html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }

    // Replace the placeholder text with some actual data
    newHtml = html.replace("%id%", obj.id);
    newHtml = newHtml.replace("%description%", obj.description);
    newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

    // Insert the HTML into the DOM
    document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

  };

  let deleteListItem = function (selectorID) {
    let el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);
  };

  let clearFields = function () {
    let fields, fieldsArr;

    fields = document.querySelectorAll(DOMstrings.inputDesc + ", " + DOMstrings.inputValue);

    fieldsArr = Array.prototype.slice.call(fields);

    fieldsArr.forEach(function (current, index, array) {
      current.value = "";
    });

    fieldsArr[0].focus();

  };

  let displayBudget = function (obj) {
    document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
    document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
    document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExpenses;

    if (obj.percentage > 0) {
      document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
    } else {
      document.querySelector(DOMstrings.percentageLabel).textContent = "---";
    }
  };

  let displayPercentages = function (percentages) {
    let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
    console.log(fields);

    let nodeListForEach = function (list, callback) {
      for (var i = 0; i < list.length; i++) {
        callback(list[i], i);
      }
    };

    nodeListForEach(fields, function (current, index) {
      if (percentages[index] > 0) {
        current.textContent = percentages[index] + "%";
      } else {
        current.textContent = "---";
      }
    });
  };

  let getDOMstrings = function () {
    return DOMstrings;
  };

  return {
    getInput,
    addListItem,
    deleteListItem,
    clearFields,
    displayBudget,
    displayPercentages,
    getDOMstrings
  };

})();

export default UIController;
