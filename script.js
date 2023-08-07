// Seleziona gli elementi del DOM
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const valueEl = document.querySelector(".value");
const acEl = document.querySelector(".ac");
const pmEl = document.querySelector(".pm");
const percentEl = document.querySelector(".percent");
const additionEl = document.querySelector(".addition");
const subtractionEl = document.querySelector(".subtraction");
const multiplicationEl = document.querySelector(".multiplication");
const divisionEl = document.querySelector(".division");
const equalEl = document.querySelector(".equal");
const decimalEl = document.querySelector(".decimal");
const number0El = document.querySelector(".number-0");
const number1El = document.querySelector(".number-1");
const number2El = document.querySelector(".number-2");
const number3El = document.querySelector(".number-3");
const number4El = document.querySelector(".number-4");
const number5El = document.querySelector(".number-5");
const number6El = document.querySelector(".number-6");
const number7El = document.querySelector(".number-7");
const number8El = document.querySelector(".number-8");
const number9El = document.querySelector(".number-9");

// Array che contiene tutti i pulsanti numerici
const numberElArray = [
  number0El,
  number1El,
  number2El,
  number3El,
  number4El,
  number5El,
  number6El,
  number7El,
  number8El,
  number9El,
];

// Aggiorna l'orario sul display ogni secondo
setInterval(() => {
  const currentTime = new Date();

  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  hoursEl.textContent = currentHours.toString();
  minutesEl.textContent = currentMinutes.toString().padStart(2, "0");
}, 1000);

// Restituisci il valore a 0 e il tasto "C" alla modalità di reset
acEl.addEventListener("click", () => {
  valueEl.textContent = "0";
  acEl.textContent = "AC";
});

// Gestisce il tasto "+/-"
pmEl.addEventListener("click", () => {
  let currentValueStr = valueEl.textContent;
  let currentValue = currentValueStr;
  if (currentValue === "-0") {
    return 0;
  }
  if (currentValue >= 0) {
    currentValue = "-" + currentValue;
    valueEl.textContent = currentValue;
  } else {
    currentValue = currentValueStr.substring(1);
    valueEl.textContent = currentValue;
  }
});

// Gestisce il tasto "%"
percentEl.addEventListener("click", () => {
  const currentValueStr = valueEl.textContent;
  const currentValue = parseFloat(currentValueStr) / 100;
  valueEl.textContent = formatNumber(currentValue);
});

// Gestisce il tasto "."
decimalEl.addEventListener("click", () => {
  if (!valueEl.textContent.includes(".")) {
    valueEl.textContent += ".";
  }
});

// Evidenzia il pulsante operatore selezionato
function chooseOperator(operator) {
  const operators = ["addition", "subtraction", "multiplication", "division"];
  operators.forEach((op) => {
    const operatorEl = document.getElementById(op);
    if (operator === op) {
      operatorEl.style.backgroundColor = "#fff";
      operatorEl.style.color = "#ff9500";
    } else {
      operatorEl.style.backgroundColor = "#ff9500";
      operatorEl.style.color = "#fff";
    }
  });
}

// Variabili globali per gestire le operazioni
let currentOperation = null;
let previousValue = 0;

// Gestisce il click su un operatore (+, -, *, /)
function handleOperation(operation) {
  currentOperation = operation;
  previousValue = parseFloat(valueEl.textContent);
  valueEl.textContent = "0";
  resetOperatonColor();
}

// Reimposta il colore degli operatori
function resetOperatonColor() {
  const operators = ["addition", "subtraction", "multiplication", "division"];
  operators.forEach((op) => {
    const operatorEl = document.getElementById(op);
    operatorEl.style.backgroundColor = "#ff9500";
    operatorEl.style.color = "#fff";
  });
}

// Gestisci i pulsanti operatore (+, -, *, /)
additionEl.addEventListener("click", () => {
  handleOperation("addition");
  chooseOperator("addition");
});

subtractionEl.addEventListener("click", () => {
  handleOperation("subtraction");
  chooseOperator("subtraction");
});

multiplicationEl.addEventListener("click", () => {
  handleOperation("multiplication");
  chooseOperator("multiplication");
});

divisionEl.addEventListener("click", () => {
  handleOperation("division");
  chooseOperator("division");
});

// Aggiungi gli event listener per i pulsanti numerici
for (let i = 0; i < numberElArray.length; i++) {
  const numberEl = numberElArray[i];
  numberEl.addEventListener("click", () => {
    handleNumberClick(i.toString());
  });
}

// Funzione per gestire il click sui pulsanti numerici
function handleNumberClick(number) {
  let currentValue = valueEl.textContent;

  if (currentValue === "0") {
    valueEl.textContent = number;
    acEl.innerHTML = "C";
  } else if (currentValue.length < 9) {
    valueEl.textContent += number;
    acEl.innerHTML = "C";
  }
}

// Funzione per formattare il numero con i separatori delle migliaia e i decimali
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Calcola il risultato
function calculateResult() {
  const currentValueStr = valueEl.textContent.replace(",", ".");
  const currentValue = parseFloat(currentValueStr);

  switch (currentOperation) {
    case "addition":
      return previousValue + currentValue;
    case "subtraction":
      return previousValue - currentValue;
    case "multiplication":
      return previousValue * currentValue;
    case "division":
      return previousValue / currentValue;
    default:
      return currentValue;
  }
}

// Gestisci il tasto "="
equalEl.addEventListener("click", () => {
  const result = calculateResult();
  const formattedResult = formatNumber(result.toString());
  valueEl.textContent = formattedResult;
  resetOperatonColor();
  currentOperation = "";
  previousValue = result;
});

// Gestisci gli eventi della tastiera
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (numberKeys.includes(key)) {
    handleNumberClick(key);
  } else if (key === ".") {
    decimalEl.click();
  } else if (key === "+") {
    additionEl.click();
  } else if (key === "-") {
    subtractionEl.click();
  } else if (key === "*") {
    multiplicationEl.click();
  } else if (key === "/") {
    divisionEl.click();
  } else if (key === "Enter") {
    equalEl.click();
  } else if (key === "Escape") {
    acEl.click();
  }
});
