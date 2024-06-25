import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux-store/cart-slice";
import { sendCartData } from "../../redux-store/cart-actions";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function addItemHandler(item) {
    dispatch(cartActions.addToCart({ ...item, amount: 1 }));
  }

  function removeItemHandler(id) {
    dispatch(cartActions.removeFromCart(id));
  }

  function orderHandler() {
    navigate("/checkout");
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cart.items.map((item) => (
        <CartItem
          key={Math.random()}
          price={item.price}
          amount={item.amount}
          name={item.name}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  function resetCartHandler() {
    dispatch(cartActions.setCart({ items: [], totalAmount: 0, totalItems: 0 }));
    dispatch(sendCartData({ items: [], totalAmount: 0, totalItems: 0 }));
  }

  return (
    <div className={classes.cartContainer}>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "2.5rem",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        Your Cart
      </h1>
      {cart.items.length > 0 && cartItems}
      {cart.items.length === 0 && (
        <h3 className={classes.empty}>
          Your Cart is Empty! Add some items to place an Order!{" "}
          <span className={classes.menu} onClick={() => navigate("/menu")}>
            Go to Menu?
          </span>
        </h3>
      )}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cart.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        {cart.items.length > 0 && (
          <button
            type="button"
            className={classes.resetCartBtn}
            onClick={resetCartHandler}
          >
            Empty Cart
          </button>
        )}
        {cart.items.length > 0 && (
          <button className={classes.button} onClick={orderHandler}>
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}
