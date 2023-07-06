import React, { useState } from "react";
import SideBar from "../../../../../components/SideBar/SideBar";

const SideBarTakeGiveFirm = ({ setShows, shows }) => {
  const [showUl, setShowUl] = useState(false);
  return (
    <div id="btn_hover_parent_debt">
      <button
        className="btn border border-primary mx-3"
        onMouseEnter={() => {
          setShowUl(true);
        }}
        onMouseLeave={() => {
          setShowUl(false);
        }}
      >
        <i className="fa fa-list" />
      </button>
      <ul
        id="child_debts"
        className="child"
        onMouseEnter={() => {
          setShowUl(true);
        }}
        onMouseLeave={() => {
          setShowUl(false);
        }}
        style={showUl ? { display: "block" } : { display: "none" }}
      >
        <li className={`${shows == "1" && "active"}`}>
          <button
            className={`dropdown-item`}
            onClick={() => {
              setShows("1");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("1");
            }}
          >
            Firmadan olingan mahsulotlar
          </button>
        </li>
        <li className={`${shows == "2" && "active"}`}>
          <button
            type="button"
            className={`dropdown-item`}
            onClick={() => {
              setShows("2");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("2");
            }}
          >
            Firmaga qaytarilgan mahsulotlar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBarTakeGiveFirm;
