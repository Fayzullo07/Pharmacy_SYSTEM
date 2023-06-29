import React from "react";
import SideBar from "../../../../../components/SideBar/SideBar";
import { months, years } from "../../../../../api";

const SideBarDebtGive = ({
  month,
  setMonth,
  year,
  setYears,
  pharmacy,
  setPharmacy,
  filterFunction,
  deteils,
}) => {
  return (
    <SideBar>
      {/* MONTH BUTTON */}
      <select
        value={month}
        className="form-select my-3"
        onChange={(e) => setMonth(e.target.value)}
      >
        {months.map((m) => (
          <option key={m.id} value={m.id}>
            {m.month}
          </option>
        ))}
      </select>

      {/* YEARS */}
      <select
        value={year}
        className="form-select my-3"
        onChange={(e) => setYears(e.target.value)}
      >
        <option value="">Yilni tanlang</option>
        {years.map((y) => (
          <option key={y.years} value={y.years}>
            {y.years}
          </option>
        ))}
      </select>

      {/* PHARMACY */}
      <select
        value={pharmacy}
        className="form-select my-3"
        onChange={(e) => setPharmacy(e.target.value)}
      >
        <option value="">Hamma filial</option>
        {deteils.pharmacies.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <button
        className="btn"
        data-bs-dismiss={"offcanvas"}
        onClick={filterFunction}
        style={{ background: "var(--blue)", color: "#fff" }}
      >
        Tasdiqlash
      </button>
    </SideBar>
  );
};

export default SideBarDebtGive;
