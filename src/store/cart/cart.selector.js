import { createSelector } from "reselect";

// returns just the state slice that is governed by the slice of the reduce
const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

// generate newCartCount
export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total+cartItem.quantity, 0)
);

// generate newCartTotal
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total+(cartItem.quantity*cartItem.price), 0)
);
