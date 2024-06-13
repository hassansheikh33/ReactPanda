import classes from './CartButton.module.css'
import CartIcon from './CartIcon'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { uiActions } from '../../../redux-store/ui-slice'
import { useDispatch } from 'react-redux'

export default function CartButton(props) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [buttonHighlight, setButtonHighlight] = useState(false)

    useEffect(() => {
        if (cart.items.length === 0) {  ////here we have an if check to prevent the useEffect() from running when the app is loaded (cart items will be empty)
            return;
        }
        setButtonHighlight(true);   //this is ran after the function in the return (clearTimeout)
        const timer = setTimeout(() => setButtonHighlight(false), 300);

        return (() => clearTimeout(timer)); //this runs before the above code
    }, [cart.items]);     //this is so that useEffect() only runs when the items change

    const btnClasses = `${classes.button} ${buttonHighlight ? classes.bump : ''}`;

    function clickHandler() {
        dispatch(uiActions.showCart());
    }

    return (
        <button className={btnClasses} onClick={clickHandler}>
            <span className={classes.icon}><CartIcon></CartIcon></span>
            <span>Go to Cart</span>
            <span className={classes.badge}>{cart.totalItems}</span>
        </button>
    )
}