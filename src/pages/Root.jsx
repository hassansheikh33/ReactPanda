import Header from "../Components/Layout/Header/Header";
import MealsSummary from "../Components/Meals/MealSummary/MealSummary";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export default function Root() {
  return (
    <>
      <Header />
      <MealsSummary />
      <main>
        <Suspense
          fallback={
            <h1 style={{ color: "whtie", textAlign: "center" }}>Loading...</h1>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
