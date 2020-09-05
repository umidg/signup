import React from "react";

const myButton = (props) => {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.handleClick}
    >
      {props.label}
    </button>
  );
};

export default myButton;
