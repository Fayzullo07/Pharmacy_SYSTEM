import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import Topbar from "../../../components/Topbar/Topbar";
import IncomesMonth from "./IncomesReports/IncomesMonth";
import IncomesYears from "./IncomesReports/IncomesYears";
import ExpensesMonth from "./ExpensesReports.js/ExpensesMonth";
import ExpensesYears from "./ExpensesReports.js/ExpensesYears";
import FirmsMonth from "./FirmsReports/FirmsMonth";
import FirmsYears from "./FirmsReports/FirmsYears";
import QRCodeYears from "./QRCodeReports/QRCodeYears";
import QRCodeMonth from "./QRCodeReports/QRCodeMonth";
import DiscountYears from "./DiscountProduct/DiscountYears";
import DiscountMonth from "./DiscountProduct/DiscountMonth";
import ReturnYears from "./ReturnProduct/ReturnYears";
import ReturnMonth from "./ReturnProduct/ReturnMonth";
import LeaderYears from "./LeaderReports/LeaderYears";
import LeaderMonth from "./LeaderReports/LeaderMonth";
import WorkerYears from "./WorkerReports/WorkerYears";
import WorkerMonth from "./WorkerReports/WorkerMonth";
import ChooseReports from "./ChooseReports";

import "./Reports.css";
import { isFavoriteFunction } from "../../../redux/Actions/ToggleActions";
import { useTranslation } from "react-i18next";
const Reports = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state);
  const { toggle } = reduxData.toggle;
  const { is_favorite } = reduxData.is_favorite;

  const [choose, setChoose] = useState("0");
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex ">
            <div className="d-flex align-items-center justify-content-beetwen">
              {choose != "0" &&
                <i
                  id="back_arrow"
                  className="fa fa-arrow-left fs-4 me-2"
                  style={{ color: "var(--text_color_blue)" }}
                  onClick={() => setChoose("0")}
                />}
              <h2>
                {choose == "0" && g(74)}
                {choose == "1" && g(67)}
                {choose == "2" && g(68)}
                {choose == "3" && g(69)}
                {choose == "4" && g(70)}
                {choose == "5" && g(47)}
                {choose == "6" && g(71)}
                {choose == "7" && g(72)}
                {choose == "8" && g(73)}
              </h2>
            </div>
            {choose == "0" &&
              <div id="yearOrMonth">
                <button
                  className={`${is_favorite == true ? "activeBtn" : ""}`}
                  onClick={() => dispatch(isFavoriteFunction(true))}
                >
                  {g(75)}
                </button>
                <button
                  className={`${is_favorite == false ? "activeBtn" : ""}`}
                  onClick={() => dispatch(isFavoriteFunction(false))}
                >
                  {g(76)}
                </button>
              </div>}
          </div>
        </Topbar>
        {choose == "0" &&
          <ChooseReports setChoose={setChoose} dispatc={dispatch} />}
        {choose == "1" && is_favorite == false && <IncomesYears />}
        {choose == "1" && is_favorite == true && <IncomesMonth />}

        {choose == "2" && is_favorite == false && <ExpensesYears />}
        {choose == "2" && is_favorite == true && <ExpensesMonth />}

        {choose == "3" && is_favorite == false && <FirmsYears />}
        {choose == "3" && is_favorite == true && <FirmsMonth />}

        {choose == "4" && is_favorite == false && <QRCodeYears />}
        {choose == "4" && is_favorite == true && <QRCodeMonth />}

        {choose == "5" && is_favorite == false && <DiscountYears />}
        {choose == "5" && is_favorite == true && <DiscountMonth />}

        {choose == "6" && is_favorite == false && <ReturnYears />}
        {choose == "6" && is_favorite == true && <ReturnMonth />}

        {choose == "7" && is_favorite == false && <LeaderYears />}
        {choose == "7" && is_favorite == true && <LeaderMonth />}

        {choose == "8" && is_favorite == false && <WorkerYears />}
        {choose == "8" && is_favorite == true && <WorkerMonth />}
      </div>
    </div>
  );
};

export default Reports;
