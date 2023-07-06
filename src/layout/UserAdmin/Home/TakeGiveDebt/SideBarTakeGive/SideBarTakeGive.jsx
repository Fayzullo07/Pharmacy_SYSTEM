import React, { useState } from "react";
import "./SideBarTakeGive.css";

const SideBarTakeGive = ({ shows, setShows }) => {
  const [showUl, setShowUl] = useState(false);
  return (
    <div id="btn_hover_parent_debt">
      <button
        className="btn border border-primary"
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
            Qarzga qilingan savdo
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
            Qarz berilganlar
          </button>
        </li>
        <li className={`${shows == "3" && "active"}`}>
          <button
            type="button"
            className={`dropdown-item`}
            onClick={() => {
              setShows("3");
              setShowUl(false);
            }}
            onMouseEnter={() => {
              setShows("3");
            }}
          >
            Qarz olinganlar
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBarTakeGive;
