import React, { useEffect, useState } from "react";
import { firmReportGetAPI } from "../../../../api/FirmsRequest";
import { useQuery, useQueryClient } from "react-query";
import { formatNumber } from "../../../../functions/NecessaryFunctions";
import Empty from "../../../../utils/Empty";
import SkeletLoading from "../../../../utils/SkeletLoading";

import { useSelector } from "react-redux";
import PaginationForModal from "../../../../utils/PaginationForModal";
import SideBarFirmMonth from "./SideBarFirmMonth";
import FirmReportSearch from "./FirmReportSearch";
import { pagination } from "../../../../api";
import { useTranslation } from "react-i18next";

const FirmsMonth = () => {
  const reduxData = useSelector((state) => state);
  const { deteils } = reduxData.deteils;
  const { toggle } = reduxData.toggle;

  const [searchModal, setSearchModal] = useState(false);
  const [curData, setCurData] = useState({
    id: "",
    name: ""
  });

  const [change, setChange] = useState(false);
  const [page, setPage] = useState(1);

  const [year, setYears] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [pharmacy, setPharmacy] = useState(deteils.pharmacies[0].id);

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.removeQueries("FIRM_MONTH");
  }, [page]);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["FIRM_MONTH", page],
    queryFn: async () => {
      return await firmReportGetAPI({
        year,
        month,
        pharmacy_id: pharmacy,
        page,
        firm_id: curData.id,
      });
    },
    enabled: change,
  });

  if (error) return `Error: ${error.message}`;

  const filterFunction = () => {
    setChange(true);
    refetch();
    setPage(1);
    queryClient.removeQueries("FIRM_MONTH");
  };

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  const { t: f } = useTranslation("translation", { keyPrefix: "Firm" });

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
          <SideBarFirmMonth
            month={month}
            setMonth={setMonth}
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
        style={{ maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
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
              <th style={{ width: "5px", padding: "20px 10px" }}>№</th>
              <th>
               {r(0)}
              </th>
              <th>
               {f(1)}
              </th>
              <th>
                {g(82)}
              </th>
              <th>
                {g(80)}
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
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <b>{item.report_date}</b>
                      </td>
                      <td>
                        {item.created_at}
                        <br />
                        <b>{item.creator_name}</b>
                        <br />
                        {item.pharmacy_name}
                      </td>
                      <td>
                        <b>
                          {item.verified_firm_worker_name
                            ? item.verified_firm_worker_name
                            : ""}
                        </b>
                        <br />
                        {item.verified_phone_number
                          ? item.verified_phone_number
                          : ""}
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
                  <th colSpan="4" className="py-3">
                    {r(12)}:
                  </th>

                  <th>
                    {data &&
                      data.data &&
                      formatNumber(
                        data.data.expense_transfer_total_price +
                        data.data.expense_not_transfer_total_price + data.data.income_not_transfer_total_price
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
          pages={Math.ceil(data && data.data.count / pagination)}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default FirmsMonth;
