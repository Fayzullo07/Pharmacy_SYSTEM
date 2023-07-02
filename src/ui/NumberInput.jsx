import React, { useEffect, useState } from "react";

const NumberInput = ({
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
        case "Mahsulot summasi":
          setPlaceholderInput("Mahsulot summasi");
          break;
        default:
          setPlaceholderInput("Miqdor");
      }
    },
    [placeholder]
  );

  return (
    <div className="form-floating mb-3">
      <input
        type="number"
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

export default NumberInput;
