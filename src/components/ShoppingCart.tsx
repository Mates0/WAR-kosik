import React from 'react';
import styles from '../styles/ShoppingCart.module.css';

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
    | { type: 'update'; payload: { itemId: number; quantity: number } }


type Props = {
    cartItems: Item[];
    dispatch: React.Dispatch<Action>;
};

function ShoppingCart({ cartItems, dispatch }: Props) {

    const addToCart = () => {
        const newItem: Item = { id: Date.now(), name: 'New Item', price: 10, quantity: 1 };
        dispatch({ type: 'add', payload: newItem });
    };

    const removeFromCart = (itemId: number) => {
        dispatch({ type: 'remove', payload: itemId });
    };

    const updateQuantity = (itemId: number, quantity: number) => {
        dispatch({
            type: 'update',
            payload: {
                itemId,
                quantity,
            },
        });
    };


    const clearCart = () => {
        dispatch({ type: 'clear' });
    };

    return (
        <div>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} {"Price:"} {item.price} {","} {"Quantity:"} {item.quantity}
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className={styles.buttongreen}>+</button>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={styles.buttonred}>-</button>
                        <button onClick={() => removeFromCart(item.id)} className={styles.buttonred}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addToCart()} className={styles.button}>Add to Cart</button>
            <button onClick={() => clearCart()} className={styles.button}>Clear Cart</button>
        </div>
    );
}

export default ShoppingCart;
