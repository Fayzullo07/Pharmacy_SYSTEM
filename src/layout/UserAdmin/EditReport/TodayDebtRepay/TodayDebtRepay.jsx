import React, { useState } from "react";
import { useQuery } from "react-query";
import { pharmaciesDebtsRePayGetAPI } from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import AddDebtRepay from "./Modal/AddDebtRepay";
import DeleteDebtRepay from "./Modal/DeleteDebtRepay";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";
import DebtsModal from "./Modal/DebtsModal";
import { Naqd_siz } from "../../../../api";
import ModalDescription from "../../../../utils/ModalDescription";

const TodayDebtRepay = ({ deteils, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [debtsModal, setDebtsModal] = useState(false);
  const [descModal, setDescModal] = useState(false);

  const [curData, setCurData] = useState({});

  const { data, isLoading, error } = useQuery("debts_repay", async () => {
    return await pharmaciesDebtsRePayGetAPI({
      report_date: getData.report_date,
      shift: getData.shift,
      to_debt__to_pharmacy: getData.to_pharmacy,
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
        <DebtsModal
          showModal={debtsModal}
          setShowModal={setDebtsModal}
          setShowAddModal={setShowModal}
          setCurData={setCurData}
          getData={getData}
        />
      )}
      {showModal && (
        <AddDebtRepay
          showModal={showModal}
          setShowModal={setShowModal}
          deteils={deteils}
          curData={curData}
          getData={getData}
        />
      )}

      {deleteModal && (
        <DeleteDebtRepay
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
          style={{ maxHeight: "calc(100vh - 235px)", overflowY: "scroll" }}
        >
          <table id="table" className="my-2 table table-hover">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr>
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th>Kimga qaytarildi</th>
                <th>Kimdan berildi</th>
                <th>To'lov turi</th>
                <th>Berilgan summa</th>
                <th scope="col" style={{ width: "5px" }}>
                  <i className="fa fa-trash-can text-danger"></i>
                </th>
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
                    <td
                      data-label="Kimga qaytarildi"
                      className="text-capitalize text-break"
                    >
                      {item.to_debt_name}
                    </td>
                    <td data-label="Kimdan berildi" className="text-capitalize">
                      {item.from_user_name ? item.from_user_name : "Kassadan"}
                    </td>
                    <td data-label="To'lov turi" className="text-capitalize">
                      {item.transfer_type_name == "payme"
                        ? Naqd_siz
                        : item.transfer_type_name}
                    </td>
                    <td data-label="Berilgan summa">
                      <b className="text-success">{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="O'chirish" onClick={(e) => {
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

export default TodayDebtRepay;
