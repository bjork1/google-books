import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function BuyBtn(props) {
  return (
    <span className="buy-btn" {...props} role="button" tabIndex="0">
      Buy Book
    </span>
  );
}

export default BuyBtn;
