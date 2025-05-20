const searchInput = document.getElementById("searching");
const searchBtn = document.getElementById("search-btn");
const resultsDiv = document.getElementById("recipes");

searchBtn.addEventListener("click", () => {
  const drinkName = searchInput.value.trim();
  if (drinkName !== "") {
    getCocktails(drinkName);
  }
});

async function getCocktails(name) {
  resultsDiv.innerHTML = "Searching...";

  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await res.json();

    if (data.drinks) {
      showDrinks(data.drinks);
    } else {
      resultsDiv.innerHTML = "No drinks found.";
    }
  } catch (error) {
    console.log(error);
    resultsDiv.innerHTML = "Something went wrong.";
  }
}

function showDrinks(drinks) {
  resultsDiv.innerHTML = "";

  drinks.forEach(drink => {
    const div = document.createElement("div");
    div.classList.add("drink-card");

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
      }
    }

    div.innerHTML = `
      <h3>${drink.strDrink}</h3>
      <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="150" />
      <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${ingredients.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;

    resultsDiv.appendChild(div);
  });
}

