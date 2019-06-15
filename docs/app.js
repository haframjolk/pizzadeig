"use strict";
/* =======
   Classes
   ======= */
// Each ingredient has a name, a base unit size and an HTML element
class Ingredient {
    constructor(name, baseUnitSize, element) {
        this.name = name;
        this.baseUnitSize = baseUnitSize;
        this.element = element;
    }
    getMultipliedValue(base) {
        return this.baseUnitSize * base;
    }
    updateValue(newValue) {
        this.element.textContent = newValue;
    }
    updateAmount(newBase) {
        this.updateValue(this.baseUnitSize * newBase);
    }
}

/* ====
   Data
   ==== */
// All ingredients that need to be updated
const ingredients = [
    new Ingredient("water",      65,  document.getElementById("water")),
    new Ingredient("oil",        10,  document.getElementById("oil")),
    new Ingredient("yeast",      1.5, document.getElementById("yeast")),
    new Ingredient("salt",       2,   document.getElementById("salt")),
    new Ingredient("brownsugar", 3,   document.getElementById("brownsugar")),
    new Ingredient("flour",      100, document.getElementById("flour")),
];
// Default number of pizzas if no number is saved in localStorage
const defaultNoOfPizzas = 4;

/* =========
   Functions
   ========= */
// Update the amount displayed for each ingredient
function updateIngredients(base) {
    ingredients.forEach(ingredient => ingredient.updateAmount(base));
}

// Update the input field's text value
function setDisplayedValue(val) {
    inputField.value = val;
}

// Save chosen number of pizzas to localStorage
function saveNumberOfPizzas(noOfPizzas) {
    window.localStorage.setItem("value", noOfPizzas);
    window.localStorage.setItem("timestamp", new Date().getTime());
}

// Change the value displayed in the input field
function changeDisplayedValue(change) {
    let newValue = 0;
    // Make sure the change is valid (+-1)
    if (change === -1 || change === +1) {
        newValue = Number(inputField.value) + change;
    }
    else {
        newValue = change;
    }
    // If the new value is valid (over 0), update info
    if (newValue > 0) {
        setDisplayedValue(newValue);
        updateIngredients(newValue);
    }
    // The minimum value is 1
    else {
        setDisplayedValue(1);
    }
    // Save changes
    saveNumberOfPizzas(inputField.value);
}

// Update log (shows when number of pizzas was last saved)
function updateLog() {
    let delta = 0;
    // If value exists in local storage
    if (window.localStorage.getItem("value")) {
        // Get delta time from now to the time of the last save
        delta = (new Date().getTime() - new Date().setTime(window.localStorage.getItem("timestamp"))) / 1000;
        logContainer.textContent = `Last saved: ${delta} s ago`;
    }
    // If value doesn't exist, use default number of pizzas
    else {
        inputField.value = defaultNoOfPizzas;
    }
}

/* ============
   DOM elements
   ============ */
// Element to contain log
const logContainer = document.getElementById("log");

// Buttons to increment/decrement number of pizzas
const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");

// Element to contain input field with number of pizzas
const inputContainer = document.getElementById("input-container");

// Input field with number of pizzas
const inputField = document.createElement("input");
inputField.id = "number_of_pizzas";
inputField.addEventListener("keyup", () => updateIngredients(this.value));

// Add input field to its container
inputContainer.appendChild(inputField);

// If input field has no value, get previous value from localStorage
if (!inputField.value) {
    inputField.value = window.localStorage.getItem("value");
}

/* ======
   Events
   ====== */
// Allow buttons to increment/decrement number of pizzas
minusBtn.addEventListener("click", () => changeDisplayedValue(-1));
plusBtn.addEventListener("click", () => changeDisplayedValue(+1));
// Allow typing a number into the input field
inputField.addEventListener("keyup", () => changeDisplayedValue(inputField.value));
// Prevent form from submitting when clicking buttons
document.myForm.addEventListener("submit", e => e.preventDefault());

/* =======
   On load
   ======= */
// Log
updateLog();
setInterval(updateLog, 5000);  // Update log every 5 seconds

// Initialize recipe
updateIngredients(document.myForm.number_of_pizzas.value);
