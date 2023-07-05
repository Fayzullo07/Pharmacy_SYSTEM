import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { firmReportGetAPI } from "../../../../../api/FirmsRequest";
import { formatNumber } from "../../../../../functions/NecessaryFunctions";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import PaginationForModal from "../../../../../utils/PaginationForModal";
import Empty from "../../../../../utils/Empty";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import SideBarFirms from "../SideBar/SideBarFirms";
import Topbar from "../../../../../components/Topbar/Topbar";
import Navbar from "../../../../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import { toggleFunction } from "../../../../../redux/Actions/ToggleActions";
import { useTranslation } from "react-i18next";

const OneFirmReport = () => {
  const { id, name } = useParams();
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pharm_id, setPharmId] = useState("");

  const [change, setChange] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggleFunction(false));
  }, [])
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["firm_report", id, page],
    queryFn: async () => {
      return await firmReportGetAPI({
        report_date__gte: startDate,
        report_date__lte: endDate,
        pharmacy_id: pharm_id,
        firm_id: id,
        page,
      });
    },
    enabled: change,
  });

  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;
  const { deteils } = reduxData.deteils;

  const filterFunction = () => {
    if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
      toast.warning("To'gri tanlang vaqtlarni")

      return;
    }
    refetch();
    setChange(true);
  };

  const { t } = useTranslation("translation", { keyPrefix: "Firm" });

  return (
    <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex">
            <h2>{name}</h2>
            <SideBarFirms
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              pharm_id={pharm_id}
              setPharmId={setPharmId}
              deteils={deteils}
              filterFunction={filterFunction}
            />
          </div>
        </Topbar>

        {/* TABLE */}
        <div
          className="mx-md-3 m-2"
          style={{ maxHeight: "calc(100vh - 150px)", overflowY: "scroll" }}
        >
          <table
            className="table-stripe table table-sm table-bordered table-hover border-secondary align-middle text-center p-3 py-0 my-0"
            style={{
              width: "max-content",
              minWidth: `${toggle ? "75vw" : "95vw"}`,
            }}
          >
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr
                className="align-middle"
                style={{ backgroundColor: "var(--blue)", color: "#fff" }}
              >
                <th style={{ width: "5px" }}>№</th>
                <th style={{ width: "250px" }}>
                  <b>{t(0)}</b>
                </th>
                <th style={{ width: "200px" }}>
                  <b>{t(1)}</b>
                </th>
                <th colSpan={2} className="p-0">
                  <table className="w-100 table-sm table-bordered m-0">
                    <tbody>
                      <tr>
                        <th colSpan="2">
                          <b>{t(2)}</b>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <h6>
                            <b>{t(4)}</b>
                          </h6>
                          <h6>
                            <b>{t(7)}</b>
                          </h6>
                        </th>
                        <th>
                          <h6>
                            <b>{t(6)}</b>
                          </h6>
                          <h6>
                            <b>{t(8)}</b>
                          </h6>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </th>
                <th colSpan={2} className="p-0">
                  <table className="w-100 table-sm table-bordered border-secondary m-0">
                    <tbody>
                      <tr>
                        <th colSpan="2">
                          <b>{t(3)}</b>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <h6>
                            <b>{t(5)}</b>
                          </h6>
                          <h6>
                            <b>{t(7)}</b>
                          </h6>
                        </th>

                        <th>
                          <h6>
                            <b>{t(6)}</b>
                          </h6>
                          <h6>
                            <b>{t(8)}</b>
                          </h6>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </th>
              </tr>
              <tr style={{ background: "var(--g_white)" }}>
                <th colSpan={3} className="text-danger">
                  <b>Остаток на начало периода долг: {startDate}</b>
                </th>
                <th colSpan={2} className="text-success">

                  <b>
                    {data && data?.data ?
                      formatNumber(data?.data?.not_transfer_debt_in_start_date) : '0.00'}
                  </b>
                </th>
                <th colSpan={2} className="text-success">
                  <b>
                    {data && data?.data ?
                      formatNumber(data?.data?.transfer_debt_in_start_date) : '0.00'}
                  </b>
                </th>
              </tr>
            </thead>
            {data && data?.data?.results.length != 0 ? (
              <>
                <tbody>
                  {data &&
                    data?.data?.results.map((firm, index) => (
                      <tr
                        style={{
                          border: "2px dotted #000",
                          background: "var(--g_white)",
                        }}
                      >
                        <td>{index + 1}</td>
                        <td className=" text-start">
                          <h6 className="m-0">
                            {firm.pharmacy_name ? firm.pharmacy_name : "~"}
                          </h6>
                          <h6 className="m-0">{firm.report_date}</h6>
                        </td>
                        <td className=" text-start">
                          <h6 className="m-0">{firm.created_at}</h6>
                          <h6 className="m-0">
                            {firm.verified_firm_worker_name
                              ? firm.verified_firm_worker_name
                              : "~"}
                          </h6>
                          <h6 className="m-0">
                            {firm.verified_phone_number
                              ? firm.verified_phone_number
                              : "~"}
                          </h6>
                        </td>
                        <td style={{ width: "195px" }}>
                          {firm.is_transfer == false &&
                            firm.is_expense == true &&
                            <b>
                              {
                                formatNumber(firm.price)
                              }
                            </b>}
                        </td>
                        <td style={{ width: "221px" }}>
                          {firm.is_transfer == false &&
                            firm.is_expense == false &&
                            <b>
                              {
                                formatNumber(firm.price)
                              }
                            </b>}
                        </td>
                        <td style={{ width: "228px" }}>
                          {firm.is_transfer == true &&
                            firm.is_expense == true &&
                            <b>
                              {
                                formatNumber(firm.price)
                              }
                            </b>
                          }
                        </td>
                        <td style={{ width: "200px" }}>
                          {firm.is_transfer == true &&
                            firm.is_expense == false &&
                            <b>
                              {
                                formatNumber(firm.price)
                              }
                            </b>
                          }
                        </td>
                      </tr>
                    ))}

                  {isLoading &&
                    [...Array(16).keys()].map(() => (
                      <tr>
                        {[...Array(7).keys()].map(() => (
                          <td>
                            <SkeletLoading
                              height={20}
                              count={1}
                              rodius={20}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
                <tfoot
                  style={{
                    position: "sticky",
                    bottom: 0,
                    zIndex: 55,
                    backgroundColor: "#d9d9d9",
                  }}
                >
                  <tr
                    className="text-center"
                    style={{ color: "var(--blue)" }}
                  >
                    <th colSpan={3} className=" py-2">
                      Обороты за период
                    </th>
                    <th>
                      {data &&
                        formatNumber(
                          data.data.expense_not_transfer_total_price
                        )}
                    </th>
                    <th>
                      {data &&
                        formatNumber(
                          data.data.income_not_transfer_total_price
                        )}
                    </th>
                    <th>
                      {data &&
                        formatNumber(data.data.expense_transfer_total_price)}
                    </th>
                    <th>
                      {data &&
                        formatNumber(data.data.income_transfer_total_price)}
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th className="text-danger" colSpan={3}>
                      Остаток на конец периода долг: <span className="mx-4">{endDate}</span>
                    </th>
                    <th className="text-success" colSpan={2}>
                      {data &&
                        formatNumber(
                          data.data.income_not_transfer_total_price -
                          data.data.expense_not_transfer_total_price +
                          data.data.not_transfer_debt_in_start_date
                        )}
                    </th>
                    <th className="text-success" colSpan={2}>
                      {data &&
                        formatNumber(
                          data.data.income_transfer_total_price -
                          data.data.expense_transfer_total_price +
                          data.data.transfer_debt_in_start_date
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
            pages={Math.ceil(data && data?.data?.count / 10)}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default OneFirmReport;