import React, { useState } from "react";
import { QR_CODE_ReportDayGetAPI } from "../../../../api/FirmsRequest";
import { useQuery } from "react-query";
import {
  formatNumber,
  totalMoneyByKey,
} from "../../../../functions/NecessaryFunctions";
import Empty from "../../../../utils/Empty";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { months, years } from "../../../../api";
import SideBar from "../../../../components/SideBar/SideBar";

import { useSelector } from "react-redux";
import { QR_CODE_ReportDayExcelGetDownload } from "../../../../functions/ExcelActions";

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

  return (
    <>
      {/* TOPBAR */}
      <div className="header_flex">
        <h2>OYLIK</h2>
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
              Tasdiqlash
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
              <th style={{ width: "5px", padding: "25px 0" }}>№</th>
              <th>
                <b>Sana</b>
              </th>
              <th>
                <b>QR-code chek</b>
                <br />
                <b>berilmagan</b>
              </th>

              <th>
                <b>QR-code chek</b>
                <br />
                <b>berilgan</b>
              </th>

              <th>
                <b>Jami savdo</b>
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
                        background: "var(--blue)",
                      }}
                    >
                      <td className="p-2">
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <b>{item.report_date}</b>
                      </td>
                      <td>
                        <b>
                          {item.receipt_price == 0
                            ? ""
                            : formatNumber(item.receipt_price)}
                        </b>
                      </td>
                      <td>
                        <b>
                          {formatNumber(
                            item.price + item.receipt_price == 0
                              ? ""
                              : item.price - item.receipt_price
                          )}
                        </b>
                      </td>
                      <td>
                        <b>{formatNumber(item.price == 0 ? "" : item.price)}</b>
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
                  <th colSpan="2" className="py-3">
                    Jami:
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
