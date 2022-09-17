import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// Initially used Action Creator
// export const setCategories = (categoriesArray) => 
//     createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

// Action Creators
export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
