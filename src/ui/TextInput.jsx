import React, { useEffect, useState } from "react";

const TextInput = ({
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
        case "F.I.O":
          setPlaceholderInput("F.I.O");
          break;
        case "Mahsulot nomi":
          setPlaceholderInput("Mahsulot nomi");
          break;
        case "Manzil":
          setPlaceholderInput("Manzil");
          break;
        case "Firma nomi":
          setPlaceholderInput("Firma nomi");
          break;
        case "Ismingiz":
          setPlaceholderInput("Ismingiz");
          break;
        case "Familiyangiz":
          setPlaceholderInput("Familiyangiz");
          break;
        case "Kimgdan qarz olindi":
          setPlaceholderInput("Kimgdan qarz olindi");
          break;
        default:
          setPlaceholderInput("Text");
      }
    },
    [placeholder]
  );

  return (
    <div className="form-floating mb-3">
      <input
        type="text"
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

export default TextInput;
