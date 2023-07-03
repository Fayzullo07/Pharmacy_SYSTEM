import React, { useState } from "react";
import { useQuery } from "react-query";
import { pharmaciesToDebtsGetAPI } from "../../../../../api/DirectorRequest";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import { formatNumber } from "../../../../../functions/NecessaryFunctions";
import PaginationForModal from "../../../../../utils/PaginationForModal";

import { useSelector } from "react-redux";
import SideBarDebtGive from "../SideBar/SideBarDebtGive";

const DebtGive = () => {
  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;
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
        style={{ maxHeight: "calc(100vh - 170px)", overflowY: "scroll" }}
      >
        <table
          className="table table-sm table-hover table-bordered border-dark align-middle text-center"
          style={{
            width: "max-content",
            minWidth: `${toggle ? "76vw" : "95vw"}`,
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
              <th>Sana</th>
              <th>Xodim F.I.O</th>
              <th>Kim qarz oldi</th>
              <th>Qarz summasi</th>
              <th>Qanchasi berildi</th>
              <th>Qanchasi qoldi</th>
            </tr>
          </thead>
          <tbody>
            {data && data.data.results.length === 0 && (
              <tr style={{ background: "var(--ch_white)" }}>
                <td colSpan={12}>
                  <h2>Malumot topilmadi!</h2>
                </td>
              </tr>
            )}
            {data &&
              data.data.results.map((item, index) => (
                <tr key={item.id} style={{ background: "var(--ch_white)" }}>
                  <td data-label="№">{index + 1}</td>
                  <td data-label="Sana">
                    <b>{item.report_date}</b>
                  </td>
                  <td data-label="Xodim F.I.O">
                    <b>{item.creator_name}</b>
                    <br />
                    {item.created_at}
                  </td>
                  <td data-label="Kim qarz oldi" className="text-break">
                    {item.to_who?.substring(0, 50)}
                    <br />
                    <b>{item.phone_number}</b>
                  </td>
                  <td data-label="Qarz summasi">
                    <b>{formatNumber(item.price)}</b>
                  </td>
                  <td data-label="Qanchasi berildi">
                    {
                      <b className="text-success">
                        {item.price - item.remaining_debt == 0
                          ? "0.00"
                          : formatNumber(item.price - item.remaining_debt)}
                      </b>
                    }
                  </td>
                  <td data-label="Qanchasi qoldi">
                    <b className="text-danger">
                      {item.remaining_debt == 0 ? (
                        <span class="badge text-bg-success">To'landi</span>
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
          pages={Math.ceil(data && data.data.count / 10)}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default DebtGive;
