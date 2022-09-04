import { createContext, useEffect, useState } from "react"

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


export const CartContext = createContext({
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addItemToCart: () => {},     // it is not necessary to provide useState setter function in context. We can add other functions as well.
        removeItemFromCart: () => {},
        clearItemFromCart: () => {},
        cartCount: 0,
        cartTotal: 0
    });

export const CartProvider = ({ children }) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    // useEffect is triggered when its dependent(cartItems array) is modified.
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total+cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total+(cartItem.quantity*cartItem.price), 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }
 
    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal };

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>;
}