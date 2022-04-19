import CART_ACTION_TYPES from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (bool) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const deleteItemFromCart = (cartItems, cartItemToDelete) => {
    const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

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