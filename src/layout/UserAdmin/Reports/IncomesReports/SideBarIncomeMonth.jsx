import React from "react";
import SideBar from "../../../../components/SideBar/SideBar";
import { months, shifts, years } from "../../../../api";

const SideBarIncomeMonth = ({
  month,
  setMonth,
  year,
  setYears,
  pharmacy,
  setPharmacy,
  filterFunction,
  deteils,
  shift,
  setShift,
  accounts,
  users,
}) => {
  return (
    <SideBar title="">
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
        {deteils.pharmacies
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))
          .reverse()}
      </select>

      {/* SHIFTS */}
      <select
        value={shift}
        className="form-select my-3"
        onChange={(e) => setShift(e.target.value)}
      >
        <option value={0}>Hammasi</option>
        {accounts &&
          accounts.data.results &&
          shifts.map((m, index) => {
            if (users[index]?.shift == m.shift) {
              return (
                <option value={users[index].shift}>
                  {users[index].shift} {users[index].first_name}{" "}
                  {users[index].last_name}
                </option>
              );
            } else {
              return <option value={m.shift}>{m.shift} Smena </option>;
            }
          })}
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

export default SideBarIncomeMonth;
