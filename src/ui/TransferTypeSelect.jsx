import React from "react";

const TransferTypeSelect = ({
  name = "transfer_type",
  value,
  handleInputChange,
  isRequired = true,
  disabled = false
}) => {
  return (
    <div className="form-floating">
      <select
        className="form-select mb-3"
        name={name}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
      >
        <option value={1}>NAQD</option>
        <option value={2}>NAQD PULSIZ</option>
      </select>
      <label>
        <b className="text-danger">*</b>
      </label>
      <label>
        To'lov turini tanlang{" "}
        {isRequired ? <b className="text-danger">*</b> : null}
      </label>
    </div>
  );
};

export default TransferTypeSelect;
