import React, { useState } from "react";
import { useQuery } from "react-query";
import { pharmaciesToDebtsGetAPI } from "../../../../../api/DirectorRequest";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import { formatNumber } from "../../../../../functions/NecessaryFunctions";
import PaginationForModal from "../../../../../utils/PaginationForModal";

import { useSelector } from "react-redux";
import SideBarDebtGive from "../SideBar/SideBarDebtGive";
import { pagination } from "../../../../../api";
import { useTranslation } from "react-i18next";

const DebtGive = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYears] = useState(new Date().getFullYear());

  const [page, setPage] = useState(1);

  const [pharmacy, setPharmacy] = useState("");

  const [change, setChange] = useState(false);

  const { data, isLoading, error } = useQuery(
    ["to_debts_reports", page, change],
    async () => {
      return await pharmaciesToDebtsGetAPI({
        is_client: false,
        pharmacy,
        year,
        month,
        page,
      });
    }
  );

  if (error) return `Error: ${error.message}`;

  const filterFunction = () => {
    setChange(!change);
    setPage(1);
  };

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  return (
    <>
      {/* SIDEBAR */}
      <div className="header_flex justify-content-end">
        <SideBarDebtGive
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

      {/* TABLE */}
      <div
        className="container-fluid my-2"
        style={{ maxHeight: "calc(100vh - 180px)", overflowY: "scroll" }}
      >
        <table
          className="table table-sm table-hover table-bordered border-secondary align-middle text-center"
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
              <th style={{ width: "5px", padding: '20px 10px' }}>№</th>
              <th>{r(0)}</th>
              <th>{g(27)}</th>
              <th>{g(12)}</th>
              <th>{g(13)}</th>
              <th>{g(28)}</th>
              <th>{g(14)}</th>
            </tr>
          </thead>
          <tbody>
            {data && data.data.results.length === 0 && (
              <tr style={{ background: "var(--ch_white)" }}>
                <td colSpan={12}>
                  <h2>{g(23)}</h2>
                </td>
              </tr>
            )}
            {data &&
              data.data.results.map((item, index) => (
                <tr key={item.id} style={{ background: "var(--ch_white)" }}>
                  <td data-label="№">{index + 1}</td>
                  <td data-label="Sana">
                    {item.report_date}
                  </td>
                  <td data-label="Xodim">
                    <b className="fw-600">{item.creator_name}</b>
                    <br />
                    {item.created_at}
                  </td>
                  <td data-label="Kim qarz oldi" className="text-break">
                    <b className="fw-600">

                      {item.to_who?.substring(0, 50)}
                    </b>
                    <br />
                    {item.phone_number}
                  </td>
                  <td data-label="Qarz summasi">
                    {formatNumber(item.price)}
                  </td>
                  <td data-label="Qanchasi berildi">
                    {
                      <b className="text-success fw-600">
                        {item.price - item.remaining_debt == 0
                          ? "0.00"
                          : formatNumber(item.price - item.remaining_debt)}
                      </b>
                    }
                  </td>
                  <td data-label="Qanchasi qoldi">
                    <b className="text-danger fw-600">
                      {item.remaining_debt == 0 ? (
                        <span class="badge text-bg-success"><i className="fa fa-check"></i></span>
                      ) : (
                        formatNumber(item.remaining_debt)
                      )}
                    </b>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
      </div>

      <div className="fixed-bottom">
        <PaginationForModal
          page={page}
          pages={Math.ceil(data && data.data.count / pagination)}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default DebtGive;
