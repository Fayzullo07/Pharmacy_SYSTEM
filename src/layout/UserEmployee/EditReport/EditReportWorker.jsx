import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import Topbar from "../../../components/Topbar/Topbar";
import { formatNumber } from "../../../functions/NecessaryFunctions";
import { useQuery } from "react-query";
import { remeinderGetAPI } from "../../../api/GlobalRequest";

import "./EditReport.css";
import { number_0, today } from "../../../api";
import TodayInComes from "../../UserAdmin/EditReport/TodayInComes/TodayInComes";
import TodayExpenses from "../../UserAdmin/EditReport/TodayExpenses/TodayExpenses";
import TodayExPenseToFirm from "../../UserAdmin/EditReport/TodayExPenseToFirm/TodayExPenseToFirm";
import TodayTradeToDebt from "../../UserAdmin/EditReport/TodayTradeToDebt/TodayTradeToDebt";
import TodayTradeToDebtRepay from "../../UserAdmin/EditReport/TodayTradeToDebtRepay/TodayTradeToDebtRepay";
import TodayToDebt from "../../UserAdmin/EditReport/TodayToDebt/TodayToDebt";
import TodayToDeptRepay from "../../UserAdmin/EditReport/TodayToDebtRepay/TodayToDebtRepay";
import TodayDebt from "../../UserAdmin/EditReport/TodayDebt/TodayDebt";
import TodayDebtRepay from "../../UserAdmin/EditReport/TodayDebtRepay/TodayDebtRepay";
import TodayReturn from "../../UserAdmin/EditReport/TodayReturn/TodayReturn";
import TodayDiscount from "../../UserAdmin/EditReport/TodayDiscount/TodayDiscount";
import TodayExpenseToAccounts from "../../UserAdmin/EditReport/TodayExpenseToAccounts/TodayExpenseToAccounts";
import SideBarEdit from "../../UserAdmin/EditReport/Modals/SideBarEdit";
import { useTranslation } from "react-i18next";

const EditReportWorker = ({ user }) => {
  const reduxData = useSelector(state => state);
  const { toggle } = reduxData.toggle;
  const { deteils } = reduxData.deteils;

  const [shows, setShows] = useState("1");
    const savedUser = localStorage.getItem("user");

  const { data: remeinder, isLoading } = useQuery({
    queryKey: ["remeinder", shows],
    queryFn: async () => {
      return await remeinderGetAPI({
        report_date: today,
        shift: user.shift,
        pharmacy_id: user.pharmacy
      });
    }
  });

  const getData = {
    report_date: "",
    shift: user.shift,
    to_pharmacy: user.pharmacy
  };

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });

  return <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex mb-1">
            <h2>
              {shows == "1" && g(48)}
              {shows == "2" && g(56)}
              {shows == "3" && g(57)}
              {shows == "4" && g(24)}
              {shows == "5" && g(51)}
              {shows == "6" && g(49)}
              {shows == "7" && g(50)}
              {shows == "8" && g(58)}
              {shows == "9" && g(46)}
              {shows == "10" && g(59)}
              {shows == "11" && g(47)}
              {shows == "12" && g(60)}
            </h2>
            {shows == "1" && <h2 id="remeinder">
                <span>{g(61)}: </span>
                <b>
                  {isLoading ? <span>
                        {number_0}
                      </span> : remeinder.data.price == 0 ? <span>
                          {number_0}
                        </span> : formatNumber(remeinder.data.price)}
                </b> <span> UZS</span>
              </h2>}
          </div>
        </Topbar>
        <div className="header_flex mb-2">
          {<div className="border border-primary p-1 mx-2 rounded">
              <span>
                {today}
              </span>
              <i className="fa fa-clock mx-1 text-warning" />
            </div>}
          <div className="border border-primary p-1 mx-2 rounded">
            <span>
              <span>
                {JSON.parse(savedUser)?.user.pharmacy_name.length > 16 ? `${JSON.parse(savedUser)?.user.pharmacy_name.substring(0, 16)}. . .` : JSON.parse(savedUser)?.user.pharmacy_name}
              </span>
            </span>
          </div>
        </div>
        <div className="header_flex mb-2">
          <SideBarEdit setShows={setShows} shows={shows} />
        </div>

        {shows == "1" && <TodayInComes deteils={deteils} getData={getData} />}
        {shows == "2" && <TodayExpenses deteils={deteils} getData={getData} />}
        {shows == "3" && <TodayExPenseToFirm deteils={deteils} getData={getData} />}
        {shows == "4" && <TodayTradeToDebt is_client={true} getData={getData} />}
        {shows == "5" && <TodayTradeToDebtRepay deteils={deteils} is_client={true} getData={getData} />}
        {shows == "6" && <TodayToDebt is_client={false} getData={getData} />}
        {shows == "7" && <TodayToDeptRepay deteils={deteils} is_client={false} getData={getData} />}
        {shows == "8" && <TodayDebt deteils={deteils} getData={getData} />}
        {shows == "9" && <TodayDebtRepay deteils={deteils} getData={getData} />}
        {shows == "10" && <TodayReturn deteils={deteils} getData={getData} />}
        {shows == "11" && <TodayDiscount getData={getData} />}
        {shows == "12" && <TodayExpenseToAccounts deteils={deteils} getData={getData} />}
      </div>
    </div>;
};

export default EditReportWorker;
