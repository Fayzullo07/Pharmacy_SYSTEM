import React from "react";
import SideBar from "../../../../../components/SideBar/SideBar";

const SideBarTakeGiveFirm = ({ setChoose, choose }) => {
  return (
    <SideBar title="Firma bilan oldi berdi">
      <ul className="list-group">
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose(true)}
          className={`${choose ? "active" : ""} list-group-item `}
          aria-current={!choose}
        >
          <i className="fa fa-arrow-down mx-4"></i>Firmadan olingan mahsulot
        </li>
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose(false)}
          className={`${choose ? "" : "active"} list-group-item `}
          aria-current={choose}
        >
          <i className="fa fa-arrow-up mx-4"></i> Firmaga qaytarilgan mahsulot
        </li>
      </ul>
    </SideBar>
  );
};

export default SideBarTakeGiveFirm;
