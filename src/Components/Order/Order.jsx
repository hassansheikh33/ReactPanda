import classes from "./Order.module.css";
import { useState } from "react";
import OrderForm from "./OrderForm";
import { useDispatch, useSelector } from "react-redux";
import { order } from "../../redux-store/cart-actions";
import { useNavigate } from "react-router-dom";

export default function Order(props) {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [confirmed, setConfirmed] = useState(false);

  function orderHandler(name, address, note) {
    if (note.trim() !== "") {
      dispatch(order(cart, name, address, note));
    } else {
      dispatch(order(cart, name, address));
    }
    setConfirmed(true);
  }

  let itemNames = "";
  if (cart.items.length === 1) {
    itemNames += `${cart.items[0].amount}x ${cart.items[0].name}`;
  } else {
    cart.items.map((item, index) => {
      itemNames += `${item.amount}x ${item.name}, `;
      if (index === cart.items.length - 1) {
        itemNames += `${item.amount}x ${item.name}`;
      }
      return itemNames;
    });
  }

  function closeCheckoutHandler() {
    navigate("/menu");
  }

  return (
    <div className={classes.container}>
      {confirmed && (
        <>
          <h2 className={classes.center}>Thank You for Ordering !</h2>
          <p style={{ textAlign: "center" }}>
            Still Hungry?{" "}
            <span className={classes.menu} onClick={closeCheckoutHandler}>
              Go to Menu?
            </span>
          </p>
        </>
      )}
      {!confirmed && (
        <>
          <h2 className={classes.center}>Confirm Your Order!</h2>
          <h3>Your Items: {itemNames}</h3>
          <h3>Total Amount: ${cart.totalAmount.toFixed(2)}</h3>
          <OrderForm onSubmit={orderHandler}></OrderForm>
        </>
      )}
    </div>
  );
}
