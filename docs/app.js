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

// Save chosen number of pizzas to localStorage
function saveNumberOfPizzas(noOfPizzas) {
    window.localStorage.setItem("value", noOfPizzas);
    window.localStorage.setItem("timestamp", new Date().getTime());
}

// Change the value displayed in the input field
function setDisplayedValue(newValue) {
    if (newValue <= 0) {
        newValue = 1;
    }
    // If the new value is valid (over 0), update info
    inputField.value = newValue;
    updateIngredients(newValue);
    // Save changes
    saveNumberOfPizzas(inputField.value);
}

/* ============
   DOM elements
   ============ */
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
minusBtn.addEventListener("click", () => setDisplayedValue(Number(inputField.value) - 1));
plusBtn.addEventListener("click", () => setDisplayedValue(Number(inputField.value) + 1));
// Allow typing a number into the input field
inputField.addEventListener("keyup", () => setDisplayedValue(inputField.value));
// Prevent form from submitting if the user presses return
document.myForm.addEventListener("submit", e => e.preventDefault());

/* =======
   On load
   ======= */
// Initialize recipe
updateIngredients(document.myForm.number_of_pizzas.value);
