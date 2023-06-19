import React from "react";
import "./button.css";

function Button(props) {
  function handleClick() {
    if (props.handleClick && typeof props.handleClick === "function") {
      props.handleClick();
    }
  }

  return (
    <button className="default" onClick={handleClick}>
      {props.label}
    </button>
  );
}

export default Button;
