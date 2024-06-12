import Header from "./Components/Layout/Header/Header";
import MealList from "./Components/Meals/MealList/MealList";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";
import Order from "./Components/Order/Order";

function App() {

  const [modalVisibility, setModalVisiblity] = useState(false);
  const [orderModalNeed, setOrderModalNeed] = useState(false);

  const clickHandler = () => {
    setModalVisiblity(true);
  }

  function cancelModal() {
    setModalVisiblity(false);
  }

  function orderModal() {
    cancelModal();
    setOrderModalNeed(true);
  }

  function orderedModal() {
    setOrderModalNeed(false);
  }

  return <CartProvider>
    {orderModalNeed && <Order onBackdrop={() => {
      cancelModal();
      orderedModal();
    }} onClose={() => {
      orderedModal();
      clickHandler();
    }} />}
    {modalVisibility && <Cart onOrder={orderModal} onClose={cancelModal} />}
    <Header onClick={clickHandler} ></Header>
    <main>
      <MealList />
    </main>
  </CartProvider>
}

export default App;
