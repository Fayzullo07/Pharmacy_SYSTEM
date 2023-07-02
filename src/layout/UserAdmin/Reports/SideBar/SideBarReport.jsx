import React, { useState } from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { isFavoriteFunction } from "../../../../redux/Actions/ToggleActions";
import { useDispatch } from "react-redux";

import "./SideBarReport.css";

const SideBarReport = ({ choose, setChoose, yearOrMonth }) => {
  const dispatch = useDispatch();
  const [isTrue, setIsTrue] = useState(yearOrMonth);

  return <SideBar title={"Hisbotlar"} icon="fa fa-list" id={8}>
      <div id="yearOrMonth">
        <button className={`${isTrue == true ? "activeBtn" : ""}`} onClick={() => setIsTrue(true)}>
          Oylik hisobot
        </button>
        <button className={`${isTrue == false ? "activeBtn" : ""}`} onClick={() => setIsTrue(false)}>
          Yillik hisbot
        </button>
      </div>
      <ul className="list-group">
        <li data-bs-dismiss="offcanvas" onClick={() => {
            setChoose("1");
            dispatch(isFavoriteFunction(isTrue));
          }} className={`${choose == "1" && yearOrMonth == isTrue ? "active" : ""} list-group-item cursor_pointer`} aria-current={!choose}>
          <i className="fa fa-mouse mx-4" />Tushum hisob-kitobi
        </li>
        <li data-bs-dismiss="offcanvas" onClick={() => {
            setChoose("2");
            dispatch(isFavoriteFunction(isTrue));
          }} className={`${choose == "2" && yearOrMonth == isTrue ? "active" : ""} list-group-item cursor_pointer`} aria-current={choose}>
          <i className="fa fa-mouse mx-4" />Chiqim hisob-kitobi
        </li>

        <li data-bs-dismiss="offcanvas" onClick={() => {
            setChoose("3");
            dispatch(isFavoriteFunction(isTrue));
          }} className={`${choose == "3" && yearOrMonth == isTrue ? "active" : ""} list-group-item cursor_pointer`} aria-current={choose}>
          <i className="fa fa-mouse mx-4" />Firmalarga chiqim hisob-kitobi
        </li>

        <li data-bs-dismiss="offcanvas" onClick={() => {
            setChoose("4");
            dispatch(isFavoriteFunction(isTrue));
          }} className={`${choose == "4" && yearOrMonth == isTrue ? "active" : ""} list-group-item cursor_pointer`} aria-current={choose}>
          <i className="fa fa-mouse mx-4" />QR-kod bilan qilingan savdo
        </li>

        <li data-bs-dismiss="offcanvas" onClick={() => {
            setChoose("5");
            dispatch(isFavoriteFunction(isTrue));
          }} className={`${choose == "5" && yearOrMonth == isTrue ? "active" : ""} list-group-item cursor_pointer`} aria-current={choose}>
          <i className="fa fa-mouse mx-4" />Chegirma bilan savdo
        </li>

        <li data-bs-dismiss="offcanvas" onClick={() => {
            setChoose("6");
            dispatch(isFavoriteFunction(isTrue));
          }} className={`${choose == "6" && yearOrMonth == isTrue ? "active" : ""} list-group-item cursor_pointer`} aria-current={choose}>
          <i className="fa fa-mouse mx-4" />Qaytarib olingan mahsulotlar
        </li>

        <li data-bs-dismiss="offcanvas" onClick={() => {
            setChoose("7");
            dispatch(isFavoriteFunction(isTrue));
          }} className={`${choose == "7" && yearOrMonth == isTrue ? "active" : ""} list-group-item cursor_pointer`} aria-current={choose}>
          <i className="fa fa-mouse mx-4" />Rahbar bilan hisob-kitobi
        </li>

        <li data-bs-dismiss="offcanvas" onClick={() => {
            setChoose("8");
            dispatch(isFavoriteFunction(isTrue));
          }} className={`${choose == "8" && yearOrMonth == isTrue ? "active" : ""} list-group-item cursor_pointer`} aria-current={choose}>
          <i className="fa fa-mouse mx-4" />Xodim bilan hisob-kitobi
        </li>
      </ul>
    </SideBar>;
};

export default SideBarReport;
