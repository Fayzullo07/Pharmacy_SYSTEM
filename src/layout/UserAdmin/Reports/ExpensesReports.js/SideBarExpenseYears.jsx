import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { years } from "../../../../api";

const SideBarExpenseYears = ({
  year,
  setYears,
  pharmacy,
  setPharmacy,
  deteils,
  filterFunction,
  expense_type,
  setExpense,
}) => {
  return (
    <SideBar title="">
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
        {deteils &&
          deteils.pharmacies.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>
      <select
        value={expense_type}
        className="form-select my-3"
        onChange={(e) => setExpense(e.target.value)}
      >
        {deteils.expense_types.map((item) => (
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

export default SideBarExpenseYears;
