import React from "react";
import SideBar from "../../../../../components/SideBar/SideBar";
import { today } from "../../../../../api";

const SideBarFirms = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  pharm_id,
  setPharmId,
  deteils,
  filterFunction,
}) => {
  return (
    <SideBar>
      {/* START */}
      <label htmlFor="start" class="form-label">
        Boshlanish sana
      </label>
      <div className="input-group mb-2">
        <input
          type="date"
          className="form-control p-2 bg-light"
          max={today}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* END */}
      <label htmlFor="end" class="form-label">
        Tugash sana
      </label>
      <div className="input-group">
        <input
          type="date"
          className="form-control p-2 bg-light"
          max={today}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* PHARMACIES */}
      <select
        className="form-select my-3"
        value={pharm_id}
        onChange={(e) => setPharmId(e.target.value)}
      >
        <option value="">Hamma filiallar</option>
        {deteils.pharmacies.map((pharm) => (
          <option key={pharm.key} value={pharm.id}>
            {pharm.name}
          </option>
        ))}
      </select>

      <button
        className="btn"
        data-bs-dismiss={
          !startDate || !endDate || new Date(startDate) > new Date(endDate)
            ? ""
            : "offcanvas"
        }
        onClick={filterFunction}
        style={{ background: "#000088", color: "#fff" }}
      >
        Tasdiqlash
      </button>
    </SideBar>
  );
};

export default SideBarFirms;
