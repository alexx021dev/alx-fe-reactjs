import { useState } from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import useRecipeStore from "./store/recipeStore";
import "./App.css";

function App() {
  const recipes = useRecipeStore(state => state.recipes);
  return (
    <div>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default App;
