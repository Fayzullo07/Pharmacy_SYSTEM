import React, { useEffect, useState } from "react";
import { today } from "../api";

const DateInput = ({
  name,
  value,
  handleInputChange,
  handleSubmit,
  isRequired = false,
  placeholder = "",
  maxORmin = true
}) => {
  const [placeholderInput, setPlaceholderInput] = useState("");

  useEffect(
    () => {
      switch (placeholder) {
        case "Tug'ilgan kuni":
          setPlaceholderInput("Tug'ilgan kuni");
          break;
        default:
          setPlaceholderInput("Date");
      }
    },
    [placeholder]
  );

  return (
    <div className="form-floating mb-3">
      <input
        type="date"
        className="form-control"
        placeholder={placeholderInput}
        name={name}
        value={value}
        max={maxORmin ? today : null}
        min={maxORmin ? null : today}
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

export default DateInput;
