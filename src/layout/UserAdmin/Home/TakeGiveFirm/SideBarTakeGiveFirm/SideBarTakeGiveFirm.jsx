import React from "react";
import './side.css'
const SideBarTakeGiveFirm = ({ setShows, shows }) => {
  return <div id="firms2">
      <button className={`${shows == "1" ? "activeBtn" : ""}`} onClick={() => {
          setShows("1");
        }}>
        Firmadan olingan mahsulotlar
      </button>
      <button className={`${shows == "2" ? "activeBtn" : ""}`} onClick={() => {
          setShows("2");
        }}>
        Firmaga qaytarilgan mahsulotlar
      </button>
    </div>;
};

export default SideBarTakeGiveFirm;
