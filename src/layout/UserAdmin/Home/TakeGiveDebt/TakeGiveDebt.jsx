import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import SideBarTakeGive from "./SideBarTakeGive/SideBarTakeGive";
import DebtGive from "./DebtGive/DebtGive";
import DebtToTrade from "./DebtToTrade/DebtToTrade";
import DebtTake from "./DebtTake/DebtTake";

const TakeGiveDebt = () => {
  const reduxData = useSelector(state => state);
  const { toggle } = reduxData.toggle;

  const [choose, setChoose] = useState("1");

  return <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex justify-content-end">
           
            
            
              <SideBarTakeGive setShows={setChoose} shows={choose} />
          </div>
        </Topbar>
        {choose == "1" && <DebtToTrade />}
        {choose == "2" && <DebtGive />}
        {choose == "3" && <DebtTake />}
      </div>
    </div>;
};

export default TakeGiveDebt;
