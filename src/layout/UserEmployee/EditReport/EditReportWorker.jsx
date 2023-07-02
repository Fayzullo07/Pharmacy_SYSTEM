import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import Topbar from "../../../components/Topbar/Topbar";
import { formatNumber } from "../../../functions/NecessaryFunctions";
import { useQuery } from "react-query";
import { remeinderGetAPI } from "../../../api/GlobalRequest";

import "./EditReport.css";
import { today } from "../../../api";
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
import Receipts from "../../UserAdmin/EditReport/Modals/Receipts";
import SideBarEdit from "../../UserAdmin/EditReport/Modals/SideBarEdit";

const EditReportWorker = ({ user }) => {
  const reduxData = useSelector(state => state);
  const { toggle } = reduxData.toggle;
  const { deteils } = reduxData.deteils;

  const [shows, setShows] = useState("11");

  const { data: remeinder } = useQuery({
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
    report_date: today,
    shift: user.shift,
    to_pharmacy: user.pharmacy
  };
  return (
    <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex">
            <h2 id="remeinder">
              <span>Kassa: </span>
              <b>
                {remeinder &&
                  remeinder.data &&
                  formatNumber(remeinder.data.price)}
              </b>{" "}
              <span>UZS</span>
            </h2>
          </div>
          <SideBarEdit setChoose={setShows} choose={shows} />
        </Topbar>
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
          <Receipts getData={getData} />
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

export default EditReportWorker;
