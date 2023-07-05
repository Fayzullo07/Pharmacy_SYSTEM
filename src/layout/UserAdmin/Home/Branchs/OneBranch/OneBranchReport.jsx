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
  totalReceiptPrice,
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
import { number_0 } from "../../../../../api";

const OneBranchReport = () => {
  const { id, name } = useParams();
  const { t } = useTranslation("translation", { keyPrefix: "Reports" });
  const navigate = useNavigate();

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
              <i
                  className="fa fa-arrow-left fs-4 me-2"
                  style={{ color: "var(--text_color_blue)" }}
                  onClick={() => navigate("/branchs")}
                />
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
              smena={t(13)}
              hammasi={t(14)}
              tasdiq={t(15)}
            />
          </Topbar>

          {/* TABLE */}
          <div
            className="mx-md-2 m-2"
            style={{ maxHeight: "calc(100vh - 100px)", overflowY: "scroll" }}
          >
            <table
              className="table table-sm table-hover table-bordered border-dark align-middle text-center p-3"
              style={{
                width: "max-content",
                minWidth: `${ "95vw"}`,
              }}
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
                  <th style={{ width: "30px" }}>№</th>

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

                  <th style={{width: '100px'}}>
                    <h6>
                      <b>{t(5)}</b>
                    </h6>
                  </th>

                  <th style={{width: '120px'}}>
                    <h6>
                      <b>{t(6)}</b>
                    </h6>
                  </th>

                  <th style={{width: '120px'}}>
                    <h6>
                      <b>{t(7)}</b>
                    </h6>
                    
                  </th>

                  <th style={{width: '150px'}}>
                    <h6>
                      <b>{t(8)}</b>
                    </h6>
                   
                  </th>

                  <th style={{ backgroundColor: "#d9d9d9", color: "#000",width: '120px' }}>
                    <h6>
                      <b>{t(9)}</b>
                    </h6>
                    
                  </th>

                  <th style={{width: '120px'}}>
                    <h6>
                      <b>{t(10)}</b>
                    </h6>
                   
                  </th>

                  <th style={{width: '120px'}}>
                    <h6>
                      <b>{t(11)}</b>
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
                      <b className="fw-normal">{day.report_date}</b>
                    </td>
                    <td className="p-0">
                      <table className="w-100 table-sm m-0">
                        <tbody>
                          {day.shifts.map((user) => (
                            <tr
                              key={user.id}
                              style={{
                                borderBottom: `${shift == 0 ? "1" : "0"
                                  }px solid #000`,
                              }}
                            >
                              <td>
                                <b className="text-muted">
                                  {user.worker
                                    ? user.worker
                                    : `${user.shift} - ${t(13)}`}
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
                                borderBottom: `${shift == 0 ? "1" : "0"
                                  }px solid #000`,
                              }}
                            >
                              <td>
                                {user.not_transfer_income == 0 ? (
                                  <b className="fw-normal">{number_0}</b>
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
                                borderBottom: `${shift == 0 ? "1" : "0"
                                  }px solid #000`,
                              }}
                            >
                              <td>
                                {user.transfer_income == 0 ? (
                                  <b className="fw-normal">{number_0}</b>
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
                                borderBottom: `${shift == 0 ? "1" : "0"
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
                                borderBottom: `${shift == 0 ? "1" : "0"
                                  }px solid #000`,
                              }}
                            >
                              <td>
                                {user.not_transfer_discount_price + user.transfer_discount_price == 0 ? (
                                  <b className="fw-normal">{number_0}</b>
                                ) : (
                                  <b className="fw-normal">
                                    {formatNumber(
                                      user.not_transfer_discount_price + user.transfer_discount_price
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
                                borderBottom: `${shift == 0 ? "1" : "0"
                                  }px solid #000`,
                              }}
                            >
                              <td>
                                {user.not_transfer_income +
                                  user.transfer_income +
                                  user.not_transfer_discount_price + user.transfer_discount_price +
                                  user.debt_income ==
                                  0 ? (
                                  <b className="fw-normal">{number_0}</b>
                                ) : (
                                  <b className="fw-normal">
                                    {formatNumber(
                                      user.not_transfer_income +
                                      user.transfer_income +
                                      user.not_transfer_discount_price +
                                      user.debt_income + user.transfer_discount_price
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
                                borderBottom: `${shift == 0 ? "1" : "0"
                                  }px solid #000`,
                              }}
                            >
                              <td>
                                {user.total_expense == 0 ? (
                                  <b className="fw-normal">{number_0}</b>
                                ) : (
                                  <b className="fw-normal">{formatNumber(user.total_expense)}</b>
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
                                borderBottom: `${shift == 0 ? "1" : "0"
                                  }px solid #000`,
                              }}
                            >
                              <td>
                                {user.remainder == 0 ? (
                                  <b className="fw-normal">{number_0}</b>
                                ) : (
                                  <b className="fw-normal">{formatNumber(user.remainder)}</b>
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
                        {totalMoneyWithIndex(result, index) == 0
                          ? number_0
                          : formatNumber(totalMoneyWithIndex(result, index))}
                      </b>
                    </td>
                    <td className="text-center">
                      {totalReceiptPriceWithIndex(result, index) == 0 ? (
                        <b className="fw-normal">0.00</b>
                      ) : (
                        <b className="fw-normal">
                          {formatNumber(
                            totalReceiptPriceWithIndex(result, index)
                          )}
                        </b>
                      )}
                    </td>
                    <td className="text-center">
                      <b className="fw-normal">
                        {totalMoneyWithIndex(result, index) -
                          totalReceiptPriceWithIndex(result, index) ==
                          0
                          ? number_0
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
                        data.data && totalWatntToByKey(result, "debt_income") == 0 ? number_0 :
                        formatNumber(totalWatntToByKey(result, "debt_income"))}
                    </b>
                  </th>
                  <th>
                    <b className="fw-600">
                      {data &&
                        data.data &&  totalWatntToByKey(
                            result,
                            "not_transfer_discount_price"
                          ) + totalWatntToByKey(
                            result,
                            "transfer_discount_price"
                          ) == 0 ? number_0 :
                        formatNumber(
                          totalWatntToByKey(
                            result,
                            "not_transfer_discount_price"
                          ) + totalWatntToByKey(
                            result,
                            "transfer_discount_price"
                          )
                        )}
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
                        data.data && totalWatntToByKey(result, "total_expense") == 0 ? number_0 :
                        formatNumber(
                          totalWatntToByKey(result, "total_expense")
                        )}
                    </b>
                  </th>
                  <th>
                    <b className="fw-600">
                      {data &&
                        data.data && totalWatntToByKey(result, "remainder") == 0 ? number_0 :
                        formatNumber(totalWatntToByKey(result, "remainder"))}
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
                        data.data && totalWatntToByKey(result, "receipt_price") + totalWatntToByKey(result, "debt_income") == 0 ? number_0 :
                        formatNumber(
                          totalWatntToByKey(result, "receipt_price") + totalWatntToByKey(result, "debt_income")
                        )}
                    </b>
                  </th>
                  <th>
                    <b className="fw-600">
                      {data &&
                        data.data && totalMoneyWithOutIndex(result) - totalReceiptPrice(result) == 0 ? number_0 :
                        formatNumber(
                          totalMoneyWithOutIndex(result) - totalReceiptPrice(result)
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
