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
import ModalDescription from "../../../../utils/ModalDescription";
import { useTranslation } from "react-i18next";

const TodayExPenseToFirm = ({ deteils, getData }) => {
  const [firm_expense_id, setFirmExpenseId] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [isLeader, setIsLeader] = useState({
    isTrue: false,
    price: 0
  });

  const [viewModal, setViewModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [descModal, setDescModal] = useState(false);

  const [curData, setCurData] = useState({});

  useEffect(() => {
    document.body.style.overflowY = `${showModal || viewModal ? "hidden" : "scroll"
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

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });

  return (
    <>
      {descModal && (
        <ModalDescription showModal={descModal} setShowModal={setDescModal} data={curData.desc} />
      )}
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
          setDataModal={setShowModal}
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
        <div className="header_flex d-flex justify-content-between align-items-center mb-2">
          <p className="bg_c">
            {g(90)}:{" "}
            <span>
              <b>{formatNumber(total)}</b>.0
            </span>{" "}
            UZS
          </p>
          {getData.report_date == ""  && (
            <button
              className="btn btn-sm"
              style={{ background: "var(--blue)", color: "var(--g_white)" }}
              onClick={() => setSearchModal(!searchModal)}
            >
              <i className="fa fa-add"></i>
            </button>
          )}

          {getData.report_date == today  && (
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
          style={{ maxHeight: "calc(100vh - 235px)", overflowY: "scroll" }}
        >
          <table id="table" className="my-2 table table-hover">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr>
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th>{g(94)}</th>
                <th>{m(21)}</th>
                <th>{m(18)}</th>
                <th>{g(5)}</th>
                <th>{g(80)}</th>
                <th>{g(92)}</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.results.map((item, index) => (
                  <tr key={item.id} className="cursor_pointer" onClick={() => {
                    setCurData(item)
                    setDescModal(!descModal)
                  }}>
                    <td data-label="№">{index + 1}</td>
                    <td data-label={g(94)}>{item.transfer_type == xisob_raqam ? g(96) : item.from_user_name != null ? g(65) : item.from_user_price != 0 ? `${g(61)}, ${g(95)}` : g(61)}</td>
                    <td data-label={m(31)} className="text-start">{item.to_firm_name}</td>
                    <td data-label={m(18)} className="text-capitalize">
                      {item.verified_firm_worker_name

                        ? item.verified_firm_worker_name
                        : "~"}
                    </td>
                    <td data-label={g(5)} className="text-capitalize">
                      {item.verified_phone_number
                        ? item.verified_phone_number
                        : "~"}
                    </td>
                    <td data-label={g(80)}>
                      <b>{formatNumber(item.price)}</b>
                    </td>
                    <td data-label={g(92)} className="text-uppercase">
                      {item.transfer_type_name == 'payme' ?  m(35): item.transfer_type_name}
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
