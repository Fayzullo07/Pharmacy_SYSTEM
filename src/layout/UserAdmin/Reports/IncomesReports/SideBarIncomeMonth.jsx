import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { months, years } from "../../../../api";
import { useTranslation } from "react-i18next";

const SideBarIncomeMonth = ({
  month,
  setMonth,
  year,
  setYears,
  pharmacy,
  setPharmacy,
  filterFunction,
  deteils
}) => {
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  return (
    <SideBar>
      {/* MONTH BUTTON */}
      <select
        value={month}
        className="form-select my-3"
        onChange={e => setMonth(e.target.value)}
      >
        {months.map(m =>
          <option key={m.id} value={m.id}>
            {m.month}
          </option>
        )}
      </select>

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
        {deteils.pharmacies
          .map(item =>
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          )
          .reverse()}
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

export default SideBarIncomeMonth;
