import classes from "./QtyForm.module.css";
import Input from "../../../UI/Input/Input";
import React, { useState, useRef } from "react";

function QtyForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const enteredAmountRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const enteredAmount = Number(enteredAmountRef.current.value);
    if (
      enteredAmount === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5 ||
      enteredAmount === ""
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddtoCart(enteredAmount);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={enteredAmountRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          defaultValue: 1,
        }}
      ></Input>
      <button className={classes.addtoCart}>Add To Cart</button>
      {!amountIsValid && (
        <p
          style={{
            color: "red",
            fontSize: "0.8rem",
          }}
        >
          Please enter a valid amount (1-5)
        </p>
      )}
    </form>
  );
}

export default React.memo(QtyForm);
