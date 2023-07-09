import React from "react";
import { useTranslation } from "react-i18next";

const TransferTypeSelect = ({
  name = "transfer_type",
  value,
  handleInputChange,
  isRequired = true,
  disabled = false
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "Modal" });
  return (
    <div className="form-floating">
      <select
        className="form-select mb-3"
        name={name}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
      >
        <option value={1}>
          {t(34)}
        </option>
        <option value={2}>
          {t(35)}
        </option>
      </select>
      <label>
        <b className="text-danger">*</b>
      </label>
      <label>
        {t(36)} {isRequired ? <b className="text-danger">*</b> : null}
      </label>
    </div>
  );
};

export default TransferTypeSelect;
