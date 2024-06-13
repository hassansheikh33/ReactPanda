import classes from './Cart.module.css'
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux-store/cart-slice';
import { uiActions } from '../../redux-store/ui-slice';

export default function Cart() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    function addItemHandler(item) {
        dispatch(cartActions.addToCart({ ...item, amount: 1 }));
    }

    function removeItemHandler(id) {
        dispatch(cartActions.removeFromCart(id));
    }

    function orderHandler() {
        dispatch(uiActions.showCheckOutModal());
    }

    function hideCartHandler() {
        dispatch(uiActions.hideCart());
    }

    const cartItems = <ul
        className={classes['cart-items']}>
        {cart.items.map(item => <CartItem
            key={Math.random()}
            price={item.price}
            amount={item.amount}
            name={item.name}
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}
        />)}
    </ul>

    return <Modal onClose={hideCartHandler}>
        {cart.items.length > 0 && cartItems}
        {cart.items.length === 0 && <h2 className={classes.empty}>Your Cart is Empty!</h2>}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>${cart.totalAmount.toFixed(2)}</span>
        </div>
        <div className={classes.actions}>
            <button type='button' className={classes['button--alt']} onClick={hideCartHandler}>Close</button>
            {cart.items.length > 0 && <button className={classes.button} onClick={orderHandler}>Checkout</button>}
        </div>
    </Modal>
}
