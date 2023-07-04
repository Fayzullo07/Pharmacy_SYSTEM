import React, { useEffect, useState } from "react";
import UpdateToDept from "./Modal/UpdateToDebt";
import { useQuery } from "react-query";
import { pharmaciesToDebtsGetAPINOT } from "../../../../api/DirectorRequest";
import AddToDebt from "./Modal/AddToDebt";
import SkeletLoading from "../../../../utils/SkeletLoading";
import DeleteToDebt from "./Modal/DeleteToDebt";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";

const TodayToDebt = ({ is_client, getData }) => {
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

  const { data, isLoading, error } = useQuery("to_debts", async () => {
    return await pharmaciesToDebtsGetAPINOT({
      is_client,
      report_date: getData.report_date,
      shift: getData.shift,
      from_pharmacy: getData.to_pharmacy,
    });
  });

  if (error) return `Error: ${error.message}`;

  let total = 0;
  if (data && data.data.results) {
    total = totalMoney(data && data.data.results);
  }
  return (
    <>
      {showModal && (
        <AddToDebt
          showModal={showModal}
          setShowModal={setShowModal}
          is_client={is_client}
          getData={getData}
        />
      )}

      {deleteModal && (
        <DeleteToDebt
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateToDept
          showModal={updateModal}
          setShowModal={setUpdateModal}
          data={curData}
        />
      )}
      <div>
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
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th>Kimga qarz berildi</th>
                <th>Telefon nomeri</th>
                <th>Qancha berildi</th>
                <th>Qancha qoldi</th>
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
                data.data.results.map((item, index) => (
                  <tr key={item.id}>
                    <td data-label="№">{index + 1}</td>
                    <td
                      data-label="Kimga qarz berildi"
                      className="text-capitalize"
                    >
                      {item.to_who}
                    </td>
                    <td data-label="Telefon">
                      <b>{item.phone_number}</b>
                    </td>
                    <td data-label="Qancha berildi">
                      <b>{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="Qancha qoldi">
                      <b className="text-danger">
                        {item.remaining_debt == 0 ? (
                          <span class="badge text-bg-success">To'landi</span>
                        ) : (
                          formatNumber(item.remaining_debt)
                        )}
                      </b>
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
          {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
        </div>
      </div>
    </>
  );
};

export default TodayToDebt;
