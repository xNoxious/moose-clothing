import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    const existsCartItem = cartItems.find((cartItem) =>
        cartItem.id === productToAdd.id
    );

    if (existsCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 } // returning a new object forces React to re-render which is what we want in this case.
                : cartItem
        );
    }

    // if item doesn't exist, create it.
    // we are basically extending our products array by adding quantity to each object.
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existsCartItem = cartItems.find((cartItem) =>
        cartItem.id === cartItemToRemove.id
    );

    if (existsCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const deleteCartItem = (cartItems, cartItemToDelete) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    deleteItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }

        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, isCartOpen, cartCount, cartTotal } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const deleteItemFromCart = (cartItemToDelete) => {
        const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
        updateCartItemsReducer(newCartItems);
    }


    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, deleteItemFromCart, cartCount, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}