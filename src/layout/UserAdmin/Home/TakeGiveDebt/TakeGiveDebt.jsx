import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import SideBarTakeGive from "./SideBarTakeGive/SideBarTakeGive";
import DebtGive from "./DebtGive/DebtGive";
import DebtToTrade from "./DebtToTrade/DebtToTrade";
import DebtTake from "./DebtTake/DebtTake";

const TakeGiveDebt = () => {
  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;

  const [choose, setChoose] = useState("1");

  return (
    <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex">
            <h2>
              {choose == "1"
                ? "Qarzga qilingan savdo"
                : choose == "2"
                ? "Qarz berilganlar"
                : "Qarz olinganlar"}
            </h2>

            <div className="d-flex align-items-center">
              <SideBarTakeGive setChoose={setChoose} choose={choose} />
            </div>
          </div>
        </Topbar>

        {choose == "1" ? (
          <DebtToTrade />
        ) : choose == "2" ? (
          <DebtGive />
        ) : (
          <DebtTake />
        )}
      </div>
    </div>
  );
};

export default TakeGiveDebt;
