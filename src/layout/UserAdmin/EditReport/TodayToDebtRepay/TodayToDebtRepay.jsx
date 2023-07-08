import React, { useEffect, useState } from "react";
import { pharmaciesToDebtsRePayGetAPI } from "../../../../api/DirectorRequest";

import SkeletLoading from "../../../../utils/SkeletLoading";

import { useQuery } from "react-query";
import AddToDebtRepay from "./Modal/AddToDebtRepay";
import DeleteToDebtRepay from "./Modal/DeleteToDebtRepay";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";
import DebtsModalTrade from "../TodayTradeToDebtRepay/Modal/DebtsModalTrade";
import ModalDescription from "../../../../utils/ModalDescription";

const TodayToDeptRepay = ({ deteils, is_client, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [debtsModal, setDebtsModal] = useState(false);
  const [descModal, setDescModal] = useState(false);

  const [curData, setCurData] = useState({});

  useEffect(() => {
    document.body.style.overflowY = `${
      showModal || deleteModal ? "hidden" : "scroll"
    }`;
    window.scrollTo(0, 0);
  }, [showModal, deleteModal]);

  const { data, isLoading, error } = useQuery("to_debts_repay", async () => {
    return await pharmaciesToDebtsRePayGetAPI({
      is_client,
      report_date: getData.report_date,
      shift: getData.shift,
      from_debt__from_pharmacy: getData.to_pharmacy,
    });
  });

  if (error) return `Error: ${error.message}`;

  let total = 0;
  if (data && data.data.results) {
    total = totalMoney(data.data.results);
  }

  return (
    <>
    {descModal && (
        <ModalDescription showModal={descModal} setShowModal={setDescModal} data={curData.desc} />
      )}
      {debtsModal && (
        <DebtsModalTrade
          showModal={debtsModal}
          setShowModal={setDebtsModal}
          setShowAddModal={setShowModal}
          setCurData={setCurData}
          getData={getData}
          is_client={is_client}
        />
      )}
      {showModal && (
        <AddToDebtRepay
          showModal={showModal}
          setShowModal={setShowModal}
          is_client={is_client}
          user={curData}
          getData={getData}
          deteils={deteils}
        />
      )}

      {deleteModal && (
        <DeleteToDebtRepay
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      <div>
        <div className="header_flex d-flex justify-content-between align-items-center mb-2">
          <p className="bg_c">
            Umumiy:{" "}
            <span>
              <b>{formatNumber(total)}</b>.0
            </span>{" "}
            UZS
          </p>

          <button
            className="btn btn-sm"
            style={{ background: "var(--blue)", color: "var(--g_white)" }}
            onClick={() => setDebtsModal(!debtsModal)}
          >
            <i className="fa fa-add"></i>
          </button>
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
                <th>Kim qaytardi</th>
                <th>To'lov turi</th>
                <th>Miqdor</th>

                <th scope="col" style={{ width: "5px" }}>
                  <i className="fa fa-trash-can text-danger"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.results.map((item, index) => (
                  <tr key={item.id} className="cursor_pointer" onClick={() => {
                    setCurData(item);
                    setDescModal(!descModal);
                  }}>
                    <td data-label="№">{index + 1}</td>
                    <td data-label="Kim qaytardi" className="text-capitalize">
                      <b>{item.from_debt_name}</b>
                    </td>
                    <td
                      data-label="To'lov turi"
                      className="text-capitalize text-break"
                    >
                      <b>{item.transfer_type_name}</b>
                    </td>
                    <td data-label="Miqdor">
                      <b className="text-success">{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="O'chirish"
                     onClick={e => {
                      e.stopPropagation()
                      setCurData(item);
                      setDeleteModal(!deleteModal);
                    }}>
                      <i
                        className="fa fa-trash-can text-danger cursor_pointer"
                        
                      ></i>
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

export default TodayToDeptRepay;
