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

// All ingredients that need to be updated
const ingredients = [
    new Ingredient("water",      65,  document.getElementById("water")),
    new Ingredient("oil",        10,  document.getElementById("oil")),
    new Ingredient("yeast",      1.5, document.getElementById("yeast")),
    new Ingredient("salt",       2,   document.getElementById("salt")),
    new Ingredient("brownsugar", 3,   document.getElementById("brownsugar")),
    new Ingredient("flour",      100, document.getElementById("flour")),
];

function changePizzas(numberOfPizzas) {
    updateIngredients(numberOfPizzas);
}

function updateIngredients(base) {
    ingredients.forEach(ingredient => ingredient.updateAmount(base));
}

// idRef is the ID of the element
// change is the number to change the value of the ID with
function changeInputNumberValue(idRef, change) {
    var valueWithChange = 0;
    // only add/subtract
    if (change == -1 || change == +1) {
        valueWithChange = parseInt(getValue(idRef)) + change;
    }
    else {
        valueWithChange = change;
    }
    if (valueWithChange > 0) {
    changeInputText(idRef, valueWithChange);
    changePizzas(valueWithChange);
    }
    else {
        changeInputText(idRef, 1);
    }
    saveNumberOfPizzas(area.value);
}

function getValue(idRef) {
    // Make sure browser supports getElementById
    if(!document.getElementById) return;
    // Find the input by it's id
    var inputObj = document.getElementById(idRef);
    return inputObj.value;
}

// TODO move to common
// Assign the value to the input with the id passed in
function changeInputText(idRef, val) {
    // Make sure browser supports getElementById
    if(!document.getElementById) return;
    // Find the input by it's id
    var inputObj = document.getElementById(idRef);
    if (inputObj) {
        // Update the value
        inputObj.value = val;
    }
}

var area = document.createElement("input");
area.id = "number_of_pizzas";
area.onkeyup = "changePizzas(value);";

document.querySelector("#contentX").appendChild(area);

// place content from previous edit
if (!area.value) {
    area.value = window.localStorage.getItem("value");
}

// your content will be saved locally
area.addEventListener("keyup", function () {
    changeInputNumberValue(document.myForm.number_of_pizzas.id, area.value);
}, false);

updateLog();
setInterval(updateLog, 5000); // show time every 5 seconds
function updateLog() {
    var delta = 0;
    if (window.localStorage.getItem('value')) {
        delta = ((new Date()).getTime() - (new Date()).setTime(window.localStorage.getItem('timestamp'))) / 1000;
        document.querySelector("#log").innerHTML = 'last saved: ' + delta + 's ago';
    } 
    else {
        area.value = "4";
    }
}

function saveNumberOfPizzas(value) {
    window.localStorage.setItem("value", value);
    window.localStorage.setItem("timestamp", (new Date()).getTime());
}

const minusBtn = document.getElementById("minus-btn");
const plusBtn = document.getElementById("plus-btn");

document.myForm.addEventListener("submit", e => e.preventDefault());

minusBtn.addEventListener("click", () => {
    changeInputNumberValue(document.myForm.number_of_pizzas.id, -1);
});
plusBtn.addEventListener("click", () => {
    changeInputNumberValue(document.myForm.number_of_pizzas.id, +1);
});

updateIngredients(document.myForm.number_of_pizzas.value);
