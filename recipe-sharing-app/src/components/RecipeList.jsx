import React from 'react';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <li key={index}>{recipe.title}</li>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
