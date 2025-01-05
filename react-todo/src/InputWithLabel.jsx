import React from "react";

function InputWithLabel({ id, value, type = "text", onInputChange, children }) {
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

export default InputWithLabel