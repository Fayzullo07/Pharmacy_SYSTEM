import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { years } from "../../../../api";

const SideBarFirmYears = ({
  year,
  setYears,
  pharmacy,
  setPharmacy,
  deteils,
  filterFunction,
  firm,
  setFirm,
}) => {
  return (
    <SideBar>
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
        <option value="">Hamma filial</option>
        {deteils.pharmacies.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      {/* FIRMS */}
      {deteils.firms.length != 0 && (
        <select
          value={firm}
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

export default SideBarFirmYears;
