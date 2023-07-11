import React, { useEffect, useState } from "react";
import { returnReportDayGetAPI } from "../../../../api/FirmsRequest";
import { useQuery, useQueryClient } from "react-query";
import {
  formatNumber,
  totalMoneyByKey,
} from "../../../../functions/NecessaryFunctions";
import Empty from "../../../../utils/Empty";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { chegirma, months, pagination, years } from "../../../../api";
import SideBar from "../../../../components/SideBar/SideBar";

import { useSelector } from "react-redux";
import PaginationForModal from "../../../../utils/PaginationForModal";
import { PharmaciesExpensesReportDayExcelGetDownload } from "../../../../functions/ExcelActions";
import { useTranslation } from "react-i18next";

const DiscountMonth = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const [change, setChange] = useState(false);
  const [page, setPage] = useState(1);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState(deteils.pharmacies[0]?.id);

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries("DISCOUNT_MONTH");
  }, [page]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["DISCOUNT_MONTH"],
    queryFn: async () => {
      return await returnReportDayGetAPI({
        year,
        month,
        pharmacy,
        page,
        expense_type: chegirma,
      });
    },
    enabled: change,
  });

  if (error) return `Error: ${error.message}`;

  const filterFunction = () => {
    setChange(true);
    refetch();
    setPage(1);
    queryClient.removeQueries("DISCOUNT_MONTH");
  };

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  return (
    <>
      {/* TOPBAR */}
      <div className="header_flex">
        <h2>{change && deteils.pharmacies.map((item) => {
          if (item.id == pharmacy) {
            return item.name
          }
        })}</h2>
        <div className="d-flex">
          <PharmaciesExpensesReportDayExcelGetDownload
            year={year}
            month={month}
            pharmacy={pharmacy}
            expense_type={chegirma}
          />
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

            <button
              className="btn"
              data-bs-dismiss={"offcanvas"}
              onClick={filterFunction}
              style={{ background: "var(--blue)", color: "#fff" }}
            >
              {r(15)}
            </button>
          </SideBar>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="container-fluid my-2"
        style={{ maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
      >
        <table
          className="table table-sm table-hover table-bordered border-secondary align-middle text-center"
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
                {r(1)}
              </th>
              <th>
                {g(78)}

              </th>
              <th>
                {g(77)}

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
                      <td>
                        <b>{formatNumber(item.price)}</b>
                      </td>
                      <td className="text-center fw-bold">
                        {formatNumber(item.second_name)}
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
                  zIndex: 55,
                }}
              >
                <tr className="text-center">
                  <th colSpan="3" className="py-3">
                    {r(12)}:
                  </th>
                  <th>
                    {data &&
                      data.data &&
                      formatNumber(data.data.total_month_price)}
                  </th>
                  <th>
                    {data &&
                      data.data &&
                       formatNumber(
                        totalMoneyByKey(data.data.results, "second_name")
                      )}
                     
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

export default DiscountMonth;
