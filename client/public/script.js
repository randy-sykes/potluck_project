// Select the table that we are adding to
const table = document.querySelector("table");
// Select the first ingredient table row with inputs
const ingredientRow = document.querySelectorAll("tr")[1];
// Select the button to add ingredients
const ingredientsBtn = document.querySelector("#addIngredientsBtn");

ingredientsBtn.addEventListener("click", () => {
  let newIngredient = ingredientRow.cloneNode(true);
  let inputs = newIngredient.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
  table.appendChild(newIngredient);
});

function deleteRow(r) {
  let element = r.parentNode.parentNode.rowIndex;
  if (element > 1) {
    document.getElementById("ingredientsList").deleteRow(element);
  }
}
