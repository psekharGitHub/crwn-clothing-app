import { CATEGORIES_ACTION_TYPES, Category, CategoryItem } from "./category.types";
import { ActionWithPayload, Action, createAction } from "../../utils/reducer/reducer.utils";

// Initially used Action Creator
// export const setCategories = (categoriesArray) => 
//     createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

// Forming a UNION

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

// Action Creator
export const fetchCategoriesStart = (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray: Category[]): FetchCategoriesSuccess => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error: Error): fetchCategoriesFailed => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
