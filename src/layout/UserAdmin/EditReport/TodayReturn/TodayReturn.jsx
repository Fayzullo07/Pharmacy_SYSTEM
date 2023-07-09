import React, { useEffect, useState } from "react";
import AddReturn from "./Modal/AddReturn";
import UpdateReturn from "./Modal/UpdateReturn";
import { useQuery } from "react-query";
import { pharmaciesExpensesGetAPI } from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { vozvrat } from "../../../../api";
import DeleteReturn from "./Modal/DeleteReturn";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";
import { accountsExpensesGetAPI } from "../../../../api/DirectorRequest";

const TodayReturn = (props) => {
  const { deteils, getData } = props;
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

  const { data, isLoading, error } = useQuery(
    "expenses_return_pharm",
    async () => {
      return await pharmaciesExpensesGetAPI({
        expense_type: vozvrat,
        report_date: getData.report_date,
        shift: getData.shift,
        from_pharmacy: getData.to_pharmacy,
      });
    }
  );

  const { data: dataAccount } = useQuery(
    "expenses_return_account",
    async () => {
      return await accountsExpensesGetAPI({
        expense_type: vozvrat,
        report_date: getData.report_date,
        shift: getData.shift,
        to_pharmacy: getData.to_pharmacy,
      });
    }
  );

  if (error) return `Error: ${error.message}`;

  let total = 0;
  if (data && data.data.results && dataAccount && dataAccount.data.results) {
    total = totalMoney(data && data.data.results);
    total += totalMoney(dataAccount && dataAccount.data.results);
  }
  return (
    <>
      {showModal && (
        <AddReturn
          showModal={showModal}
          setShowModal={setShowModal}
          deteils={deteils}
          getData={getData}
        />
      )}

      {deleteModal && (
        <DeleteReturn
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateReturn
          showModal={updateModal}
          setShowModal={setUpdateModal}
          deteils={deteils}
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
            onClick={() => setShowModal(!showModal)}
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
                <th>Mahsulot nomi</th>
                <th>Qaytarilgan pul</th>
                <th>Kimdan pul berildi</th>
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
                  <tr key={item.id}>
                    <td
                      data-label="Mahsulot nomi"
                      className="text-capitalize text-break"
                    >
                      {item.second_name}
                    </td>
                    <td data-label="Qaytarilgan pul">
                      <b className="text-danger">{formatNumber(item.price)}</b>{" "}
                    </td>
                    <td data-label="Qaytarilgan pul">Kassadan</td>
                    <td
                      data-label="O'zgartirish"
                      onClick={() => {
                        setCurData(item);
                        setUpdateModal(!updateModal);
                      }}
                      className="cursor_pointer"
                    >
                      <i className="fa fa-edit text-warning"></i>
                    </td>
                    <td
                      data-label="O'chirish"
                      onClick={() => {
                        setCurData(item);
                        setDeleteModal(!deleteModal);
                      }}
                      className="cursor_pointer"
                    >
                      <i className="fa fa-trash-can text-danger"></i>
                    </td>
                  </tr>
                ))}
              {dataAccount &&
                dataAccount.data.results.map((item) => (
                  <tr key={item.id}>
                    <td
                      data-label="Mahsulot nomi"
                      className="text-capitalize text-break"
                    >
                      {item.second_name}
                    </td>
                    <td data-label="Qaytarilgan pul">
                      <b className="text-danger">{formatNumber(item.price)}</b>{" "}
                    </td>
                    <td data-label="Qaytarilgan pul">{item.from_user_name}</td>
                    <td
                      data-label="O'zgartirish"
                      onClick={() => {
                        setCurData(item);
                        setUpdateModal(!updateModal);
                      }}
                      className="cursor_pointer"
                    >
                      <i className="fa fa-edit text-warning"></i>
                    </td>
                    <td
                      data-label="O'chirish"
                      onClick={() => {
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

export default TodayReturn;
