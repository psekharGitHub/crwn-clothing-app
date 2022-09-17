import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItem contain productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    
    //if found increment the quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem 
        )
    }        

    //return new array with modified cartItems/new cart item
    return [ ...cartItems, { ...productToAdd, quantity: 1 }];
}

/** Note: Each time we are creating a new cart item because if we just modify the existing cart object and
    pass it as props, react will not register it as a change in cart, and won't re-render the component. */

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    //check if the quantity is equal to 1, then remove the item from cart
    if (existingCartItem.quantity === 1) {
        return (cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id));
    }

    //return back cartItems with matching cart items with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
        ? { ...cartItem, quantity: cartItem.quantity - 1 } 
        : cartItem 
    );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToClear.id);

    if (existingCartItem) {
        return (cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id));
    }
}


export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

/** Instead of calling the Reuducer function, 'useReducer', in REDUX, we create an action,
 * that will be dispatched in cart.selector.js
 * 
 */
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}