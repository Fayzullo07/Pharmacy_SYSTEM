import React, { useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import { useSelector } from "react-redux";
import SideBarTakeGiveFirm from "./SideBarTakeGiveFirm/SideBarTakeGiveFirm";
import { today } from "../../../../api";
import ProfileFirmIncome from "./FirmIncome/ProfileFirmIncome";
import FirmReturn from "./FirmReturn/FirmReturn";

const TakeGiveFirm = () => {
  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;
  const { deteils } = reduxData.deteils;

  const [choose, setChoose] = useState(true);

  const [date_firm, setDateFirm] = useState(today);
  return (
    <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex">
            <h2>
              {!choose
                ? "Firmaga qaytarilgan mahsulot"
                : "Firmadan olingan mahsulot"}
            </h2>
          </div>
          <SideBarTakeGiveFirm setChoose={setChoose} choose={choose} />
        </Topbar>

        {choose ? (
          <ProfileFirmIncome
            deteils={deteils}
            date_firm={date_firm}
            setDateFirm={setDateFirm}
          />
        ) : (
          <FirmReturn date_firm={date_firm} setDateFirm={setDateFirm} />
        )}
      </div>
    </div>
  );
};

export default TakeGiveFirm;
