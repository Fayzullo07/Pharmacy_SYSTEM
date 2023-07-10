import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { months, years } from "../../../../api";
import { useTranslation } from "react-i18next";

const SideBarExpenseMonth = ({
  month,
  setMonth,
  year,
  setYears,
  pharmacy,
  setPharmacy,
  deteils,
  filterFunction,
  expense_type,
  setExpense,
}) => {
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
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

      {deteils.expense_types.length != 0 && (
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
      )}
      {deteils.expense_types.length != 0 && (
        <button
          className="btn"
          data-bs-dismiss={"offcanvas"}
          onClick={filterFunction}
          style={{ background: "var(--blue)", color: "#fff" }}
        >
          {r(15)}
        </button>
      )}
    </SideBar>
  );
};

export default SideBarExpenseMonth;
