import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
 
/** Substitution: Thunk to SAGA
 await() --> yield call(arg1, arg2), arg1 = function name, arg2 = parameter for the function
 - getCategoriesAndDocuments returns a string, call that string with parameter/name of 'categories' 
 - call() turns a function to an effect. An effect is a plain object that is trying to explain what is
    happening

 dispatch() --> put()
 yield all() --> run all the generators
 * */ 

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));     // generator version of dispatch
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}


// categories saga aggregator
export function* categoriesSagas() {
    yield all([ call(onFetchCategories) ]);
}