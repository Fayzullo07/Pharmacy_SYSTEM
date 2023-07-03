import React, { useEffect, useState } from "react";
import {
  formatNumber,
  totalMoney,
} from "../../../../../functions/NecessaryFunctions";
import AddFirmReturn from "./Modal/AddFirmReturn";
import DebtsModal from "./DebtsModal/DebtsModal";
import { returnFirmGetAPI } from "../../../../../api/GlobalRequest";
import { useQuery } from "react-query";
import ViewModalSMS from "./Modal/ViewModalSMS";
import { today } from "../../../../../api";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import ModalSearchFirmReturn from "./ModalSearch/ModalSearchFirmReturn";

const FirmReturn = ({ date_firm, setDateFirm }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [debtsModal, setDebtsModal] = useState(false);

  const [firm_return_id, setFirmReturnId] = useState({});
  const [curData, setCurData] = useState({
    id: "",
  });


  useEffect(() => {
    document.body.style.overflowY = `${
      showModal || viewModal ? "hidden" : "scroll"
    }`;
    window.scrollTo(0, 0);
  }, [showModal, viewModal]);

  const { data, isLoading } = useQuery(
    ["firm_returns", date_firm],
    async () => {
      return await returnFirmGetAPI({
        report_date: date_firm,
      });
    }
  );

  let total = 0;
  if (data && data.data.results) {
    total = totalMoney(data.data.results);
  }

  return (
    <>
      {searchModal && (
        <ModalSearchFirmReturn
          showModal={searchModal}
          setShowModal={setSearchModal}
          setCurData={setCurData}
        />
      )}

      {viewModal && (
        <ViewModalSMS
          showModal={viewModal}
          setShowModal={setViewModal}
          firm_return_id={firm_return_id}
        />
      )}

      {debtsModal && (
        <DebtsModal
          showModal={debtsModal}
          setShowModal={setDebtsModal}
          setShowAddModal={setShowModal}
          setCurData={setCurData}
          from_firm={curData}
          setSearchModal={setSearchModal}
        />
      )}

      {showModal && (
        <AddFirmReturn
          showModal={showModal}
          setShowModal={setShowModal}
          curData={curData}
          setViewModal={setViewModal}
          setFirmReturnId={setFirmReturnId}
        />
      )}

      <div className="bg_head">
        <div className="header_flex d-flex justify-content-between align-items-center">
          <p className="bg_c">
            Umumiy:{" "}
            <span>
              <b>{formatNumber(total)}</b>.0
            </span>{" "}
            UZS
          </p>
          <div className="d-flex align-items-center gap-2">
            <div>
              <input
                className="form-control-sm cursor_pointer "
                type="date"
                value={date_firm}
                max={today}
                onChange={(e) => setDateFirm(e.target.value)}
              />
            </div>
            {today == date_firm && (
              <button
                className="btn btn-sm"
                style={{ background: "var(--blue)", color: "var(--g_white)" }}
                onClick={() => {
                  setDebtsModal(!debtsModal);
                  setCurData({ id: "" });
                }}
              >
                <i className="fa fa-add"></i>
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <div
          className="container-fluid"
          style={{ maxHeight: "calc(100vh - 170px)", overflowY: "scroll" }}
        >
          <table id="table" className="my-2 table table-hover">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr>
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th>Sana</th>
                <th>Mahsulot nomi</th>
                <th>Qabul qiluvchi F.I.O</th>
                <th>Qabul qiluvchi telefon</th>
                <th>Pul</th>
                <th>Qaysi Firmaga</th>
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
                    <td data-label="Firma" className="text-capitalize">
                      {item.second_name}
                    </td>
                    <td data-label="Olingan mahsulot nomi">
                      <b>{item.verified_firm_worker_name}</b>
                    </td>
                    <td data-label="Pul">
                      <b>{item.verified_phone_number}</b>
                    </td>
                    <td data-label="Pul">
                      <b>{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="Qaytarish muddati">{item.firm_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
      </div>
    </>
  );
};

export default FirmReturn;
