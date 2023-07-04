import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import Topbar from "../../../components/Topbar/Topbar";
import { useParams } from "react-router-dom";
import SideBarEdit from "./Modals/SideBarEdit";
import TodayInComes from "./TodayInComes/TodayInComes";
import TodayExpenses from "./TodayExpenses/TodayExpenses";
import TodayReturn from "./TodayReturn/TodayReturn";
import TodayDiscount from "./TodayDiscount/TodayDiscount";
import TodayExpenseToAccounts from "./TodayExpenseToAccounts/TodayExpenseToAccounts";
import TodayTradeToDebt from "./TodayTradeToDebt/TodayTradeToDebt";
import TodayToDebt from "./TodayToDebt/TodayToDebt";
import TodayDebt from "./TodayDebt/TodayDebt";
import TodayDebtRepay from "./TodayDebtRepay/TodayDebtRepay";
import TodayTradeToDebtRepay from "./TodayTradeToDebtRepay/TodayTradeToDebtRepay";
import TodayToDeptRepay from "./TodayToDebtRepay/TodayToDebtRepay";
import TodayExPenseToFirm from "./TodayExPenseToFirm/TodayExPenseToFirm";
import { formatNumber } from "../../../functions/NecessaryFunctions";
import { useQuery } from "react-query";
import { remeinderGetAPI } from "../../../api/GlobalRequest";

import "./EditReport.css";
import { number_0 } from "../../../api";

const EditReport = () => {
  const { report_date, shift, to_pharmacy } = useParams();
  const reduxData = useSelector(state => state);
  const { toggle } = reduxData.toggle;
  const { deteils } = reduxData.deteils;

  const [shows, setShows] = useState("1");

  const getData = {
    report_date,
    shift,
    to_pharmacy
  };

  const { data: remeinder, isLoading } = useQuery({
    queryKey: ["remeinder", shows],
    queryFn: async () => {
      return await remeinderGetAPI({
        report_date,
        shift,
        pharmacy_id: to_pharmacy
      });
    }
  });

  return (
    <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex mb-1">
            <h2>
              {shows == "1" && "Tushumlar"}
              {shows == "2" && "Xarajatlar"}
              {shows == "3" && "Firmaga chiqim"}
              {shows == "4" && "Qarzga qilingan savdo"}
              {shows == "5" && "Qarzga qilingan savdoni qaytarish"}
              {shows == "6" && "Qarz berish"}
              {shows == "7" && "Berilgan qarzni qaytarish"}
              {shows == "8" && "Qarz olish"}
              {shows == "9" && "Olingan qarzni qaytarish"}
              {shows == "10" && "Qaytarib olingan mahsulot"}
              {shows == "11" && "Chegirma bilan savdo"}
              {shows == "12" && "Xodimlarga berilgan summa"}
            </h2>
            {shows == "1" &&
              <h2 id="remeinder">
                <span>Kassa: </span>
                <b>
                  {isLoading
                    ? <span>
                        {number_0}
                      </span>
                    : remeinder.data.price == 0
                      ? <span>
                          {number_0}
                        </span>
                      : formatNumber(remeinder.data.price)}
                </b>{" "}
                <span> UZS</span>
              </h2>}
          </div>
        </Topbar>
        <div className="header_flex mb-2">
          <SideBarEdit setShows={setShows} shows={shows} />
        </div>

        {shows == "1" && <TodayInComes deteils={deteils} getData={getData} />}
        {shows == "2" && <TodayExpenses deteils={deteils} getData={getData} />}
        {shows == "3" &&
          <TodayExPenseToFirm deteils={deteils} getData={getData} />}
        {shows == "4" &&
          <TodayTradeToDebt is_client={true} getData={getData} />}
        {shows == "5" &&
          <TodayTradeToDebtRepay
            deteils={deteils}
            is_client={true}
            getData={getData}
          />}
        {shows == "6" && <TodayToDebt is_client={false} getData={getData} />}
        {shows == "7" &&
          <TodayToDeptRepay
            deteils={deteils}
            is_client={false}
            getData={getData}
          />}
        {shows == "8" && <TodayDebt deteils={deteils} getData={getData} />}
        {shows == "9" && <TodayDebtRepay deteils={deteils} getData={getData} />}
        {shows == "10" && <TodayReturn deteils={deteils} getData={getData} />}
        {shows == "11" && <TodayDiscount getData={getData} />}
        {shows == "12" &&
          <TodayExpenseToAccounts deteils={deteils} getData={getData} />}
      </div>
    </div>
  );
};

export default EditReport;
