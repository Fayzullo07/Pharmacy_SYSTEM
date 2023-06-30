import React from "react";
import SideBar from "../../../../../components/SideBar/SideBar";
import { months, shifts, years } from "../../../../../api";

const SideBarBranchs = ({
  month,
  setMonth,
  year,
  setYears,
  accounts,
  users,
  shift,
  setShift,
  filterFunction,
  smena,
  hammasi
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

      {/* SHIFTS */}
      <select
        value={shift}
        className="form-select my-3 text-capitalize"
        onChange={(e) => setShift(e.target.value)}
      >
        <option value={0}>{hammasi}</option>
        {accounts &&
          accounts.data.results &&
          shifts.map((m, index) => {
            if (users[index]?.shift == m.shift) {
              return (
                <option value={users[index].shift}>
                  {users[index].first_name} {users[index].last_name}
                </option>
              );
            } else {
              return <option value={m.shift}>{m.shift} - {smena} </option>;
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

export default SideBarBranchs;
