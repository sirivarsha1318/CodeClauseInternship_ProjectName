
const form = document.getElementById('recipe-form');


const recipeList = document.getElementById('recipe-list');


function addRecipeToLocalStorage(recipe) {
 
  let recipes = localStorage.getItem('recipes');
  if (!recipes) {
    recipes = [];
  } else {
    recipes = JSON.parse(recipes);
  }


  recipes.push(recipe);

 
  localStorage.setItem('recipes', JSON.stringify(recipes));
}


function displayRecipes() {
  
  let recipes = localStorage.getItem('recipes');
  if (!recipes) {
    recipes = [];
  } else {
    recipes = JSON.parse(recipes);
  }

  
  recipeList.innerHTML = '';


  recipes.forEach((recipe, index) => {
    const recipeHTML = `
      <div class="recipe">
        <h2>${recipe.name}</h2>
        <p>Ingredients: ${recipe.ingredients}</p>
        <p>Instructions: ${recipe.instructions}</p>
        <img src="${recipe.image}" alt="${recipe.name}">
        <button class="delete-button" data-index="${index}">Delete</button>
      </div>
    `;
    recipeList.innerHTML += recipeHTML;
  });


  const deleteButtons = recipeList.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      deleteRecipeFromLocalStorage(index);
    });
  });
}


function deleteRecipeFromLocalStorage(index) {
  
  let recipes = localStorage.getItem('recipes');
  if (!recipes) {
    recipes = [];
  } else {
    recipes = JSON.parse(recipes);
  }

  
  recipes.splice(index, 1);

  
  localStorage.setItem('recipes', JSON.stringify(recipes));

 
  displayRecipes();
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const recipeName = document.getElementById('recipe-name').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;
  const imageInput = document.getElementById('image');
  const imageFile = imageInput.files[0];

 
  const reader = new FileReader();
  reader.onload = () => {
    const imageData = reader.result;
    const recipe = {
      name: recipeName,
      ingredients: ingredients,
      instructions: instructions,
      image: imageData
    };

    
    addRecipeToLocalStorage(recipe);

    
    form.reset();

 
    displayRecipes();
  };
  reader.readAsDataURL(imageFile);
});


displayRecipes();
