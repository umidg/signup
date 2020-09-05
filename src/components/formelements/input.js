import React from "react";
import PropTypes from "prop-types";
const myInput = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  error,
  children,
  label,
  ...props
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        style={error && { border: "solid 1px #f9acac" }}
      />
      {error ? <p style={{ color: " #ff4444" }}>{error}</p> : <p>&nbsp;</p>}
    </>
  );
};

myInput.defaultProps = {
  type: "text",
  className: "",
};

myInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "password", "email"]),
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default myInput;
