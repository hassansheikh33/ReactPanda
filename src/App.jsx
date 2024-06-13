import Header from "./Components/Layout/Header/Header";
import MealList from "./Components/Meals/MealList/MealList";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order";
import { useSelector } from "react-redux";

function App() {
  const showCheckOutModal = useSelector(state => state.ui.showCheckOutModal)
  const showCart = useSelector(state => state.ui.showCartModal);

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
