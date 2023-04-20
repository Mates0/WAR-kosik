import React, { useReducer } from 'react';
import ShoppingCart from "@/components/ShoppingCart";

type Item = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Action =
    | { type: 'add'; payload: Item }
    | { type: 'remove'; payload: number }
    | { type: 'clear' }
    | { type: 'update'; payload: { itemId: number; quantity: number } };


const initialState: Item[] = [];

function cartReducer(state: Item[], action: Action): Item[] {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'remove':
            return state.filter((item) => item.id !== action.payload);
        case 'update':
            return state.map((item) =>
                item.id === action.payload.itemId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        case 'clear':
            return [];
        default:
            return state;
    }
}

function App() {
    const [cartItems, dispatch] = useReducer(cartReducer, initialState);

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ShoppingCart
                cartItems={cartItems}
                dispatch={dispatch}
            />
        </div>
    );
}

export default App;
