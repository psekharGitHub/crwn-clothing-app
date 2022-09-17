import { useReducer } from "react";
import { createContext } from "react"
import { createAction } from "../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "../store/cart/cart.types";

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
    
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    /**
     * payload = {
     *      cartItems,
     *      cartCount,
     *      cartTotal
     * }
     */
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS :
            return {
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN :
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled error of type ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }) => {
    // const [ isCartOpen, setIsCartOpen ] = useState(false);
    // const [ cartItems, setCartItems ] = useState([]);
    // const [ cartCount, setCartCount ] = useState(0);
    // const [ cartTotal, setCartTotal ] = useState(0);

    
    // const [ state, dispatch ] = useReducer(arg1{reducer}, arg2{INITIAL_STATE});
    const [ { isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    // // useEffect is triggered when its dependent(cartItems array) is modified.
    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total+cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total+(cartItem.quantity*cartItem.price), 0);
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    // Reducer
    const updateCartItemReducer = (newCartItems) => {
        
        // generate newCartCount
        const newCartCount = newCartItems.reduce((total, cartItem) => total+cartItem.quantity, 0);
        
        // generate newCartTotal
        const newCartTotal = newCartItems.reduce((total, cartItem) => total+(cartItem.quantity*cartItem.price), 0);
    
        // dispatch new ACTION with payload = { newCartItems, newCartTotal, newCartCount }
        // the object inside dispatch is the ACTION value which goes to cartReducer's 2nd parameter, 'action'
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
                { 
                    cartItems: newCartItems,
                    cartTotal: newCartTotal,
                    cartCount: newCartCount 
                })
        );
    }

    /**
     * The point of contact to outside APIs are addItemToCart, removeItemFromCart, clearItemFromCart
     * so, using these functions, the change in cartItems are noted and updated cartItems state is
     * sent to updateCartItemReducer, which then dispatched ACTION with latest state to our reducer
     * cartReducer using useReducer() function.
     */ 
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        );
    }
  
    const value = { 
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}> {children} </CartContext.Provider>;
}