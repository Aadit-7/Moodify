import React from "react";

const InputContainer = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label} : </label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        id={label}
        name={label}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputContainer;
