import React from "react";
import "./SideBarTakeGive.css";
import { useTranslation } from "react-i18next";

const SideBarTakeGive = ({ shows, setShows }) => {
  const { t } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <div id="debts3">
      <button
        className={`${shows == "1" ? "activeBtn" : ""}`}
        onClick={() => {
          setShows("1");
        }}
      >
        {t(24)}
      </button>
      <button
        className={`${shows == "2" ? "activeBtn" : ""}`}
        onClick={() => {
          setShows("2");
        }}
      >
        {t(25)}
      </button>
      <button
        className={`${shows == "3" ? "activeBtn" : ""}`}
        onClick={() => {
          setShows("3");
        }}
      >
        {t(26)}
      </button>
    </div>
  );
};

export default SideBarTakeGive;
