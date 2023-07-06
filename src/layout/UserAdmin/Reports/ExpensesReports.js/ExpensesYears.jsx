import React, { useState } from "react";
import { months } from "../../../../api";
import { useQuery } from "react-query";
import { returnReportMonthGetAPI } from "../../../../api/FirmsRequest";
import {
  formatNumber,
  totalMoneyByKey,
  totalYear,
} from "../../../../functions/NecessaryFunctions";
import SkeletLoading from "../../../../utils/SkeletLoading";

import { useSelector } from "react-redux";
import SideBarExpenseYears from "./SideBarExpenseYears";

const ExpensesYears = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState("");

  const [expense_type, setExpense] = useState(deteils.expense_types[0]?.id);

  const [change, setChange] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["EXPENSE_YEAR", change],
    queryFn: async () => {
      return await returnReportMonthGetAPI({
        year,
        pharmacy,
        expense_type,
      });
    },
  });

  if (error) return `Error: ${error.message}`;

  let result = null;
  if (!isLoading) {
    result = totalYear(data.data);
  }

  const filterFunction = () => {
    setChange(!change);
  };

  return (
    <>
      {/* TOPBAR */}
      <div className="header_flex">
        <h2>{ deteils.pharmacies.map((item) => {
          if(item.id == pharmacy){
            return item.name
          }
        })}{pharmacy == "" && "Hamma filiallar"}</h2>
        <div className="d-flex">
          <SideBarExpenseYears
            year={year}
            setYears={setYears}
            pharmacy={pharmacy}
            setPharmacy={setPharmacy}
            deteils={deteils}
            filterFunction={filterFunction}
            expense_type={expense_type}
            setExpense={setExpense}
          />
        </div>
      </div>

      {/* TABLE */}
      <div
        className="container-fluid my-2"
        style={{ maxHeight: "calc(100vh - 170px)", overflowY: "scroll" }}
      >
        <table
          className="table table-sm table-hover table-bordered border-dark align-middle text-center"
          style={{
            width: "max-content",
            minWidth: `${toggle ? "75vw" : "95vw"}`,
          }}
        >
          <thead
            className="align-middle"
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "var(--blue)",
              color: "#fff",
              zIndex: 55,
            }}
          >
            <tr>
              <th style={{ width: "5px", padding: "20px 10px" }}>№</th>
              <th>
                <b>Oy</b>
              </th>
              <th>
                <b>
                  {deteils.expense_types.map((element) => {
                    if (element.id == expense_type) {
                      return <b>{element.name}</b>;
                    }
                  })}
                </b>
              </th>
            </tr>
          </thead>
          {data && data.data.length != 0 ? (
            <>
              <tbody>
                {months.map((m) => {
                  return (
                    <tr
                      key={m.id}
                      style={{
                        border: "dotted 2px #000",
                        background: "var(--ch_white)",
                      }}
                    >
                      <td className="py-2">
                        <b>{m.id}</b>
                      </td>
                      <td className="w-25">
                        <b>{m.month}</b>
                      </td>
                      <td>
                        <b>
                          {result.map(
                            (item) =>
                              item.month == m.id && formatNumber(item.price)
                          )}
                        </b>
                      </td>
                    </tr>
                  );
                })}
                {isLoading &&
                  [...Array(16).keys()].map(() => (
                    <tr>
                      {[...Array(5).keys()].map(() => (
                        <td>
                          <SkeletLoading height={20} count={1} rodius={20} />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
              <tfoot
                style={{ position: "sticky", bottom: 0, background: "#d9d9d9" }}
              >
                <tr className="text-center">
                  <th colSpan="2" className="py-2">
                    Jami:
                  </th>
                  <th>{formatNumber(totalMoneyByKey(result, "price"))}</th>
                </tr>
              </tfoot>
            </>
          ) : (
            <>
              <tbody>
                {months.map((m) => {
                  return (
                    <tr
                      key={m.id}
                      style={{
                        border: "dotted 2px #000",
                        background: "var(--ch_white)",
                      }}
                    >
                      <td className="py-2">
                        <b>{m.id}</b>
                      </td>
                      <td className="w-25">
                        <b>{m.month}</b>
                      </td>
                      <td>
                        <b></b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot
                style={{ position: "sticky", bottom: 0, background: "#d9d9d9" }}
              >
                <tr className="text-center">
                  <th colSpan="2" className="py-2">
                    Jami:
                  </th>
                  <th>0</th>
                </tr>
              </tfoot>
            </>
          )}
        </table>
      </div>
    </>
  );
};

export default ExpensesYears;
