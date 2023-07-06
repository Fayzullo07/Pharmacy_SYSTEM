import React, { useState } from "react";
import { months } from "../../../../api";
import { useQuery } from "react-query";
import { firmReportMonthAPI } from "../../../../api/FirmsRequest";
import {
  formatNumber,
  totalMoneyByKey,
  totalYearToFirm,
} from "../../../../functions/NecessaryFunctions";
import SkeletLoading from "../../../../utils/SkeletLoading";

import { useSelector } from "react-redux";
import SideBarFirmYears from "./SideBarFirmYears";
import FirmReportSearch from "./FirmReportSearch";

const FirmsYears = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const [searchModal, setSearchModal] = useState(false);
  const [curData, setCurData] = useState(deteils.firms[0]);

  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState("");

  const [change, setChange] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["FIRM_YEAR", change],
    queryFn: async () => {
      return await firmReportMonthAPI({
        year,
        pharmacy,
        firm: curData.id,
      });
    },
  });

  if (error) return `Error: ${error.message}`;


  let result = null;
  if (data && data.data) {
    result = totalYearToFirm(data.data);
  }
  const filterFunction = () => {
    setChange(!change);
  };

  return (
    <>
      {searchModal && (
        <FirmReportSearch
          showModal={searchModal}
          setShowModal={setSearchModal}
          setCurData={setCurData}
        />
      )}
      {/* TOPBAR */}
      <div className="header_flex">
        <h2>{curData.name}</h2>
        <div className="d-flex">
          <SideBarFirmYears
            year={year}
            setYears={setYears}
            pharmacy={pharmacy}
            setPharmacy={setPharmacy}
            deteils={deteils}
            filterFunction={filterFunction}
            curData={curData}
            setSearchModal={setSearchModal}
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
              <th style={{ width: "5px", padding: "15px 10px" }}>№</th>
              <th>
                <b>Oy</b>
              </th>
              <th>
                <b>Firmalarga berilgan</b>
                <br />
                <b>summasi</b>
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
                              formatNumber(item.expense_price)
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
                  <th>
                    {data &&
                      data.data &&
                      formatNumber(totalMoneyByKey(data.data, "expense_price"))}
                  </th>
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

export default FirmsYears;
