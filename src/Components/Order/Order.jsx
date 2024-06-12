import cartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import classes from './Order.module.css'
import { useContext, useCallback, useState } from 'react';
import OrderForm from './OrderForm';

export default function Order(props) {

    const [confirmed, setConfirmed] = useState(false);
    const cartCxt = useContext(cartContext);

    const postOrder = useCallback(async (name, address, note) => {

        try {
            const response = await fetch('https://http-react-cc4f7-default-rtdb.firebaseio.com/Orders.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalAmount: `$${cartCxt.totalAmount.toFixed(2)}`,
                    items: cartCxt.items,
                    name,
                    address,
                    sideNote: note
                })
            });
            if (!response.ok) {
                throw new Error(`An error occured, status: ${response.status}`);
            }
        } catch (err) {
            console.log(err);
        }
    }, [cartCxt.items, cartCxt.totalAmount]);



    function orderHandler(name, address, note) {
        postOrder(name, address, note);
        cartCxt.order();
        setConfirmed(true);
    }

    let itemNames = '';
    cartCxt.items.map(item => itemNames += item.amount + 'x ' + item.name + ', ');

    return <Modal onClose={props.onBackdrop}>
        {confirmed && <>
            <h2 className={classes.center}>Thank You for Ordering !</h2>
            <button type='button' className={classes['button--alt'] + ' centerBtn'} onClick={props.onBackdrop}>Close</button>
        </>}
        {!confirmed && (<>
            <h2 className={classes.center}>Confirm Your Order!</h2>
            <h3>Your Items: {itemNames}</h3>
            <h3>Total Amount: ${cartCxt.totalAmount.toFixed(2)}</h3>
            <OrderForm onClose={props.onClose} onSubmit={orderHandler}></OrderForm></>)}
    </Modal >



}