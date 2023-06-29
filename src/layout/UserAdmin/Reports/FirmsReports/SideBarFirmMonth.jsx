import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { months, years } from "../../../../api";

const SideBarFirmMonth = ({
  month,
  setMonth,
  year,
  setYears,
  pharmacy,
  setPharmacy,
  deteils,
  filterFunction,
  firm_id,
  setFirm
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
        {deteils.pharmacies.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      {/* FIRMS */}
      {deteils.firms.length != 0 && (
        <select
          value={firm_id}
          className="form-select my-3"
          onChange={(e) => setFirm(e.target.value)}
        >
          {deteils.firms.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
      {deteils.firms.length != 0 && (
        <button
          className="btn"
          data-bs-dismiss={"offcanvas"}
          onClick={filterFunction}
          style={{ background: "var(--blue)", color: "#fff" }}
        >
          Tasdiqlash
        </button>
      )}
    </SideBar>
  );
};

export default SideBarFirmMonth;
