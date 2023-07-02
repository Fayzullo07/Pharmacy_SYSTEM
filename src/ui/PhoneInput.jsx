import React from "react";

const PhoneInput = ({
  name,
  value,
  handleInputChange,
  handleSubmit,
  isRequired = false
}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type="tel"
        className="form-control"
        placeholder="Telefon raqam kiriting"
        name={name}
        value={value}
        onChange={handleInputChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <label>
        Telefon raqam kiriting{" "}
        {isRequired ? <b className="text-danger">*</b> : null}
      </label>
    </div>
  );
};

export default PhoneInput;
