import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { years } from "../../../../api";
import { useTranslation } from "react-i18next";

const SideBarIncomeYears = ({
  year,
  setYears,
  pharmacy,
  setPharmacy,
  deteils,
  filterFunction
}) => {
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  const { t: f } = useTranslation("translation", { keyPrefix: "Firm" });
  return (
    <SideBar>
      {/* YEARS */}
      <select
        value={year}
        className="form-select my-3"
        onChange={e => setYears(e.target.value)}
      >
        {years.map(y =>
          <option key={y.years} value={y.years}>
            {y.years}
          </option>
        )}
      </select>

      {/* PHARMACY */}
      <select
        value={pharmacy}
        className="form-select my-3"
        onChange={e => setPharmacy(e.target.value)}
      >
        <option value="">
          {f(11)}
        </option>
        {deteils.pharmacies.map(item =>
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        )}
      </select>

      <button
        className="btn"
        data-bs-dismiss={"offcanvas"}
        onClick={filterFunction}
        style={{ background: "var(--blue)", color: "#fff" }}
      >
        {r(15)}
      </button>
    </SideBar>
  );
};

export default SideBarIncomeYears;
