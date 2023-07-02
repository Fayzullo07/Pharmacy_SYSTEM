import React, { useEffect, useState } from "react";

const SelectInput = ({
  name,
  value,
  handleInputChange,
  isRequired = false,
  placeholder = "",
  data,
  disabled = false
}) => {
  const [placeholderInput, setPlaceholderInput] = useState("");

  useEffect(
    () => {
      switch (placeholder) {
        case "Filialni tanlang":
          setPlaceholderInput("Filialni tanlang");
          break;
        case "Xodimni tanlang":
          setPlaceholderInput("Xodimni tanlang");
          break;
        case "Xarajat turi":
          setPlaceholderInput("Xarajat turi");
          break;
        default:
          setPlaceholderInput("Select");
      }
    },
    [placeholder]
  );
  return (
    <div className="form-floating">
      <select
        className="form-select mb-3"
        name={name}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
      >
        <option value="">
          {placeholderInput} . . .
        </option>
        {data.map(item =>
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        )}
      </select>
      <label>
        {placeholderInput}{" "}
        {isRequired ? <b className="text-danger">*</b> : null}
      </label>
    </div>
  );
};

export default SelectInput;
