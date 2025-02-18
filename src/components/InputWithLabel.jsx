import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function InputWithLabel({ id, value, onChange, children }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
  );
}

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
