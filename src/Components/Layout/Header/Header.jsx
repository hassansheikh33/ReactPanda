import classes from './Header.module.css'
import meals from '../../assets/meals.jpg'
import CartButton from '../CartButton/CartButton';

export default function Header(props) {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactPanda</h1>
                <CartButton onClick={props.onClick}> </CartButton>
            </header>
            <div className={`${classes['main-image']}`}>
                <img src={meals} alt="table full of food" />
            </div>
        </>
    );
}