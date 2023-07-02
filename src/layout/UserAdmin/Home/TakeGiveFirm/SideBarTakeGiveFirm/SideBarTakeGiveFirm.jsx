import React from "react";
import SideBar from "../../../../../components/SideBar/SideBar";

const SideBarTakeGiveFirm = ({ setChoose, choose }) => {
  return (
    <SideBar title="Firma bilan oldi berdi" icon="fa fa-list">
      <ul className="list-group">
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose(true)}
          className={`${choose
            ? "active"
            : ""} list-group-item cursor_pointer `}
          aria-current={!choose}
        >
          <i className="fa fa-arrow-down mx-4" />Firmadan olingan mahsulot
        </li>
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose(false)}
          className={`${choose ? "" : "active"} list-group-item cursor_pointer`}
          aria-current={choose}
        >
          <i className="fa fa-arrow-up mx-4" /> Firmaga qaytarilgan mahsulot
        </li>
      </ul>
    </SideBar>
  );
};

export default SideBarTakeGiveFirm;
