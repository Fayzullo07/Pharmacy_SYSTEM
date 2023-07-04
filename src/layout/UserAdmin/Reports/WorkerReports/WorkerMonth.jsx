import React, { useEffect, useState } from "react";
import {
  accountReportDayGetAPI,
  accountsGetAPI,
} from "../../../../api/FirmsRequest";
import { useQuery, useQueryClient } from "react-query";
import { formatNumber, totalMoney, totalWatntToByKey } from "../../../../functions/NecessaryFunctions";
import Empty from "../../../../utils/Empty";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { months, number_0, years } from "../../../../api";
import SideBar from "../../../../components/SideBar/SideBar";

import { useSelector } from "react-redux";
import PaginationForModal from "../../../../utils/PaginationForModal";
import { AccountReportDayExcelGetDownload } from "../../../../functions/ExcelActions";

const WorkerMonth = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const [change, setChange] = useState(false);
  const [page, setPage] = useState(1);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYears] = useState(new Date().getFullYear());
  const [pharmacy, setPharmacy] = useState(deteils.pharmacies[0]?.id);
  const [worker, setWorker] = useState("");

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries("WORKER_MONTH");
  }, [page]);

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
    queryKey: ["WORKER_MONTH", page],
    queryFn: async () => {
      return await accountReportDayGetAPI({
        year,
        month,
        page,
        worker,
      });
    },
    enabled: change,
  });

  if (error) return `Error: ${error.message}`;

  const filterFunction = () => {
    setChange(true);
    refetch();
    setPage(1);
    queryClient.removeQueries("WORKER_MONTH");
  };

  return (
    <>
      {/* TOPBAR */}
      <div className="header_flex">
        <h2>OYLIK</h2>
        <div className="d-flex">
          {accounts && accounts.data.results.length != 0 && worker != "" && (
            <AccountReportDayExcelGetDownload
              year={year}
              month={month}
              pharmacy={pharmacy}
              worker={worker}
            />
          )}
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
            {accounts && accounts.data.results.length != 0 && (
              <select
                value={worker}
                className="form-select my-3"
                onChange={(e) => setWorker(e.target.value)}
              >
                <option value="">Xodim tanlang</option>
                {accounts &&
                  accounts.data.results.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.first_name} {item.last_name}
                    </option>
                  ))}
              </select>
            )}
            {accounts && accounts.data.results.length != 0 && worker != "" && (
              <button
                className="btn"
                data-bs-dismiss={"offcanvas"}
                onClick={filterFunction}
                style={{ background: "var(--blue)", color: "#fff" }}
              >
                Tasdiqlash
              </button>
            )}
          </SideBar>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="container-fluid my-2"
        style={{ maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
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
                <b>Operatsiyalar</b>
              </th>

              <th>
                <b>Olgan ish haqi</b>
                <br />
                <b>summasi</b>
              </th>
            </tr>
          </thead>
          {data && data.data.results.length != 0 ? (
            <>
              <tbody>
                {data &&
                  data.data.results.map((item, index) => (
                    <tr
                      key={item.report_date}
                      style={{
                        border: "dotted 2px #000",
                        background: "var(--ch_white)",
                      }}
                    >
                      <td className="p-2">
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <b>{item.report_date}</b>
                      </td>
                      <td>
                        {item.created_at}
                        <br />
                        <b>{item.creator}</b>
                      </td>
                      <td className="text-center fw-bold">
                        {formatNumber(item.price)}
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
                  <th colSpan="3" className="py-3">
                    Jami:
                  </th>
                  <th>
                    {data &&
                      data.data && totalMoney(data.data.results, "price") == 0 ? number_0 :
                      formatNumber(totalMoney(data.data.results, "price"))}
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
    </>
  );
};

export default WorkerMonth;
