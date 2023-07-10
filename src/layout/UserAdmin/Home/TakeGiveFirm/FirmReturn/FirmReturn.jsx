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
import ModalDescription from "../../../../../utils/ModalDescription";
import { useTranslation } from "react-i18next";

const FirmReturn = ({ date_firm, setDateFirm }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [debtsModal, setDebtsModal] = useState(false);

  const [firm_return_id, setFirmReturnId] = useState({});

  const [descModal, setDescModal] = useState(false);
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
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });

  return (
    <>
    {descModal && (
        <ModalDescription showModal={descModal} setShowModal={setDescModal} data={curData.desc} />
      )}
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
        <div className="header_flex d-flex justify-content-end align-items-center mb-2">
         
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
                    setDateFirm(today)
                  }
                }}
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
              <tr>
                <th scope="col" style={{ width: "5px",padding: '10px' }}>
                  №
                </th>
                <th>{r(0)}</th>
                <th>{g(18)}</th>
                <th>{m(26)}</th>
                <th>{m(10)}</th>
                <th>{g(19)}</th>
                <th>{g(4)}</th>
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
                    <td data-label="Firma" className="text-capitalize">
                      {item.second_name}
                    </td>
                    <td data-label="Olingan mahsulot nomi">
                      {item.verified_firm_worker_name}
                    </td>
                    <td data-label="Pul">
                      {item.verified_phone_number}
                    </td>
                    <td data-label="Pul">
                      {formatNumber(item.price)}
                    </td>
                    <td data-label="Firma" className="text-start">{item.firm_name}</td>
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
