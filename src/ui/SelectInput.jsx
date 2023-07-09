import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("translation", { keyPrefix: "Modal" });
  useEffect(
    () => {
      switch (placeholder) {
        case "Filialni tanlang":
          setPlaceholderInput(t(12));
          break;
        case "Xodimni tanlang":
          setPlaceholderInput(t(13));
          break;
        case "Xarajat turi":
          setPlaceholderInput(t(14));
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
