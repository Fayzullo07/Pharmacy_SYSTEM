import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import AddExPenseToFirm from "./Modal/AddExPenseToFirm";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { firmsExpenseDebtGetAPI } from "../../../../api/GlobalRequest";
import ViewModal from "./Modal/ViewModal";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";
import ModalSearchFirmExpense from "./ModalSearch/ModalSearchFirmExpense";
import { today, xisob_raqam } from "../../../../api";

const TodayExPenseToFirm = ({ deteils, getData }) => {
  const [firm_expense_id, setFirmExpenseId] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [isLeader, setIsLeader] = useState({
    isTrue: false,
    price: 0
  });

  const [viewModal, setViewModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const [curData, setCurData] = useState({});

  useEffect(() => {
    document.body.style.overflowY = `${
      showModal || viewModal ? "hidden" : "scroll"
    }`;
    window.scrollTo(0, 0);
  }, [showModal, viewModal]);

  const { data, isLoading } = useQuery("expenses_to_firm", async () => {
    return await firmsExpenseDebtGetAPI({
      report_date: getData.report_date,
      from_pharmacy: getData.to_pharmacy,
      shift: getData.shift,
    });
  });

  let total = 0;
  if (data && data.data.results) {
    total = totalMoney(data.data.results);
  }
  return (
    <>
      {searchModal && (
        <ModalSearchFirmExpense
          showModal={searchModal}
          setShowModal={setSearchModal}
          setCurData={setCurData}
          setShowAddModal={setShowModal}
        />
      )}

      {viewModal && (
        <ViewModal
          showModal={viewModal}
          setShowModal={setViewModal}
          firm_expense_id={firm_expense_id}
          getData={getData}
          deteils={deteils}
          isLeader={isLeader}
        />
      )}

      {showModal && (
        <AddExPenseToFirm
          showModal={showModal}
          setShowModal={setShowModal}
          deteils={deteils}
          setFirmExpenseId={setFirmExpenseId}
          firm_expense_id={firm_expense_id}
          setViewModal={setViewModal}
          getData={getData}
          curData={curData}
          setIsLeader={setIsLeader}
        />
      )}

      <div className="bg_head mb-2">
        <div className="header_flex d-flex justify-content-between align-items-center">
          <p className="bg_c">
            Umumiy:{" "}
            <span>
              <b>{formatNumber(total)}</b>.0
            </span>{" "}
            UZS
          </p>
          {getData.report_date == today && (

          <button
            className="btn btn-sm"
            style={{ background: "var(--blue)", color: "var(--g_white)" }}
            onClick={() => setSearchModal(!searchModal)}
          >
            <i className="fa fa-add"></i>
          </button>
          )}
        </div>

        {/* TABLE */}
        <div
          className="container-fluid"
          style={{ maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
        >
          <table id="table" className="my-2 table table-hover">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr>
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th>Chiqim kimdan qilindi</th>
                <th style={{textAlign: 'start'}}>Firma</th>
                <th>F . I . O</th>
                <th>Telofon</th>
                <th>Miqdor</th>
                <th>To'lov turi</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.results.map((item, index) => (
                  <tr key={item.id}>
                    <td data-label="№">{index + 1}</td>
                    <td data-label="Chiqim kimdan qilindi">{item.transfer_type == xisob_raqam ? "HISOB RAQAM" : item.from_user_name != null ? "RAHBAR": item.from_user_price != 0 ? "KASSA, RAHBAR": "KASSA"}</td>
                    <td data-label="Firma" style={{textAlign: 'start'}}>{item.to_firm_name}</td>
                    <td data-label="F.I.O" className="text-capitalize">
                      {item.verified_firm_worker_name
                        ? item.verified_firm_worker_name
                        : "~"}
                    </td>
                    <td data-label="Telofon" className="text-capitalize">
                      {item.verified_phone_number
                        ? item.verified_phone_number
                        : "~"}
                    </td>
                    <td data-label="Miqdor">
                      <b>{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="To'lov turi" className="text-uppercase">
                      {item.transfer_type_name == 'payme' ? "Naqd pulsiz": item.transfer_type_name}
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

export default TodayExPenseToFirm;
