import React from "react";
import { useTranslation } from "react-i18next";

const Textarea = ({
  name = "desc",
  value,
  handleInputChange,
  handleSubmit
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "Modal" });
  return (
    <div className="form-floating">
      <textarea
        className="form-control"
        placeholder={t(17)}
        id="floatingTextarea2"
        style={{ height: "100px" }}
        name={name}
        value={value}
        onChange={handleInputChange}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <label htmlFor="floatingTextarea2">{t(17)}</label>
    </div>
  );
};

export default Textarea;
