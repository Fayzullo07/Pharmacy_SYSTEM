import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { pharmaciesToDebtsGetAPINOT } from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import AddTradeToDebt from "./Modal/AddTradeToDebt";
import DeleteTradeToDebt from "./Modal/DeleteTradeToDebt";
import UpdateTradeToDebt from "./Modal/UpdateTradeToDebt";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";

const TodayTradeToDebt = ({ is_client, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [curData, setCurData] = useState({});

  useEffect(() => {
    document.body.style.overflowY = `${showModal || deleteModal || updateModal ? "hidden" : "scroll"
      }`;
    window.scrollTo(0, 0);
  }, [showModal, deleteModal, updateModal]);

  const { data, isLoading, error } = useQuery("to_debts_trade", async () => {
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
        <AddTradeToDebt
          showModal={showModal}
          setShowModal={setShowModal}
          is_client={is_client}
          getData={getData}
        />
      )}

      {deleteModal && (
        <DeleteTradeToDebt
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateTradeToDebt
          showModal={updateModal}
          setShowModal={setUpdateModal}
          data={curData}
        />
      )}
      <div className="bg_head mb-2">
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
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th>Kimga qarz berildi</th>
                <th>Maxsulot nomi</th>
                <th>Telefon</th>
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
                      className="text-capitalize text-break"
                    >
                      {item.to_who}
                    </td>
                    <td
                      data-label="Maxsulot nomi"
                      className="text-capitalize text-break"
                    >
                      {item.second_name ? item.second_name : "~"}
                    </td>
                    <td data-label="Telefon">
                      {item.phone_number}
                    </td>
                    <td data-label="Qancha berildi">
                      {formatNumber(item.price)}
                    </td>
                    <td data-label="Qancha qoldi">
                      <b className="text-danger">
                        {item.remaining_debt == 0 ? (
                          <span class="badge text-bg-success"><i className="fa fa-check"></i></span>
                        ) : (
                          formatNumber(item.remaining_debt)
                        )}
                      </b>
                    </td>
                    <td data-label="O'zgartirish" onClick={() => {
                      setCurData(item);
                      setUpdateModal(!updateModal);
                    }}
                      className="cursor_pointer">
                      <i
                        className="fa fa-edit text-warning"

                      ></i>
                    </td>
                    <td data-label="O'chirish" onClick={() => {
                      setCurData(item);
                      setDeleteModal(!deleteModal);
                    }}
                      className="cursor_pointer">
                      <i
                        className="fa fa-trash-can text-danger"

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

export default TodayTradeToDebt;
