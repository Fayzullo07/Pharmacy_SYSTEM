import React, { useState } from "react";
import "./SideBarTakeGive.css";

const SideBarTakeGive = ({ shows, setShows }) => {
  const [showUl, setShowUl] = useState(false);
  return (
    <div id="debts3">
      <button
        className={`${shows == "1" ? "activeBtn" : ""}`}
        onClick={() => {
          setShows("1");
        }}
      >
        Qarzga qilingan savdo
      </button>
      <button
        className={`${shows == "2" ? "activeBtn" : ""}`}
        onClick={() => {
          setShows("2");
        }}
      >
        Qarz berilganlar
      </button>
      <button
        className={`${shows == "3" ? "activeBtn" : ""}`}
        onClick={() => {
          setShows("3");
        }}
      >
        Qarz olinganlar
      </button>
    </div>
  );
};

export default SideBarTakeGive;
