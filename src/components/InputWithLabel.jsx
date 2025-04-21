import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function InputWithLabel({ id, value, type = "text", onInputChange, children }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Only run once on mount

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        id={id}
        value={value}
        type={type}
        onChange={onInputChange}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired, // 🔥 FIXED: was misspelled `isRequried`
  type: PropTypes.string,
  children: PropTypes.node,
};

export default InputWithLabel;
