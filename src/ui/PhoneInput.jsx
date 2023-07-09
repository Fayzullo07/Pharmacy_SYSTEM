import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const PhoneInput = ({
  name,
  value,
  handleInputChange,
  handleSubmit,
  isRequired = false,
  placeholder = ""
}) => {
  const [placeholderInput, setPlaceholderInput] = useState("");
  const { t } = useTranslation("translation", { keyPrefix: "Modal" });
  useEffect(
    () => {
      switch (placeholder) {
        case "Qabul qiluvchining telefon nomeri":
          setPlaceholderInput(t(10));
          break;
        default:
          setPlaceholderInput(t(11));
      }
    },
    [placeholder]
  );
  return (
    <div className="form-floating mb-3">
      <input
        type="tel"
        className="form-control"
        placeholder={placeholder}
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
