const inputContainer = document.querySelector(".input-container");
const input = inputContainer.querySelector(".input1");
const buttonContainer = document.querySelector(".buttons-container");

let isNegative = false;
let isDotted = false;
let isDottingFixed = false;
let num1;
let num2;
let action = "";

const buttonNames = [
  "AC",
  "C",
  "&#9003",
  "/",
  "7",
  "8",
  "9",
  "&times",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "&plusmn",
  "0",
  ",",
  "&#61",
];

function createButtons() {
  for (let i = 0; i < 5; i++) {
    let container = document.createElement("div");
    container.setAttribute("class", "button-container");
    for (let j = 0; j < 4; j++) {
      let button = document.createElement("button");
      button.setAttribute("class", "button");
      button.setAttribute("type", "button");
      button.setAttribute("id", "button-" + (j + i * 4));
      button.innerHTML = buttonNames[j + i * 4];
      button.addEventListener("click", buttonClick);
      container.appendChild(button);
    }
    buttonContainer.appendChild(container);
  }
}

function buttonClick() {
  if (isNaN(this.innerHTML)) {
    switch (this.innerHTML) {
      case "AC":
        num1 = undefined;
        num2 = undefined;
        isNegative = false;
        isDotted = false;
        isDottingFixed = false;
        action = "";
        input.value = "";
        break;
      case "C":
        isNegative = false;
        isDotted = false;
        isDottingFixed = false;
        input.value = "";
        break;
      case "⌫":
        if (input.value.charAt(input.value.length - 2) === ".") {
          input.value = input.value.toString().slice(0, -2);
          isDotted = false;
          isDottingFixed = false;
        } else {
          input.value = input.value.toString().slice(0, -1);
        }
        break;
      case "/":
        num1 = input.value;
        action = "/";
        input.value = "";
        break;
      case "×":
        num1 = input.value;
        action = "*";
        input.value = "";
        break;
      case "-":
        num1 = input.value;
        action = "-";
        input.value = "";
        break;
      case "+":
        num1 = input.value;
        action = "+";
        input.value = "";
        break;
      case "±":
        isNegative = !isNegative;
        if (isNegative) {
          input.value = "-" + input.value;
        } else {
          input.value = input.value.replace("-", "");
        }
        break;
      case ",":
        if (isDotted) return;
        input.value = input.value + ".0";
        isDotted = true;
        break;
      case "=":
        num2 = input.value;
        if (!action) return;
        if (!num1 && !num2) return;

        switch (action) {
          case "+":
            input.value = parseFloat(num1) + parseFloat(num2);
            break;
          case "-":
            input.value = num1 - num2;
            break;
          case "/":
            input.value = num1 / num2;
            break;
          case "*":
            input.value = num1 * num2;
            break;
        }
        break;
      default:
        console.log(this);
        break;
    }
  } else {
    if (isDotted && !isDottingFixed) {
      input.value = input.value.replace("0", this.innerHTML);
      isDottingFixed = true;
    } else {
      input.value += this.innerHTML;
    }
  }
  console.log(num1, "  ", num2);
}

createButtons();
