import classes from "./Header.module.css";
import meals from "../../../assets/meals.jpg";
import CartButton from "../CartButton/CartButton";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.linkcontainer}>
            <NavLink to="/" className={classes.link}>
              <h1>ReactPanda</h1>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes.link} ${classes.active}`
                  : `${classes.link}`
              }
              to="/menu"
            >
              Menu
            </NavLink>{" "}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes.link} ${classes.active}`
                  : `${classes.link}`
              }
              to="/aboutUs"
            >
              AboutUs
            </NavLink>
          </ul>
        </nav>
        <NavLink to="/cart">
          <CartButton />
        </NavLink>
      </header>
      <div className={`${classes["main-image"]}`}>
        <img src={meals} alt="table full of food" />
      </div>
    </>
  );
}
