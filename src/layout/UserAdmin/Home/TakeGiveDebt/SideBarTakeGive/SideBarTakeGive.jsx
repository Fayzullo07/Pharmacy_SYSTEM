import React from "react";
import SideBar from "../../../../../components/SideBar/SideBar";

const SideBarTakeGive = ({ choose, setChoose }) => {
  return (
    <SideBar title="Qarz oldi-berdi" icon="fa fa-list" id={"1"}>
      <ul className="list-group">
        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("1")}
          className={`${choose == "1" ? "active" : ""} list-group-item `}
          aria-current={!choose}
        >
          <i className="fa fa-computer-mouse mx-4"></i>
          Qarzga qilingan savdo
        </li>

        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("2")}
          className={`${choose == "2" ? "active" : ""} list-group-item `}
          aria-current={choose}
        >
          <i className="fa fa-computer-mouse mx-4"></i> Qarz berilganlar
        </li>

        <li
          data-bs-dismiss="offcanvas"
          onClick={() => setChoose("3")}
          className={`${choose == "3" ? "active" : ""} list-group-item `}
          aria-current={choose}
        >
          <i className="fa fa-computer-mouse mx-4"></i> Qarz olinganlar
        </li>
      </ul>
    </SideBar>
  );
};

export default SideBarTakeGive;
