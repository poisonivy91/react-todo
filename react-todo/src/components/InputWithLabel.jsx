import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";


function InputWithLabel({ id, value, type = "text", onInputChange, children }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current)
        inputRef.current.focus();
    }); // removed the dependency to continoulsy run

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input
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
    onInputChange: PropTypes.func.isRequired,
    type: PropTypes.string, 
};

export default InputWithLabel