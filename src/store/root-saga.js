// encapsulate all of the different sagas

import { all, call } from 'redux-saga/effects';
import { categoriesSagas } from './categories/category.saga';
import { userSagas } from './user/user.saga';

 // aggregator function for all other SAGAs in the App
 
 export function* rootSaga() {
    yield all([ call(categoriesSagas), call(userSagas) ]);
 }