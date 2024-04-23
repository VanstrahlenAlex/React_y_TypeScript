import { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService";
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";


export type RecipesSliceType = {
	categories: Categories,
	drinks: Drinks,
	selectedRecipe: Recipe,
	fetchCategories: () => Promise<void>,
	searchRecipe: (searchFilters : SearchFilter) => Promise<void>,
	selectRecipe: (id: Drink['idDrink']) => Promise<void>
}


export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
	categories: {
		drinks: []
	},
	drinks: {
		drinks: []
	},
	selectedRecipe: {

	} as Recipe,
	fetchCategories: async () => {
		const categories = await  getCategories()
		set({
			categories
		})
	},
	searchRecipe: async (filters) => {
		const drinks = await getRecipes(filters)
		set({
			drinks
		})
	},
	selectRecipe: async (id) => {
		// TODO
		const selectedRecipe = await getRecipeById(id);
		set({
			selectRecipe
		})
		
		
	}
})