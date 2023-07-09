import React, { useState } from "react";
import { months, years } from "../../../../api";
import { useQuery } from "react-query";
import { QR_CODE_ReportMonthGetAPI } from "../../../../api/FirmsRequest";
import {
  formatNumber,
  totalMoneyByKey,
  totalMoneyByKeyMinus,
  totalYear,
} from "../../../../functions/NecessaryFunctions";
import SkeletLoading from "../../../../utils/SkeletLoading";
import SideBar from "../../../../components/SideBar/SideBar";
import { useSelector } from "react-redux";

const QRCodeYears = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState("");

  const [change, setChange] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["QR_CODE_YEAR", change],
    queryFn: async () => {
      return await QR_CODE_ReportMonthGetAPI({
        year,
        pharmacy,
      });
    },
  });

  if (error) return `Error: ${error.message}`;

  let result = null;
  if (!isLoading) {
    result = totalYear(data.data);
  }

  let with_qr = 0;
  let no_qr = 0;
  if (data && data.data) {
    with_qr = totalMoneyByKey(data.data, "receipt_price");
    no_qr = totalMoneyByKeyMinus(data.data, "price", "receipt_price");
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
          <SideBar>
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
              <th style={{ width: "5px", padding: "20px 10px" }}>№</th>
              <th>
                <b>{year}</b>
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
                              item.month == m.id &&
                              (item.receipt_price == 0
                                ? ""
                                : "")
                          )}
                        </b>
                      </td>
                      <td>
                        <b>
                          {result.map(
                            (item) =>
                              item.month == m.id &&
                              formatNumber(item.price)
                          )}
                        </b>
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
                style={{
                  position: "sticky",
                  bottom: 0,
                  background: "#d9d9d9",
                  zIndex: 55,
                }}
              >
                <tr className="text-center">
                  <th colSpan="2" className="py-2">
                    Jami:
                  </th>
                  <th>
                    {/* {formatNumber(totalMoneyByKey(result, "receipt_price"))} */}
                  </th>
                  <th>
                    {formatNumber(
                      totalMoneyByKey(result, "price") 
                        
                    )}
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
                      <td>
                        <b></b>
                      </td>
                      <td>
                        <b></b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot
                style={{
                  position: "sticky",
                  bottom: 0,
                  background: "#d9d9d9",
                  zIndex: 55,
                }}
              >
                <tr className="text-center">
                  <th colSpan="2" className="py-2">
                    Jami:
                  </th>
                  <th>0</th>
                  <th>0</th>
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

export default QRCodeYears;
