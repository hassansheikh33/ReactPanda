import classes from './Cart.module.css'
import Modal from '../UI/Modal/Modal';
import cartContext from '../../store/cart-context';
import { useContext } from 'react';
import CartItem from './CartItem/CartItem';

export default function Cart(props) {
    const cartCxt = useContext(cartContext);

    function addItemHandler(item) {
        cartCxt.addItem({ ...item, amount: 1 });
    }

    function removeItemHandler(id) {
        cartCxt.removeItem(id);
    }

    function orderHandler() {
        props.onOrder();
    }

    const cartItems = <ul
        className={classes['cart-items']}>
        {cartCxt.items.map(item => <CartItem
            key={Math.random()}
            price={item.price}
            amount={item.amount}
            name={item.name}
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}
        />)}
    </ul>

    const total = cartCxt.items.reduce((currentTotal, item) => {
        return currentTotal + (item.price * item.amount)
    }, 0)

    return <Modal onClose={props.onClose}>
        {cartCxt.items.length > 0 && cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
        </div>
        <div className={classes.actions}>
            <button type='button' className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {cartCxt.items.length > 0 && <button className={classes.button} onClick={orderHandler}>Checkout</button>}
        </div>
    </Modal>
}
