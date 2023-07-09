import React from "react";
import { useTranslation } from "react-i18next";

const SmenaSelect = ({
  name,
  value,
  handleInputChange,
  isRequired = false
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "Modal" });
  return (
    <div className="form-floating">
      <select
        className="form-select mb-3"
        name={name}
        value={value}
        onChange={handleInputChange}
      >
        <option selected>{t(15)}. . .</option>
        <option value={1}>{t(16)} 1</option>
        <option value={2}>{t(16)} 2</option>
        <option value={3}>{t(16)} 3</option>
      </select>
      <label>
        {t(15)} {isRequired ? <b className="text-danger">*</b> : null}
      </label>
    </div>
  );
};

export default SmenaSelect;
