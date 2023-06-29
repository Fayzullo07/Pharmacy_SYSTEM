import React, { useEffect, useState } from "react";
import AddExpenseToAccounts from "./Modal/AddExpenseToAccounts";
import DeleteExpenseToAccounts from "./Modal/DeleteExpenseToAccounts";
import UpdateExpenseToAccounts from "./Modal/UpdateExpenseToAccounts";
import { useQuery } from "react-query";
import {
  accountsExpensesGetAPI,
  pharmaciesExpensesGetAPI,
} from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { xodim } from "../../../../api";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";

const TodayExpenseToAccounts = ({ deteils, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [curData, setCurData] = useState({});

  useEffect(() => {
    document.body.style.overflowY = `${
      showModal || deleteModal || updateModal ? "hidden" : "scroll"
    }`;
    window.scrollTo(0, 0);
  }, [showModal, deleteModal, updateModal]);

  const { data, isLoading, error } = useQuery("expensesA", async () => {
    return await accountsExpensesGetAPI({
      expense_type: xodim,
      report_date: getData.report_date,
      shift: getData.shift,
      to_pharmacy: getData.to_pharmacy,
    });
  });

  const {
    data: dataFarm,
    isLoading: isLoadingFarm,
    error: errorFarm,
  } = useQuery("expensesF", async () => {
    return await pharmaciesExpensesGetAPI({
      expense_type: xodim,
      report_date: getData.report_date,
      shift: getData.shift,
      from_pharmacy: getData.to_pharmacy,
    });
  });

  if (error) return `Error: ${error.message}`;
  if (errorFarm) return `Error: ${errorFarm.message}`;

  let total = 0;
  if (data && data.data.results && dataFarm && dataFarm.data.results) {
    total = totalMoney(data && data.data.results);
    total += totalMoney(dataFarm && dataFarm.data.results);
  }

  return (
    <>
      {showModal && (
        <AddExpenseToAccounts
          showModal={showModal}
          setShowModal={setShowModal}
          deteils={deteils}
          getData={getData}
        />
      )}

      {deleteModal && (
        <DeleteExpenseToAccounts
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateExpenseToAccounts
          showModal={updateModal}
          setShowModal={setUpdateModal}
          deteils={deteils}
          data={curData}
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

          <button
            className="btn btn-sm"
            style={{ background: "var(--blue)", color: "var(--g_white)" }}
            onClick={() => setShowModal(!showModal)}
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
                <th>Kimdan berildi</th>
                <th>Kimga berildi</th>
                <th>To'lov turi</th>
                <th>Miqdor</th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: "5px" }}
                >
                  <i className="fa fa-edit text-warning"></i>
                </th>
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
                data.data.results.map((item) => (
                  <tr key={item.id} className="scaleY">
                    <td data-label="Kimdan berildi">
                      <span className="text-muted">Rahbardan</span>{" "}
                      <b>{item.from_user_name}</b>
                    </td>
                    <td data-label="Kimga berildi" className="text-capitalize">
                      {item.to_user_name}
                    </td>
                    <td data-label="To'lov turi" className="text-capitalize">
                      {item.transfer_type_name == "payme"
                        ? "Naqd pulsiz"
                        : item.transfer_type_name}
                    </td>
                    <td data-label="Miqdor">
                      <b className="text-danger">{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="O'zgartirish">
                      <i
                        className="fa fa-edit text-warning cursor_pointer"
                        onClick={() => {
                          setCurData(item);
                          setUpdateModal(!updateModal);
                        }}
                      ></i>
                    </td>
                    <td data-label="O'chirish">
                      <i
                        className="fa fa-trash-can text-danger cursor_pointer"
                        onClick={() => {
                          setCurData(item);
                          setDeleteModal(!deleteModal);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}

              {dataFarm &&
                dataFarm.data.results.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Kimdan berildi">
                      <span className="text-muted">Kassadan</span>{" "}
                      <b>{item.from_pharmacy_name}</b>
                    </td>
                    <td data-label="Kimga berildi" className="text-capitalize">
                      {item.to_user_name}
                    </td>
                    <td data-label="To'lov turi" className="text-capitalize">
                      {item.transfer_type_name == "payme"
                        ? "Naqd pulsiz"
                        : item.transfer_type_name}
                    </td>
                    <td data-label="Miqdor">
                      <b className="text-danger">{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="O'zgartirish">
                      <i
                        className="fa fa-edit text-warning cursor_pointer"
                        onClick={() => {
                          setCurData(item);
                          setUpdateModal(!updateModal);
                        }}
                      ></i>
                    </td>
                    <td data-label="O'chirish">
                      <i
                        className="fa fa-trash-can text-danger cursor_pointer"
                        onClick={() => {
                          setCurData(item);
                          setDeleteModal(!deleteModal);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {isLoading && isLoadingFarm && (
            <SkeletLoading height={60} count={6} rodius={20} />
          )}
        </div>
      </div>
    </>
  );
};

export default TodayExpenseToAccounts;
