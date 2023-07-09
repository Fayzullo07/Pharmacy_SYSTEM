import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TextInput = ({
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
        case "F.I.O":
          setPlaceholderInput(t(18));
          break;
        case "Mahsulot nomi":
          setPlaceholderInput(t(19));
          break;
        case "Manzil":
          setPlaceholderInput(t(20));
          break;
        case "Firma nomi":
          setPlaceholderInput(t(21));
          break;
        case "Ismingiz":
          setPlaceholderInput(t(22));
          break;
        case "Familiyangiz":
          setPlaceholderInput(t(23));
          break;
        case "Kimdan qarz olindi":
          setPlaceholderInput(t(24));
          break;
        case "Kimga qarz berildi":
          setPlaceholderInput(t(25));
          break;
        case "Qabul qiluvchi F.I.O":
          setPlaceholderInput(t(26));
          break;
        case "Olingan mahsulot nomi":
          setPlaceholderInput(t(27));
          break;
        case "Ismi":
          setPlaceholderInput(t(28));
          break;
        case "Familiyasi":
          setPlaceholderInput(t(29));
          break;
        case "Otasini ismi":
          setPlaceholderInput(t(30));
          break;
        case "Tushum nomi":
          setPlaceholderInput(t(31));
          break;
        case "Xarajat nomi":
          setPlaceholderInput(t(33));
          break;
        case "Filial nomi":
          setPlaceholderInput(t(32));
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
