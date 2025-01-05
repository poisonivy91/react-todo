import React, { useRef, useEffect } from "react";


function InputWithLabel({ id, value, type = "text", onInputChange, children }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current)
        inputRef.current.focus();
    }, []);

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