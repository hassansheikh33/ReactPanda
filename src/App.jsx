import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { lazy } from "react";
import Cart from "./Components/Cart/Cart";
import Order from "./Components/Order/Order";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartData } from "./redux-store/cart-actions";
import { sendCartData } from "./redux-store/cart-actions";
import Root from "./pages/Root";
const Welcome = lazy(() => import("./pages/Welcome"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
let first = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "menu",
        Component: lazy(() => import("./Components/Meals/MealList/MealList")),
      },
      {
        path: "aboutUs",
        Component: lazy(() => import("./pages/AboutUs")),
      },
      {
        path: "cart",
        Component: lazy(() => import("./Components/Cart/Cart")),
      },
      {
        path: "checkout",
        Component: lazy(() => import("./Components/Order/Order")),
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const showCheckOutModal = useSelector((state) => state.ui.showCheckOutModal);
  const showCart = useSelector((state) => state.ui.showCartModal);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (first) {
      first = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

  return (
    <>
      <RouterProvider router={router}>
        {showCheckOutModal && <Order />}
        {showCart && <Cart />}
      </RouterProvider>
    </>
  );
}

export default App;
