import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  function menuHandler() {
    navigate("/menu");
  }

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <h2>Welcome to ReactPanda</h2>
      <p>Get Discounted Deals today</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, nam.
      </p>
      <p style={{ color: "skyblue", cursor: "pointer" }} onClick={menuHandler}>
        Checkout <span style={{ textDecoration: "underline" }}>Menu</span> for
        Pandalicious Deals!
      </p>
    </div>
  );
}
