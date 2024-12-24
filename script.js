let runningTotal = 0; // Holds the result of ongoing calculations
let buffer = "0"; // Displays the current input or result
let previousOperator = null; // Tracks the last operator used

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    // Handle symbols like +, -, etc.
    handleSymbol(value);
  } else {
    // Handle numbers
    handleNumber(value);
  }
  screen.innerText = buffer; // Update the display
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;

    case "=":
      if (previousOperator === null) {
        return; // No operation to perform
      }
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      break;

    case "+":
    case "-": // Match minus here
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return; // No operation on empty buffer
  }

  const intBuffer = parseFloat(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      if (intBuffer === 0) {
        buffer = "Error"; // Prevent division by zero
        runningTotal = 0;
        return;
      }
      runningTotal /= intBuffer;
      break;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-btns")
    .addEventListener("click", function (event) {
      const target = event.target;
      if (!target.classList.contains("calc-btn")) {
        return;
      }
      buttonClick(target.innerText);
    });
}

init();
