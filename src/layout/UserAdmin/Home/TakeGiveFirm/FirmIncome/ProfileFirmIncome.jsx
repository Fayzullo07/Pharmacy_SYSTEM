import React, { useState } from "react";
import AddFirmIncome from "./Modal/AddFirmIncome";
import DeleteFirmIncome from "./Modal/DeleteFirmIncome";
import { useQuery } from "react-query";
import { firmsInComesGetAPI } from "../../../../../api/GlobalRequest";
import {
  formatNumber,
  totalMoney,
} from "../../../../../functions/NecessaryFunctions";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import { today } from "../../../../../api";
import ModalSearchFirmIncome from "./ModalSearch/ModalSearchFirmIncome";
import DeteilsFirmIncome from "./Modal/DeteilsFirmIncome";

const ProfileFirmIncome = ({ deteils, date_firm, setDateFirm }) => {
  const [searchModal, setSearchModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deteilModal, setDeteilModal] = useState(false);

  const [curData, setCurData] = useState({});

  const { data, isLoading, error } = useQuery(
    ["firms_incomes", date_firm],
    async () => {
      return await firmsInComesGetAPI({
        report_date: date_firm ? date_firm : today,
      });
    }
  );

  if (error) return `Error: ${error.message}`;

  let total = 0;
  if (data && data.data.results) {
    total = totalMoney(data.data.results);
  }
  return (
    <>
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
          deteils={deteils}
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

      {deteilModal && (
        <DeteilsFirmIncome
          showModal={deteilModal}
          setShowModal={setDeteilModal}
          data={curData}
        />
      )}
      <div>
        <div className="header_flex d-flex justify-content-end align-items-center">
          
          <div className="d-flex align-items-center gap-2">
            <div>
              <input
                className="form-control-sm cursor_pointer "
                type="date"
                value={date_firm}
                max={today}
                onChange={(e) => {
                  if(e.target.value){
                    setDateFirm(e.target.value)
                  }else {
                    setDateFirm(e.target.value)
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
          <table id="table" className="my-2 table table-hover">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr className="align-middle">
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th>Sana</th>
                <th>Firma</th>
                <th>Olingan mahsulot nomi</th>
                <th>Mahsulot summasi</th>
                <th>Qanday qaytariladi</th>
                <th>Qaytarish muddati</th>

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
              {data &&
                data.data.results.map((item, index) => (
                  <tr key={item.id}>
                    <td data-label="№">{index + 1}</td>
                    <td data-label="Sana" >
                      {item.report_date}
                    </td>
                    <td data-label="Firma" className="text-capitalize text-start">
                      {item.from_firm_name}
                    </td>
                    <td data-label="Olingan mahsulot nomi">
                      <b>{item.second_name}</b>
                    </td>
                    <td data-label="Mahsulot summasi">
                      <b>{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="Qanday qaytariladi">
                      <b className="text-success">
                        {item.is_transfer_return ? "NAXT PULSIZ" : "NAXT"}
                      </b>
                    </td>
                    <td data-label="Qaytarish muddati">
                      {item.deadline_date ? item.deadline_date : "~"}
                    </td>

                    <td
                      data-label="O'chirish"
                      onClick={() => {
                        setCurData(item);
                        setDeleteModal(!deleteModal);
                      }}
                    >
                      <i className="fa fa-trash-can text-danger cursor_pointer"></i>
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
