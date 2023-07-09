import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NumberInput = ({
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
        case "Mahsulot summasi":
          setPlaceholderInput(t(1));
          break;
        case "Tushum summasi":
          setPlaceholderInput(t(2));
          break;
        case "Berilgan summasi":
          setPlaceholderInput(t(3));
          break;
        case "Chegirma summasi":
          setPlaceholderInput(t(4));
          break;
        case "Qarz summasi":
          setPlaceholderInput(t(5));
          break;
        case "Xarajat summasi":
          setPlaceholderInput(t(6));
          break;
        case "Ish haqi":
          setPlaceholderInput(t(7));
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
