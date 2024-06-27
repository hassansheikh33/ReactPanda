import classes from "./MealItem.module.css";
import QtyForm from "./QtyForm/QtyForm";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux-store/cart-slice";
import { useCallback } from "react";

export default function MealItem(props) {
  const dispatch = useDispatch();

  const AddtoCartHandler = useCallback(
    (amount) => {
      dispatch(
        cartActions.addToCart({
          name: props.name,
          price: props.price,
          id: props.id,
          amount: amount,
        })
      );
    },
    [props.name, dispatch, props.id, props.price]
  );

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
      </div>
      <div>
        <QtyForm onAddtoCart={AddtoCartHandler}></QtyForm>
      </div>
    </li>
  );
}
