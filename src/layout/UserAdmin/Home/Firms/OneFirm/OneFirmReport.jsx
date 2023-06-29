import React, { useState } from "react";
import { useQuery } from "react-query";
import { firmReportGetAPI } from "../../../../../api/FirmsRequest";
import { formatNumber } from "../../../../../functions/NecessaryFunctions";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import PaginationForModal from "../../../../../utils/PaginationForModal";
import Empty from "../../../../../utils/Empty";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import SideBarFirms from "../SideBar/SideBarFirms";
import { useToasts } from "react-toast-notifications";
import Topbar from "../../../../../components/Topbar/Topbar";
import Navbar from "../../../../../components/Navbar/Navbar";

const OneFirmReport = () => {
  const { id, name } = useParams();
  const { addToast } = useToasts();
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pharm_id, setPharmId] = useState("");

  const [change, setChange] = useState(false);

  const { data, isLoading, refetch, isFetching } = useQuery({
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
      addToast("To'gri tanlang vaqtlarni !", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    refetch();
    setChange(true);
  };

  return (
    <>
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
            style={{ maxHeight: "calc(100vh - 210px)", overflowY: "scroll" }}
          >
            <table
              className="table-stripe table table-sm table-bordered table-hover border-secondary align-middle text-center p-3 py-0 my-0"
              style={{ width: "max-content", minWidth: "91vw" }}
            >
              <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
                <tr
                  className="align-middle"
                  style={{ backgroundColor: "var(--blue)", color: "#fff" }}
                >
                  <th style={{ width: "5px" }}>№</th>
                  <th style={{ width: "250px" }}>
                    <b>Nomi</b>
                  </th>
                  <th style={{ width: "200px" }}>
                    <b>Operatsiyalar</b>
                  </th>
                  <th colSpan={2} className="p-0">
                    <table className="w-100 table-sm table-bordered m-0">
                      <tbody>
                        <tr>
                          <th colSpan="2">
                            <b>Summa naqt pul</b>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <h6>
                              <b>Pul berildi</b>
                            </h6>
                            <h6>
                              <b>Chiqim</b>
                            </h6>
                          </th>
                          <th>
                            <h6>
                              <b>Tovar olindi</b>
                            </h6>
                            <h6>
                              <b>Kirim</b>
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
                            <b>Summa naqt pulsiz</b>
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <h6>
                              <b>Pul ko'chirildi</b>
                            </h6>
                            <h6>
                              <b>Chiqim</b>
                            </h6>
                          </th>

                          <th>
                            <h6>
                              <b>Tovar olindi</b>
                            </h6>
                            <h6>
                              <b>Kirim</b>
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
                  <th colSpan={2} className="text-danger">
                    <b>
                      {data &&
                        formatNumber(data.data.not_transfer_debt_in_start_date)}
                    </b>
                  </th>
                  <th colSpan={2} className="text-danger">
                    <b>
                      {data &&
                        formatNumber(data.data.transfer_debt_in_start_date)}
                    </b>
                  </th>
                </tr>
              </thead>
              {data && data.data.results.length != 0 ? (
                <>
                  <tbody>
                    {data &&
                      data.data.results.map((firm, index) => (
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
                              formatNumber(firm.price)}
                          </td>
                          <td style={{ width: "221px" }}>
                            {firm.is_transfer == false &&
                              firm.is_expense == false &&
                              formatNumber(firm.price)}
                          </td>
                          <td style={{ width: "228px" }}>
                            {firm.is_transfer == true &&
                              firm.is_expense == true &&
                              formatNumber(firm.price)}
                          </td>
                          <td style={{ width: "200px" }}>
                            {firm.is_transfer == true &&
                              firm.is_expense == false &&
                              formatNumber(firm.price)}
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
                      <th colSpan={3} className="text-uppercase py-2">
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
                        ПОСЛЕДНИЙ ДОЛГ <span className="mx-4">{endDate}</span>
                      </th>
                      <th className="text-danger" colSpan={2}>
                        {data &&
                          formatNumber(
                            data.data.income_not_transfer_total_price -
                              data.data.expense_not_transfer_total_price +
                              data.data.not_transfer_debt_in_start_date
                          )}
                      </th>
                      <th className="text-danger" colSpan={2}>
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
              pages={Math.ceil(data && data.data.count / 10)}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OneFirmReport;
