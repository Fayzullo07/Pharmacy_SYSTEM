import React from "react";
import "./side.css";
import { useTranslation } from "react-i18next";
const SideBarTakeGiveFirm = ({ setShows, shows }) => {
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });

  return (
    <div id="firms2">
      <button
        className={`${shows == "1" ? "activeBtn" : ""}`}
        onClick={() => {
          setShows("1");
        }}
      >
        {g(35)}
      </button>
      <button
        className={`${shows == "2" ? "activeBtn" : ""}`}
        onClick={() => {
          setShows("2");
        }}
      >
        {g(36)}
      </button>
    </div>
  );
};

export default SideBarTakeGiveFirm;
