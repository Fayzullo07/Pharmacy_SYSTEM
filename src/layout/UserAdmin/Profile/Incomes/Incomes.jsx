import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import { useQuery } from "react-query";
import { transfersTypesGetAPI } from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import PaginationForModal from "../../../../utils/PaginationForModal";
import { pagination, transfers } from "../../../../api";
import AddIncome from "./Modal/AddIncome";
import DeleteIncome from "./Modal/DeleteIncome";
import UpdateIncome from "./Modal/UpdateIncome";
import { useTranslation } from "react-i18next";

const Incomes = () => {
  const toggleData = useSelector((state) => state.toggle);
  const { toggle } = toggleData;

  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [curData, setCurData] = useState();

  const { data, isLoading, error } = useQuery({
    queryKey: ["transfer", page],
    queryFn: async () => {
      return await transfersTypesGetAPI({ page });
    },
    keepPreviousData: true,
  });

  if (error) return `Error: ${error.message}`;

  const { t } = useTranslation("translation", { keyPrefix: "Profile" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <>
    {showModal && (
        <AddIncome showModal={showModal} setShowModal={setShowModal} />
      )}

      {deleteModal && (
        <DeleteIncome showModal={deleteModal} setShowModal={setDeleteModal} data={curData} />
      )}

      {updateModal && (
        <UpdateIncome showModal={updateModal} setShowModal={setUpdateModal} data={curData} />
      )}
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar>
            <div className="header_flex">
              <h2>{t(5)}</h2>
            </div>
            <button
              className="btn btn-sm me-2"
              style={{ background: "var(--blue)", color: "var(--g_white)" }}
              onClick={() => setShowModal(!showModal)}
            >
              <i className="fa fa-add"></i>
            </button>
          </Topbar>

          {/* TABLE */}
          <div
            className="container-fluid"
            style={{ maxHeight: "calc(100vh - 170px)", overflowY: "scroll" }}
          >
            <table id="table" className="my-2 table table-hover">
              <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
                <tr>
                  <th scope="col" style={{ width: "5px" }}>
                    №
                  </th>
                  <th scope="col">{m(31)}</th>
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
                {transfers.map((item, index) => (
                  <tr>
                    <td data-label="№" className="text-capitalize text-break">
                      {index + 1}
                    </td>
                    <td
                      data-label={m(31)}
                      className="text-capitalize text-break"
                    >
                      {item.name}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№" className="text-capitalize text-break">
                        {index + 1 + transfers.length}
                      </td>
                      <td
                        data-label={m(31)}
                        className="text-capitalize text-break"
                      >
                        {item.name}
                      </td>
                      <td data-label={g(20)} onClick={() => {
                            setCurData(item);
                            setUpdateModal(!updateModal);
                          }}
                          className="cursor_pointer">
                        <i
                          className="fa fa-edit text-warning"
                          
                        ></i>
                      </td>
                      <td data-label={g(21)}  onClick={() => {
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
          <div className="fixed-bottom">
            <PaginationForModal
              page={page}
              pages={Math.ceil(data && data.data.count / pagination)}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Incomes;
