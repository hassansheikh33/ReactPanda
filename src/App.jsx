import Header from "./Components/Layout/Header/Header";
import MealList from "./Components/Meals/MealList/MealList";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartData } from "./redux-store/cart-actions";
import { sendCartData } from "./redux-store/cart-actions";

let first = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const showCheckOutModal = useSelector(state => state.ui.showCheckOutModal)
  const showCart = useSelector(state => state.ui.showCartModal);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if (first) {
      first = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

  return <>
    {showCheckOutModal && <Order />}
    {showCart && <Cart />}
    <Header />
    <main>
      <MealList />
    </main>
  </>
}

export default App;
