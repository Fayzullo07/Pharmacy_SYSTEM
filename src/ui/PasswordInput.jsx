import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PasswordInput = ({
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
        case "Parol":
          setPlaceholderInput(t(8));
          break;
        case "Parol qayta":
          setPlaceholderInput(t(9));
          break;
        default:
          setPlaceholderInput("Password");
      }
    },
    [placeholder]
  );

  return (
    <div className="form-floating mb-3">
      <input
        type="password"
        className="form-control"
        placeholder={placeholderInput}
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

export default PasswordInput;
