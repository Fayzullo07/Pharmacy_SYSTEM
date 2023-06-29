import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { reportsPharmacyAPI } from "../../../../../api/GlobalRequest";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import {
  filterDataByShift,
  formatNumber,
  sortMainWorkersByShift,
  totalMoneyWithIndex,
  totalMoneyWithOutIndex,
  totalReceiptPriceWithIndex,
  totalWatntToByKey,
} from "../../../../../functions/NecessaryFunctions";
import Navbar from "../../../../../components/Navbar/Navbar";

import { accountsGetAPI } from "../../../../../api/FirmsRequest";
// import { ReportsPharmacyExcelDownload } from "../../../../../functions/ExcelActions";
import Topbar from "../../../../../components/Topbar/Topbar";
import SideBarBranchs from "../SideBar/SideBarBranchs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const OneBranchReport = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "Reports" });

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYears] = useState(new Date().getFullYear());
  const [shift, setShift] = useState(0);

  const { data: accounts } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      return await accountsGetAPI({
        role: "w",
        pharmacy: id,
      });
    },
  });

  const [change, setChange] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["pharmacy_report", change, id],
    queryFn: async () => {
      return await reportsPharmacyAPI({
        pharmacy: id,
        year,
        month,
      });
    },
  });

  let result = [];
  if (data && data.data) {
    result = filterDataByShift(data.data, shift);
  }

  let users = [];
  if (accounts && accounts.data) {
    users = sortMainWorkersByShift(accounts.data.results);
  }

  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;

  const filterFunction = () => {
    setChange(!change);
  };
  return (
    <>
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar>
            <div className="header_flex">
              <h2>{name}</h2>
            </div>
            <SideBarBranchs
              month={month}
              setMonth={setMonth}
              year={year}
              setYears={setYears}
              accounts={accounts}
              users={users}
              shift={shift}
              setShift={setShift}
              filterFunction={filterFunction}
            />
          </Topbar>

          {/* TABLE */}
          <div
            className="mx-md-2 m-2"
            style={{ maxHeight: "calc(100vh - 100px)", overflowY: "scroll" }}
          >
            <table
              className="table table-sm table-hover table-bordered border-dark align-middle text-center p-3"
              style={{ width: "max-content", minWidth: "92vw" }}
            >
              <thead
                className=" align-middle"
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "var(--blue)",
                  color: "#fff",
                  zIndex: 5,
                }}
              >
                <tr>
                  <th style={{ width: "5px" }}>№</th>

                  <th>
                    <h6>
                      <b>{t("0")}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("1")}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("2").substring(0, 10)}</b>
                    </h6>
                    <h6>
                      <b>{t("2").substring(11)}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("3").substring(0, 11)}</b>
                    </h6>
                    <h6>
                      <b>{t("3").substring(12)}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("4")}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>Chegirma savdo</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("5").substring(0, 10)}</b>
                    </h6>
                    <h6>
                      <b>{t("5").substring(11)}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("6").substring(0, 11)}</b>
                    </h6>
                    <h6>
                      <b>{t("6").substring(12)}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("7").substring(0, 16)}</b>
                    </h6>
                    <h6>
                      <b>{t("7").substring(17)}</b>
                    </h6>
                  </th>

                  <th style={{ backgroundColor: "#d9d9d9", color: "#000" }}>
                    <h6>
                      <b>{t("8").substring(0, 11)}</b>
                    </h6>
                    <h6>
                      <b>{t("8").substring(12)}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("9").substring(0, 12)}</b>
                    </h6>
                    <h6>
                      <b>{t("9").substring(13)}</b>
                    </h6>
                  </th>

                  <th>
                    <h6>
                      <b>{t("10").substring(0, 12)}</b>
                    </h6>
                    <h6>
                      <b>{t("10").substring(13)}</b>
                    </h6>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  [...Array(60).keys()].map((i) => (
                    <tr key={i}>
                      {[...Array(13).keys()].map(() => (
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
                      background: "var(--g_white)",
                    }}
                  >
                    <td>{index + 1}</td>
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
                                    : `${user.shift} ${t("12")}`}
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
                                  "~"
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
                                  "~"
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
                                  "~"
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
                                {user.not_transfer_discount_price == 0 ? (
                                  "~"
                                ) : (
                                  <b>
                                    {formatNumber(
                                      user.not_transfer_discount_price
                                    )}
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
                                {user.not_transfer_income +
                                  user.transfer_income +
                                  user.not_transfer_discount_price +
                                  user.debt_income ==
                                0 ? (
                                  "~"
                                ) : (
                                  <b>
                                    {formatNumber(
                                      user.not_transfer_income +
                                        user.transfer_income +
                                        user.not_transfer_discount_price +
                                        user.debt_income
                                    )}
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
                                {user.total_expense == 0 ? (
                                  "~"
                                ) : (
                                  <b>{formatNumber(user.total_expense)}</b>
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
                                {user.remainder == 0 ? (
                                  "~"
                                ) : (
                                  <b>{formatNumber(user.remainder)}</b>
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
                        {totalMoneyWithIndex(result, index) == 0
                          ? "~"
                          : formatNumber(totalMoneyWithIndex(result, index))}
                      </b>
                    </td>
                    <td className="text-center">
                      {totalReceiptPriceWithIndex(result, index) == 0 ? (
                        "~"
                      ) : (
                        <b>
                          {formatNumber(
                            totalReceiptPriceWithIndex(result, index)
                          )}
                        </b>
                      )}
                    </td>
                    <td className="text-center">
                      <b>
                        {totalMoneyWithIndex(result, index) -
                          totalReceiptPriceWithIndex(result, index) ==
                        0
                          ? "~"
                          : formatNumber(
                              totalMoneyWithIndex(result, index) -
                                totalReceiptPriceWithIndex(result, index)
                            )}
                      </b>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ position: "sticky", bottom: 0, zIndex: 555 }}>
                <tr
                  className="text-center"
                  style={{ backgroundColor: "#dae1f3" }}
                >
                  <th colSpan="3" className="py-2">
                    {t("11")}:
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
                        formatNumber(
                          totalWatntToByKey(
                            result,
                            "not_transfer_discount_price"
                          )
                        )}
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
                        formatNumber(
                          totalWatntToByKey(result, "total_expense")
                        )}
                    </b>
                  </th>
                  <th>
                    <b>
                      {data &&
                        data.data &&
                        formatNumber(totalWatntToByKey(result, "remainder"))}
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
                        formatNumber(
                          totalWatntToByKey(result, "receipt_price")
                        )}
                    </b>
                  </th>
                  <th>
                    <b>
                      {data &&
                        data.data &&
                        formatNumber(
                          totalMoneyWithOutIndex(result) -
                            totalWatntToByKey(result, "receipt_price") +
                            totalWatntToByKey(result, "debt_income")
                        )}
                    </b>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneBranchReport;
