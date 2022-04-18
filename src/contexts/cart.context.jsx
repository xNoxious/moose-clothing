import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const deleteItemFromCart = (cartItemToDelete) => {
        setCartItems(deleteCartItem(cartItems, cartItemToDelete));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, deleteItemFromCart, cartCount, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}