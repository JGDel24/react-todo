import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";




function InputWithLabel({ id, value, onChange, children }) {

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <label htmlFor={id}>{children}</label>

      <input
        type="text"
        id={id}
        name="title"
        value={value}
        onChange={onChange}
        ref={inputRef}
      />

    </>
  )
}

InputWithLabel.protoTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default InputWithLabel;