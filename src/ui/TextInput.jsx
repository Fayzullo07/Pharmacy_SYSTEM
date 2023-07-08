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
        case "Kimdan qarz olindi":
          setPlaceholderInput("Kimdan qarz olindi");
          break;
        case "Kimga qarz berildi":
          setPlaceholderInput("Kimga qarz berildi");
          break;
        case "Qabul qiluvchi F.I.O":
          setPlaceholderInput("Qabul qiluvchi F.I.O");
          break;
        case "Olingan mahsulot nomi":
          setPlaceholderInput("Olingan mahsulot nomi");
          break;
        case "Ismi":
          setPlaceholderInput("Ismi");
          break;
        case "Familiyasi":
          setPlaceholderInput("Familiyasi");
          break;
        case "Otasini ismi":
          setPlaceholderInput("Otasini ismi");
          break;
        case "Tushum nomi":
          setPlaceholderInput("Tushum nomi");
          break;
        case "Xarajat nomi":
          setPlaceholderInput("Xarajat nomi");
          break;
        case "Filial nomi":
          setPlaceholderInput("Filial nomi");
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
