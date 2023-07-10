import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { years } from "../../../../api";
import { useTranslation } from "react-i18next";

const SideBarFirmYears = ({
  year,
  setYears,
  pharmacy,
  setPharmacy,
  deteils,
  filterFunction,
  curData,
  setSearchModal
}) => {
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: f } = useTranslation("translation", { keyPrefix: "Firm" });
  return (
    <SideBar id={77}>
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
          : <span>
              {g(39)}
            </span>}
        <i className="fa fa-angle-down mx-1" />
      </div>

      {curData.id &&
        <button
          className="btn"
          data-bs-dismiss={"offcanvas"}
          onClick={filterFunction}
          style={{ background: "var(--blue)", color: "#fff" }}
        >
          {f(12)}
        </button>}
    </SideBar>
  );
};

export default SideBarFirmYears;
