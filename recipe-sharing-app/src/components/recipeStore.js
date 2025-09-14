import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, recipe],
    filteredRecipes: [...state.recipes, recipe] // keep filtered updated
  })),

  setSearchTerm: (term) => set((state) => {
    const filtered = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    );
    return { searchTerm: term, filteredRecipes: filtered };
  }),
}));
