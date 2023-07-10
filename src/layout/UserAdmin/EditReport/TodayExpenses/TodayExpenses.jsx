import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  accountsExpensesGetAPI,
  pharmaciesExpensesGetAPI,
} from "../../../../api/DirectorRequest";

import AddExpenses from "./Modal/AddExpenses";
import UpdateExpenses from "./Modal/UpdateExpenses";
import DeleteExpenses from "./Modal/DeleteExpenses";

import SkeletLoading from "../../../../utils/SkeletLoading";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";
import { useTranslation } from "react-i18next";

const TodayExpenses = ({ deteils, getData }) => {
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

  const { data, isLoading, error } = useQuery("expenses_F", async () => {
    return await pharmaciesExpensesGetAPI({
      report_date: getData.report_date,
      shift: getData.shift,
      from_pharmacy: getData.to_pharmacy,
      expense_type__gte: 3,
    });
  });

  const {
    data: dataAccount,
    isLoading: isLoadingAccount,
    error: errorAccount,
  } = useQuery("expenses_A", async () => {
    return await accountsExpensesGetAPI({
      report_date: getData.report_date,
      shift: getData.shift,
      to_pharmacy: getData.to_pharmacy,
      expense_type__gte: 3,
    });
  });

  //   if (error) return `Error Pharmacy: ${error.message}`;

  //   if (errorAccount) return `Error Account: ${errorAccount.message}`;

  let total = 0;
  if (data && data.data.results && dataAccount && dataAccount.data.results) {
    total = totalMoney(data && data.data.results);
    total += totalMoney(dataAccount && dataAccount.data.results);
  }

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  const { t: f } = useTranslation("translation", { keyPrefix: "Firm" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  return (
    <>
      {showModal && (
        <AddExpenses
          showModal={showModal}
          setShowModal={setShowModal}
          deteils={deteils}
          getData={getData}
        />
      )}

      {deleteModal && (
        <DeleteExpenses
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateExpenses
          showModal={updateModal}
          setShowModal={setUpdateModal}
          deteils={deteils}
          data={curData}
        />
      )}
      {errorAccount && (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Error Worker!</strong>
          Avval Xarajat turini qoshing!! {errorAccount.message}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {error && (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Error Pharmacy!</strong>
          Avval Xarajat turini qoshing!! {error.message}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="bg_head mb-2">
        <div className="header_flex d-flex justify-content-between align-items-center">
          <p className="bg_c">
            {g(90)}:{" "}
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
          className="container-fluid my-2"
          style={{ maxHeight: "calc(100vh - 235px)", overflowY: "scroll" }}
        >
          <table id="table" className=" table table-hover">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr>
                <th>{m(14)}</th>
                <th>{g(93)}</th>
                <th>{g(92)}</th>
                <th>{m(6)}</th>
                <th scope="col" style={{ width: "5px" }}>
                  <i className="fa fa-edit text-warning"></i>
                </th>
                <th scope="col" style={{ width: "5px" }}>
                  <i className="fa fa-trash-can text-danger"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.results.map((item) => (
                  <tr key={item.id}>
                    <td data-label={m(14)} className="text-uppercase">
                      {item.expense_type_name}
                    </td>
                    <td
                      data-label={g(93)}
                      className="text-uppercase"
                    >
                      {g(61)}
                    </td>
                    <td data-label={g(92)} className="text-uppercase">
                      {item.transfer_type_name}
                    </td>
                    <td data-label={m(6)}>
                      <b>{formatNumber(item.price)}</b>
                    </td>
                    <td data-label=""  onClick={() => {
                          setCurData(item);
                          setUpdateModal(!updateModal);
                        }}>
                      <i
                        className="fa fa-edit text-warning cursor_pointer"
                       
                      ></i>
                    </td>
                    <td data-label="" onClick={() => {
                          setCurData(item);
                          setDeleteModal(!deleteModal);
                        }}>
                      <i
                        className="fa fa-trash-can text-danger cursor_pointer"
                        
                      ></i>
                    </td>
                  </tr>
                ))}

              {dataAccount &&
                dataAccount.data.results.map((item) => (
                  <tr key={item.id}>
                    <td data-label={m(14)} className="text-uppercase">
                      {item.expense_type_name}
                    </td>
                    <td
                      data-label={g(93)}
                      className="text-uppercase"
                    >
                      {item.from_user_name}
                    </td>
                    <td data-label={g(92)} className="text-uppercase">
                      {item.transfer_type_name == "payme"
                        ? "Naqd pulsiz"
                        : item.transfer_type_name}
                    </td>
                    <td data-label={m(6)}>
                      <b>{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="">
                      <i
                        className="fa fa-edit text-warning cursor_pointer"
                        onClick={() => {
                          setCurData(item);
                          setUpdateModal(!updateModal);
                        }}
                      ></i>
                    </td>
                    <td data-label="">
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
        </div>

        {isLoading ||
          (isLoadingAccount && (
            <SkeletLoading height={60} count={6} rodius={20} />
          ))}
      </div>
    </>
  );
};

export default TodayExpenses;
