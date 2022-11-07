const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

const updateDisplay = () => {
  display.value = displayValue;
};

updateDisplay();

keys.addEventListener("click", handlerClick);

function handlerClick(e) {
  const element = e.target;

  if (!element.matches("button")) return;

  if (element.classList.contains("operator")) {
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    inputDecimal(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    clear();
    updateDisplay();
    return;
  }
  inputNumber(element.value);
  updateDisplay();
}

const inputNumber = (number) => {
  if (waitingForSecondValue === true) {
    displayValue = number;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? number : displayValue + number;
  }
};

const inputDecimal = () => {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
};

const clear = () => {
  displayValue = "0";
};

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);
  if (operator && waitingForSecondValue === true) {
    operator = nextOperator;
    return;
  }
  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = String(result);
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
}

const calculate = (first, second, operator) => {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }
  return second;
};
