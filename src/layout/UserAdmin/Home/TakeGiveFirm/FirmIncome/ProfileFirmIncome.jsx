import React, { useState } from "react";
import AddFirmIncome from "./Modal/AddFirmIncome";
import DeleteFirmIncome from "./Modal/DeleteFirmIncome";
import { useQuery } from "react-query";
import { firmsInComesGetAPI } from "../../../../../api/GlobalRequest";
import {formatNumber} from "../../../../../functions/NecessaryFunctions";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import { today } from "../../../../../api";
import ModalSearchFirmIncome from "./ModalSearch/ModalSearchFirmIncome";
import ModalDescription from "../../../../../utils/ModalDescription";
import { useTranslation } from "react-i18next";

const ProfileFirmIncome = ({  date_firm, setDateFirm }) => {
  const [searchModal, setSearchModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [curData, setCurData] = useState({});
  const [descModal, setDescModal] = useState(false);

  const { data, isLoading, error } = useQuery(
    ["firms_incomes", date_firm],
    async () => {
      return await firmsInComesGetAPI({
        report_date: date_firm ? date_firm : today,
      });
    }
  );

  if (error) return `Error: ${error.message}`;

  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  return (
    <>
      {descModal && (
        <ModalDescription showModal={descModal} setShowModal={setDescModal} data={curData.desc} />
      )}
      {searchModal && (
        <ModalSearchFirmIncome
          showModal={searchModal}
          setShowModal={setSearchModal}
          setCurData={setCurData}
          setAddModal={setShowModal}
        />
      )}

      {showModal && (
        <AddFirmIncome
          showModal={showModal}
          setShowModal={setShowModal}
          date_firm={date_firm}
          curData={curData}
        />
      )}

      {deleteModal && (
        <DeleteFirmIncome
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      <div>
        <div className="header_flex d-flex justify-content-end align-items-center mb-2">

          <div className="d-flex align-items-center gap-2">
            <div>
              <input
                className="form-control-sm cursor_pointer "
                type="date"
                value={date_firm}
                max={today}
                onChange={(e) => {
                  if (e.target.value) {
                    setDateFirm(e.target.value)
                  } else {
                    setDateFirm(today)
                  }
                }}
              />
            </div>
            <button
              className="btn btn-sm"
              style={{ background: "var(--blue)", color: "var(--g_white)" }}
              onClick={() => setSearchModal(!searchModal)}
            >
              <i className="fa fa-add"></i>
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div
          className="container-fluid"
          style={{ maxHeight: "calc(100vh - 130px)", overflowY: "scroll" }}
        >
          <table className="table table-hover table-bordered border-secondary align-middle text-center" style={{
            width: "max-content",
            minWidth: "100%",
          }}>
            <thead className="align-middle"
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "var(--blue)",
                color: "#fff",
                zIndex: 55,
              }}>
              <tr className="align-middle">
                <th scope="col" style={{ width: "5px", padding: '10px' }}>
                  №
                </th>
                <th>{r(0)}</th>
                <th>{g(4)}</th>
                <th>{m(27)}</th>
                <th>{g(19)}</th>
                <th>{g(37)}</th>
                <th>{g(38)}</th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ width: "5px" }}
                >
                  <i className="fa fa-trash-can text-danger"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.data.results.length === 0 && (
                  <tr>
                    <td colSpan={12}>
                      <h2>{g(23)}</h2>
                    </td>
                  </tr>
                )}
              {data &&
                data.data.results.map((item, index) => (
                  <tr key={item.id} className="cursor_pointer" onClick={() => {
                    setCurData(item)
                    setDescModal(!descModal)
                  }}>
                    <td data-label="№">{index + 1}</td>
                    <td data-label="Sana" >
                      {item.report_date}
                    </td>
                    <td data-label="Firma" className="text-capitalize text-start">
                      {item.from_firm_name}
                    </td>
                    <td data-label="Olingan mahsulot nomi">
                      {item.second_name}
                    </td>
                    <td data-label="Mahsulot summasi">
                      <b className="fw-600">{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="Qanday qaytariladi">
                      <b className="text-success fw-600">
                        {item.is_transfer_return ? m(35) : m(34)}
                      </b>
                    </td>
                    <td data-label="Qaytarish muddati">
                      {item.deadline_date ? item.deadline_date : "~"}
                    </td>

                    <td
                      data-label="O'chirish"
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurData(item);
                        setDeleteModal(!deleteModal);
                      }}
                      className="cursor_pointer"
                    >
                      <i className="fa fa-trash-can text-danger"></i>
                    </td>

                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
        </div>
      </div>
    </>
  );
};

export default ProfileFirmIncome;
