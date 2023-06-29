import React, { useEffect, useState } from "react";
import { pharmaciesInComesGetAPI } from "../../../../api/DirectorRequest";
import { useQuery } from "react-query";
import DeleteInComes from "./Modal/DeleteInComes";
import UpdateInComes from "./Modal/UpdateInComes";
import SkeletLoading from "../../../../utils/SkeletLoading";
import AddInComes from "./Modal/AddInComes";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";
import { naxt } from "../../../../api";

const TodayInComes = ({ deteils, getData }) => {
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

  const { data, isLoading, error } = useQuery("incomes", async () => {
    return await pharmaciesInComesGetAPI({
      report_date: getData.report_date,
      shift: getData.shift,
      to_pharmacy: getData.to_pharmacy,
    });
  });

  if (error) return `Error: ${error.message}`;

  let total = 0;
  if (data && data.data.results) {
    total = totalMoney(data.data.results);
  }

  return (
    <>
      {showModal && (
        <AddInComes
          showModal={showModal}
          setShowModal={setShowModal}
          deteils={deteils}
          getData={getData}
        />
      )}

      {deleteModal && (
        <DeleteInComes
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateInComes
          showModal={updateModal}
          setShowModal={setUpdateModal}
          deteils={deteils}
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
                <th>Tushum turi</th>
                <th>Miqdor</th>
                <th>Pul qayerga tushdi</th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: "5px" }}
                >
                  <i className="fa fa-edit text-warning "></i>
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ width: "5px" }}
                >
                  <i className="fa fa-trash-can text-danger "></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.results.map((item, index) => (
                  <tr key={item.id}>
                    <td data-label="№">{index + 1}</td>
                    <td data-label="Tushum turi" className="text-uppercase">
                      {item.transfer_type_name}
                    </td>
                    <td data-label="Miqdor">
                      <b className="text-success">{formatNumber(item.price)}</b>
                    </td>
                    <td
                      data-label="Pul qayerga tushdi"
                      className="text-uppercase"
                    >
                      {item.to_user_name == null
                        ? item.transfer_type == naxt
                          ? "Kassa"
                          : "Xisob raqam"
                        : item.to_user_name}
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
        </div>

        {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
      </div>
    </>
  );
};

export default TodayInComes;
