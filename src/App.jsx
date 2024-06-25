import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { fetchCartData } from "./redux-store/cart-actions";
import { sendCartData } from "./redux-store/cart-actions";
import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Welcome from "./pages/Welcome";
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

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

let first = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
