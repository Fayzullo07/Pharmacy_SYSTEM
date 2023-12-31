import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  filterDataByShift,
  formatNumber,
  totalMoneyWithIndex,
  totalMoneyWithOutIndex,
  totalWatntToByKey,
} from "../../../../functions/NecessaryFunctions";
import Empty from "../../../../utils/Empty";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { reportsPharmacyAPI } from "../../../../api/GlobalRequest";

import { useSelector } from "react-redux";
import { ReportsPharmacyExcelDownload } from "../../../../functions/ExcelActions";
import SideBarIncomeMonth from "./SideBarIncomeMonth";
import { number_0 } from "../../../../api";
import { useTranslation } from "react-i18next";

const IncomesMonth = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;

  const [change, setChange] = useState(false);

  const shift = 0;

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState(deteils.pharmacies.reverse()[0]?.id);

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
 
  const filterFunction = () => {
    setChange(true);
    refetch();
  };

  const { t } = useTranslation("translation", { keyPrefix: "Reports" });
  const { t: f } = useTranslation("translation", { keyPrefix: "Firm" });
  return (
    <>
      {/* TOPBAR */}
      <div className="header_flex">
        <h2>{change && deteils.pharmacies.map((item) => {
          if(item.id == pharmacy){
            return item.name.length > 16 ? `${item.name.substring(0, 16)}. . .` : item.name
          }
        })}{pharmacy == "" && f(11)}</h2>
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
              <th style={{ width: "5px",padding: "20px 10px" }}>№</th>
              <th style={{width: '80px'}}>
                    <h6>
                      <b>{t(0)}</b>
                    </h6>
                  </th>

                  <th style={{width: '155px'}}>
                    <h6>
                      <b>{t(1)}</b>
                    </h6>
                  </th>

                  <th style={{width: '120px'}}>
                    <h6>
                      <b>{t(2)}</b>
                    </h6>
                   
                  </th>

                  <th style={{width: '100px'}}>
                    <h6>
                      <b>{t(3)}</b>
                    </h6>
                  </th>

                  <th style={{width: '100px'}}>
                    <h6>
                      <b>{t(4)}</b>
                    </h6>
                  </th>

                  <th style={{width: '120px'}}>
                    <h6>
                      <b>{t(6)}</b>
                    </h6>
                  </th>

                  <th style={{ backgroundColor: "#d9d9d9", color: "#000",width: '120px' }}>
                    <h6>
                      <b>{t(9)}</b>
                    </h6>
                    
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
                      <b className="fw-normal">{index + 1}</b>
                    </td>
                    <td>
                      <b className="fw-normal">{day.report_date}</b>
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
                                  number_0
                                ) : (
                                  <b className="fw-normal">
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
                                  number_0
                                ) : (
                                  <b className="fw-normal">{formatNumber(user.transfer_income)}</b>
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
                                  <b className="fw-normal">{number_0}</b>
                                ) : (
                                  <b className="fw-normal">{formatNumber(user.debt_income)}</b>
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
                                  number_0
                                ) : (
                                  <b className="fw-normal">
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
                      <b className="fw-normal">
                        {totalMoneyWithIndex(data.data, index) == 0
                          ? number_0
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
                    {t(12)}:
                  </th>
                  <th>
                    <b className="fw-600">
                      {data &&
                        data.data && totalWatntToByKey(result, "not_transfer_income") == 0 ? number_0 :
                        formatNumber(
                          totalWatntToByKey(result, "not_transfer_income")
                        )}
                    </b>
                  </th>
                  <th>
                    <b className="fw-600">
                      {data &&
                        data.data && totalWatntToByKey(result, "transfer_income") == 0 ? number_0 :
                        formatNumber(
                          totalWatntToByKey(result, "transfer_income")
                        )}
                    </b>
                  </th>
                  <th>
                    <b className="fw-600">
                      {data &&
                        data.data && totalWatntToByKey(result, "debt_income") == 0 ? number_0: 
                        formatNumber(totalWatntToByKey(result, "debt_income"))}
                    </b>
                  </th>
                  <th>
                    <b className="fw-600">
                      {data &&
                        data.data && totalMoneyWithOutIndex(result) == 0 ? number_0 :
                        formatNumber(totalMoneyWithOutIndex(result))}
                    </b>
                  </th>
                  <th>
                    <b className="fw-600">
                      {data &&
                        data.data && formatNumber(totalMoneyWithOutIndex(result)) == 0 ? number_0 :
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
