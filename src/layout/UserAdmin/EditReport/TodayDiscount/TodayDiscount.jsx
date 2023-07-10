import React, { useState } from "react";
import { useQuery } from "react-query";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { pharmaciesExpensesGetAPI } from "../../../../api/DirectorRequest";
import { chegirma } from "../../../../api";
import AddDiscount from "./Modal/AddDiscount";
import DeleteDiscount from "./Modal/DeleteDiscount";
import UpdateDiscount from "./Modal/UpdateDiscount";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";
import { useTranslation } from "react-i18next";

const TodayDiscount = ({ getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [curData, setCurData] = useState({});

  const { data, isLoading, error } = useQuery("expenses_discount", async () => {
    return await pharmaciesExpensesGetAPI({
      expense_type: chegirma,
      report_date: getData.report_date,
      shift: getData.shift,
      from_pharmacy: getData.from_pharmacy,
    });
  });

  if (error) return `Error: ${error.message}`;

  let total = 0;
  if (data && data.data.results) {
    total = totalMoney(data && data.data.results);
  }

   const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
   const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  return (
    <>
      {showModal && (
        <AddDiscount
          showModal={showModal}
          setShowModal={setShowModal}
          getData={getData}
        />
      )}

      {deleteModal && (
        <DeleteDiscount
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateDiscount
          showModal={updateModal}
          setShowModal={setUpdateModal}
          data={curData}
        />
      )}
      <div>
        <div className="header_flex d-flex justify-content-between align-items-center mb-2">
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
          className="container-fluid"
          style={{ maxHeight: "calc(100vh - 130px)", overflowY: "scroll" }}
        >
          <table id="table" className="my-2 table table-hover">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr>
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th>{m(1)}</th>
                <th>{m(4)}</th>
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
                data.data.results.map((item, index) => (
                  <tr key={item.id}>
                    <td data-label="№">{index + 1}</td>
                    <td
                      data-label={m(1)}
                      className="text-capitalize"
                    >
                      <b>{formatNumber(item.second_name)}</b>
                    </td>
                    <td data-label={m(4)}>
                      <b className="text-danger">{formatNumber(item.price)}</b>{" "}
                      
                    </td>
                    <td data-label=""  onClick={() => {
                          setCurData(item);
                          setUpdateModal(!updateModal);
                        }}
                        className="cursor_pointer">
                      <i
                        className="fa fa-edit text-warning"
                       
                      ></i>
                    </td>
                    <td data-label="" onClick={() => {
                          setCurData(item);
                          setDeleteModal(!deleteModal);
                        }}
                        className="cursor_pointer">
                      <i
                        className="fa fa-trash-can text-danger  "
                        
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

export default TodayDiscount;
