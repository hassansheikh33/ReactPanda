import classes from './CartButton.module.css'
import CartIcon from './CartIcon'
import cartContext from '../../../store/cart-context'
import { useContext, useEffect, useState } from 'react'

export default function CartButton(props) {

    const [buttonHighlight, setButtonHighlight] = useState(false)

    const cartCtx = useContext(cartContext);    //due to usage of conteext here, React will rerender this comopent everytime the context changes.
    const { items } = cartCtx;
    //the reduce method's first arg is the callbackFunc, second arg is the intial value of total
    const numberOfItems = items.reduce((currentTotal, item) => {  //the callback's first arg is the currentTotal, second arg is the current item
        return currentTotal + item.amount;
    }, 0)

    useEffect(() => {
        if (items.length === 0) {  ////here we have an if check to prevent the useEffect() from running when the app is loaded (cart items will be empty)
            return;
        }
        setButtonHighlight(true);   //this is ran after the function in the return (clearTimeout)
        const timer = setTimeout(() => setButtonHighlight(false), 300);

        return (() => clearTimeout(timer)); //this runs before the above code
    }, [items]);     //this is so that useEffect() only runs when the items change

    const btnClasses = `${classes.button} ${buttonHighlight ? classes.bump : ''}`;

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon></CartIcon></span>
            <span>Go to Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}