import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const PhoneInput = ({
  name,
  value,
  handleInputChange,
  handleSubmit,
  isRequired = false,
  placeholder = ""
}) => {
  const [placeholderInput, setPlaceholderInput] = useState("");

  useEffect(
    () => {
      switch (placeholder) {
        case "Qabul qiluvchining telefon nomeri":
          setPlaceholderInput("Qabul qiluvchining telefon nomeri");
          break;
        default:
          setPlaceholderInput("Telefon raqam kiriting");
      }
    },
    [placeholder]
  );
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
        {placeholderInput}{" "}
        {isRequired ? <b className="text-danger">*</b> : null}
      </label>
    </div>
  );
};

export default PhoneInput;
