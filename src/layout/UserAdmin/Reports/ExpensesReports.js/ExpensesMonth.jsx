import React, { useEffect, useState } from "react";
import { returnReportDayGetAPI } from "../../../../api/FirmsRequest";
import { useQuery, useQueryClient } from "react-query";
import {
  formatNumber
} from "../../../../functions/NecessaryFunctions";
import Empty from "../../../../utils/Empty";
import SkeletLoading from "../../../../utils/SkeletLoading";

import { useSelector } from "react-redux";
import PaginationForModal from "../../../../utils/PaginationForModal";
import { PharmaciesExpensesReportDayExcelGetDownload } from "../../../../functions/ExcelActions";
import SideBarExpenseMonth from "./SideBarExpenseMonth";
import { pagination } from "../../../../api";
import { useTranslation } from "react-i18next";

const ExpensesMonth = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;

  const [change, setChange] = useState(false);
  const [page, setPage] = useState(1);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState(deteils.pharmacies[0]?.id);
  const [expense_type, setExpense] = useState(deteils.expense_types[0]?.id);

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries("EXPENSE_MONTH");
  }, [page]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["EXPENSE_MONTH", page],
    queryFn: async () => {
      return await returnReportDayGetAPI({
        year,
        month,
        pharmacy,
        page,
        expense_type,
      });
    },
    enabled: change,
  });

  if (error) return `Error: ${error.message}`;

  const filterFunction = () => {
    setChange(true);
    refetch();
    setPage(1);
    queryClient.removeQueries("EXPENSE_MONTH");
  };

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  const { t: f } = useTranslation("translation", { keyPrefix: "Firm" });

  return (
    <>
      {/* TOPBAR */}
      <div className="header_flex">
        <h2>{change && deteils.pharmacies.map((item) => {
          if(item.id == pharmacy){
            return item.name.length > 16 ? `${item.name.substring(0, 16)}. . .` : item.name
          }
        })}  {change && deteils.expense_types.map((item) => {
          if(item.id == expense_type){
            return item.name
          }
        })}</h2>
        <div className="d-flex">
          <PharmaciesExpensesReportDayExcelGetDownload
            year={year}
            month={month}
            pharmacy={pharmacy}
            expense_type={expense_type}
          />
          <SideBarExpenseMonth
            month={month}
            setMonth={setMonth}
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
        style={{ maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
      >
        <table
          className="table table-sm table-hover table-bordered border-dark align-middle text-center"
           style={{
            width: "max-content",
            minWidth: "100%",
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
                {r(0)}
              </th>
              <th>
                {f(1)}
              </th>
              <th>
                {g(80)}
              </th>
            </tr>
          </thead>
          {data && data.data.results.length != 0 ? (
            <>
              <tbody>
                {data &&
                  data.data.results.map((item, index) => (
                    <tr
                      key={item.report_date}
                      style={{
                        border: "dotted 2px #000",
                        background: "var(--ch_white)",
                      }}
                    >
                      <td className="p-2">
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <b>{item.report_date}</b>
                      </td>
                      <td>
                        <b>{item.creator}</b>
                        <br />
                        {item.created_at}
                      </td>
                      <td className="text-center fw-bold">
                        {formatNumber(item.price)}
                      </td>
                    </tr>
                  ))}
                {isLoading &&
                  [...Array(10).keys()].map((i) => (
                    <tr key={i}>
                      {[...Array(5).keys()].map(() => (
                        <td>
                          <SkeletLoading height={20} count={1} rodius={20} />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
              <tfoot
                style={{
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: "#d9d9d9",
                }}
              >
                <tr className="text-center">
                  <th colSpan="3" className="py-2">
                    {r(12)}:
                  </th>
                  <th>
                    {data &&
                      data.data &&
                      formatNumber(data.data.total_month_price)}
                  </th>
                </tr>
              </tfoot>
            </>
          ) : (
            <Empty />
          )}
        </table>
      </div>

      <div className="fixed-bottom">
        <PaginationForModal
          page={page}
          pages={Math.ceil(data && data.data.count / pagination)}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default ExpensesMonth;
