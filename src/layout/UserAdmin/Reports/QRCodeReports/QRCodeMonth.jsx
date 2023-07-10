import React, { useState } from "react";
import { QR_CODE_ReportDayGetAPI } from "../../../../api/FirmsRequest";
import { useQuery } from "react-query";
import {
  formatNumber,
  totalMoneyByKey,
} from "../../../../functions/NecessaryFunctions";
import Empty from "../../../../utils/Empty";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { months, number_0, years } from "../../../../api";
import SideBar from "../../../../components/SideBar/SideBar";

import { useSelector } from "react-redux";
import { QR_CODE_ReportDayExcelGetDownload } from "../../../../functions/ExcelActions";
import { useTranslation } from "react-i18next";

const QRCodeMonth = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const [change, setChange] = useState(false);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState(deteils.pharmacies[0].id);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["QR_CODE_MONTH"],
    queryFn: async () => {
      return await QR_CODE_ReportDayGetAPI({
        year,
        month,
        pharmacy,
      });
    },
    enabled: change,
  });

  if (error) return `Error: ${error.message}`;

  const filterFunction = () => {
    setChange(true);
    refetch();
  };

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  const { t: f } = useTranslation("translation", { keyPrefix: "Firm" });
  return (
    <>
      {/* TOPBAR */}
      <div className="header_flex">
        <h2>{change && deteils.pharmacies.map((item) => {
          if (item.id == pharmacy) {
            return item.name.length > 16 ? `${item.name.substring(0, 16)}. . .` : item.name
          }
        })}</h2>
        <div className="d-flex">
          <QR_CODE_ReportDayExcelGetDownload
            year={year}
            month={month}
            pharmacy={pharmacy}
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
        style={{ maxHeight: "calc(100vh - 170px)", overflowY: "scroll" }}
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
                {r(10)}
              </th>

              <th>
                {r(11)}
              </th>

              <th>
               {g(85)}
              </th>
            </tr>
          </thead>
          {data && data.data.length != 0 ? (
            <>
              <tbody>
                {data &&
                  data.data.map((item, index) => (
                    <tr
                      key={item.report_date}
                      style={{
                        border: "dotted 2px #000",
                        background: "var(--ch_white)",
                      }}
                    >
                      <td className="p-2">
                        {index + 1}
                      </td>
                      <td>
                        {item.report_date}
                      </td>
                      <td>
                        <b className="fw-600">
                          {item.receipt_price == 0
                            ? number_0
                            : formatNumber(item.receipt_price)}
                        </b>
                      </td>
                      <td>
                        <b className="fw-600">
                          {formatNumber(
                            item.price + item.receipt_price == 0
                              ? number_0
                              : item.price - item.receipt_price
                          )}
                        </b>
                      </td>
                      <td>
                        <b>{formatNumber(item.price == 0 ? number_0 : item.price)}</b>
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
                  <th colSpan="2" className="py-2">
                    {r(12)}:
                  </th>
                  <th>
                    {data &&
                      data.data &&
                      formatNumber(totalMoneyByKey(data.data, "receipt_price"))}
                  </th>
                  <th>
                    {data &&
                      data.data &&
                      formatNumber(
                        totalMoneyByKey(data.data, "price") -
                        totalMoneyByKey(data.data, "receipt_price")
                      )}
                  </th>
                  <th>
                    {data &&
                      data.data &&
                      formatNumber(totalMoneyByKey(data.data, "price"))}
                  </th>
                </tr>
              </tfoot>
            </>
          ) : (
            <Empty />
          )}
        </table>
      </div>
    </>
  );
};

export default QRCodeMonth;
