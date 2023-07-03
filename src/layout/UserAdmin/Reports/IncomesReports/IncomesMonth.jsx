import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  filterDataByShift,
  formatNumber,
  sortMainWorkersByShift,
  totalMoneyWithIndex,
  totalMoneyWithOutIndex,
  totalWatntToByKey,
} from "../../../../functions/NecessaryFunctions";
import Empty from "../../../../utils/Empty";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { reportsPharmacyAPI } from "../../../../api/GlobalRequest";

import { useSelector } from "react-redux";
import { ReportsPharmacyExcelDownload } from "../../../../functions/ExcelActions";
import { accountsGetAPI } from "../../../../api/FirmsRequest";
import SideBarIncomeMonth from "./SideBarIncomeMonth";

const IncomesMonth = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const [change, setChange] = useState(false);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState(deteils.pharmacies.reverse()[0]?.id);

  const [shift, setShift] = useState(0);

  const { data: accounts } = useQuery({
    queryKey: ["users", pharmacy],
    queryFn: async () => {
      return await accountsGetAPI({
        role: "w",
        pharmacy,
      });
    },
  });

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["INCOME_MONTH"],
    queryFn: async () => {
      return await reportsPharmacyAPI({
        year,
        month,
        pharmacy,
      });
    },
    enabled: change,
  });

  if (error) return `Error: ${error.message}`;

  let result = [];
  if (data && data.data) {
    result = filterDataByShift(data.data, shift);
  }

  let users = [];
  if (accounts && accounts.data) {
    users = sortMainWorkersByShift(accounts.data.results);
  }
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
          <ReportsPharmacyExcelDownload
            pharmacy={pharmacy}
            year={year}
            month={month}
          />
          <SideBarIncomeMonth
            month={month}
            setMonth={setMonth}
            year={year}
            setYears={setYears}
            pharmacy={pharmacy}
            setPharmacy={setPharmacy}
            filterFunction={filterFunction}
            deteils={deteils}
            shift={shift}
            setShift={setShift}
            accounts={accounts}
            users={users}
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
              <th style={{ width: "5px" }}>№</th>
              <th>
                <b>Sana</b>
              </th>
              <th>
                <b>Xodim F.I.O</b>
              </th>
              <th>
                <b>Naqt pulga</b>
                <br />
                <b>savdo</b>
              </th>
              <th>
                <b>Naqt pulsiz</b>
                <br />
                <b>savdo</b>
              </th>
              <th>
                <b>Qarzga savdo</b>
              </th>

              <th>
                <b>Jami savdo</b>
                <br />
                <b>tushumi</b>
              </th>

              <th>
                <b>Kunlik jami</b>
                <br />
                <b>tushum</b>
              </th>
            </tr>
          </thead>
          {data && data.data.length != 0 ? (
            <>
              <tbody>
                {isLoading &&
                  [...Array(10).keys()].map((i) => (
                    <tr key={i}>
                      {[...Array(12).keys()].map(() => (
                        <td>
                          <SkeletLoading height={20} count={1} rodius={20} />
                        </td>
                      ))}
                    </tr>
                  ))}
                {result.map((day, index) => (
                  <tr
                    key={index + 1}
                    style={{
                      border: "1px solid #000",
                      background: "var(--ch_white)",
                    }}
                  >
                    <td>
                      <b>{index + 1}</b>
                    </td>
                    <td>
                      <b>{day.report_date}</b>
                    </td>
                    <td className="p-0">
                      <table className="w-100 table-sm m-0">
                        <tbody>
                          {day.shifts.map((user) => (
                            <tr
                              key={user.id}
                              style={{
                                borderBottom: `${
                                  shift == 0 ? "1" : "0"
                                }px solid #000`,
                              }}
                            >
                              <td>
                                <b className="text-muted">
                                  {user.worker
                                    ? user.worker
                                    : `${user.shift} Smena`}
                                </b>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>

                    <td className="p-0">
                      <table className="w-100 table-sm m-0">
                        <tbody>
                          {day.shifts.map((user) => (
                            <tr
                              key={user.id}
                              style={{
                                borderBottom: `${
                                  shift == 0 ? "1" : "0"
                                }px solid #000`,
                              }}
                            >
                              <td>
                                {user.not_transfer_income == 0 ? (
                                  "0.00"
                                ) : (
                                  <b>
                                    {formatNumber(user.not_transfer_income)}
                                  </b>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td className="p-0">
                      <table className="w-100 table-sm m-0">
                        <tbody>
                          {day.shifts.map((user) => (
                            <tr
                              key={user.id}
                              style={{
                                borderBottom: `${
                                  shift == 0 ? "1" : "0"
                                }px solid #000`,
                              }}
                            >
                              <td>
                                {user.transfer_income == 0 ? (
                                  "0.00"
                                ) : (
                                  <b>{formatNumber(user.transfer_income)}</b>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td className="p-0">
                      <table className="w-100 table-sm m-0">
                        <tbody>
                          {day.shifts.map((user) => (
                            <tr
                              key={user.id}
                              style={{
                                borderBottom: `${
                                  shift == 0 ? "1" : "0"
                                }px solid #000`,
                              }}
                            >
                              <td>
                                {user.debt_income == 0 ? (
                                  <b>0.00</b>
                                ) : (
                                  <b>{formatNumber(user.debt_income)}</b>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td className="p-0">
                      <table className="w-100 table-sm m-0">
                        <tbody>
                          {day.shifts.map((user) => (
                            <tr
                              key={user.id}
                              style={{
                                borderBottom: `${
                                  shift == 0 ? "1" : "0"
                                }px solid #000`,
                              }}
                            >
                              <td>
                                {user.not_transfer_income +
                                  user.transfer_income ==
                                0 ? (
                                  "0.00"
                                ) : (
                                  <b>
                                    {formatNumber(
                                      user.not_transfer_income +
                                        user.transfer_income
                                    )}
                                  </b>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>

                    <td
                      className="text-center"
                      style={{ backgroundColor: "#d9d9d9" }}
                    >
                      <b>
                        {totalMoneyWithIndex(data.data, index) == 0
                          ? "0.00"
                          : formatNumber(totalMoneyWithIndex(data.data, index))}
                      </b>
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
                    Jami:
                  </th>
                  <th>
                    <b>
                      {data &&
                        data.data &&
                        formatNumber(
                          totalWatntToByKey(result, "not_transfer_income")
                        )}
                    </b>
                  </th>
                  <th>
                    <b>
                      {data &&
                        data.data &&
                        formatNumber(
                          totalWatntToByKey(result, "transfer_income")
                        )}
                    </b>
                  </th>
                  <th>
                    <b>
                      {data &&
                        data.data &&
                        formatNumber(totalWatntToByKey(result, "debt_income"))}
                    </b>
                  </th>
                  <th>
                    <b>
                      {data &&
                        data.data &&
                        formatNumber(totalMoneyWithOutIndex(result))}
                    </b>
                  </th>
                  <th>
                    <b>
                      {data &&
                        data.data &&
                        formatNumber(totalMoneyWithOutIndex(result))}
                    </b>
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

export default IncomesMonth;
