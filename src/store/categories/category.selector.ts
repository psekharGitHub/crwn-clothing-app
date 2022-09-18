// Imports for Typescript
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

/**  Lesson 157 - Selector Bussiness Logic
 * 
 * This selector receives the data and transforms it into an array with title as index
 * and item object as value, i.e., move the transformation logic from firebase.utils.js
 * to category.selector.js
*/

/** createSelector provides memoization of state, i.e., if state has not changed or, if
 * it is cached already, then do not re-render. Just return it from cached data.
 * */ 

import { createSelector } from "reselect";

/** initial selector that returns to us the slice of the reducer that we need,
 * i.e., category reducer from root-reducer
 * 
 * This the only selector that gets cached at the input level, so even when user state
 * changes, the other two selectors: selectCategories, selectCategoriesMap, do not even
 * render, becuse catories array state did not change, only the user state did.
 * 
 * Instead of directly using 'state.categories.categories' inside 'selectCategoriesMap', we
 * break them up into 3 parts, out of which, last 2 are memoized selectors, that will help 
 * prevent unnecessary re-render.
 *  */  
const selectCategoryReducer = (state): CategoriesState => state.categories;

/** Decalaring Memoized Selector
 *  Takes 2 arguments: array of input selectors and array of output selectors
 *  input selector --> what do I want from redux so that I can use them to produce something
 *                      new outside 
 * output selector --> 
 * 
 * The important thing to note is that the only time the output selector is rendered, is only when
 * the input selector is updated. It means 'categoriesSlice.categories' will run iff 'categoriesSlice'
 * object received from 'selectCategoryReducer' selector is different
 */
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

/**
 * categories.reduce will happen only when the categories slice that we receive from selectCategoires,
 * which in turn is another memoized selector, changes/updates.
 */
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
     (categoriesSlice) => categoriesSlice.isLoading
);