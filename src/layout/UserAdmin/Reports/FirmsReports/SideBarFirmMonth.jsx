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
  curData,
  setSearchModal
}) => {
  return (
    <SideBar id={77}>
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
        {deteils.pharmacies.map(item =>
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        )}
      </select>

      {/* FIRM TITLE */}
      <div
        className="cursor_pointer border p-2 rounded d-flex align-items-center justify-content-between  my-3"
        data-bs-dismiss="offcanvas"
        onClick={() => {
          setSearchModal(true);
        }}
      >
        {curData.id
          ? <span>
              {curData.name}
            </span>
          : <span>Firmani tanlang</span>}
        <i className="fa fa-angle-down mx-1" />
      </div>

      {curData.id &&
        <button
          className="btn"
          data-bs-dismiss={"offcanvas"}
          onClick={filterFunction}
          style={{ background: "var(--blue)", color: "#fff" }}
        >
          Tasdiqlash
        </button>}
    </SideBar>
  );
};

export default SideBarFirmMonth;
