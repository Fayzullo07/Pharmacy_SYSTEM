import React, { useState } from "react";
import { changeLang } from "../../App";

const Languages = () => {
  const currentLang = localStorage.getItem("lang");
  const [language, setLanguage] = useState(currentLang ? currentLang : "uz");
  return (
    <div id="language" className="d-flex align-items-center">
      <span className="icon">
        <i className="fa fa-globe"></i>
      </span>
      <select
        value={language}
        onChange={(e) => {
          changeLang(e.target.value);
          setLanguage(e.target.value);
        }}
        className="select"
      >
        <option value={"uz"}>O'zbek</option>
        <option value={"ru"}>Русский язык</option>
        <option value={"en"}>English</option>
      </select>
    </div>
  );
};

export default Languages;
