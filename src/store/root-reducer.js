import { combineReducers } from "redux";

import { cartReducer } from "./cart/cart.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer";


// keys are name of reducer slice and value is actual reducer function itself
export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
});