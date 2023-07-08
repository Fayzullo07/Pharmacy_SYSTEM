import React, { useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { xodimGetAPI } from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { formatNumber } from "../../../../functions/NecessaryFunctions";
import PaginationForModal from "../../../../utils/PaginationForModal";
import AddWorker from "./Modal/AddWorker";
import DeleteWorker from "./Modal/DeleteWorker";
import UpdateWorker from "./Modal/UpdateWorker";
import { pagination } from "../../../../api";

const WorkersDeteils = () => {
  const toggleData = useSelector((state) => state.toggle);
  const { toggle } = toggleData;

  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [curData, setCurData] = useState();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workers", page],
    queryFn: async () => {
      return xodimGetAPI({ page });
    },
    keepPreviousData: true,
  });

  if (error) return `Error: ${error.message}`;
  return (
    <>
      {showModal && (
        <AddWorker showModal={showModal} setShowModal={setShowModal} />
      )}

      {deleteModal && (
        <DeleteWorker
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateWorker
          showModal={updateModal}
          setShowModal={setUpdateModal}
          datas={curData}
        />
      )}
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar>
            <div className="header_flex">
              <h2>Xodimlar</h2>
            </div>
            <button
              className="btn btn-sm me-2"
              style={{ background: "var(--blue)", color: "var(--g_white)" }}
              onClick={() => setShowModal(!showModal)}
            >
              <i className="fa fa-add"></i>
            </button>
          </Topbar>
          <div
            className="container-fluid m-1"
            style={{ maxHeight: "calc(100vh - 150px)", overflowY: "scroll" }}
          >
            <table id="table" className="my-2 table table-hover">
              <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
                <tr>
                  <th scope="col" style={{ width: "5px" }}>
                    №
                  </th>
                  <th scope="col">F.I.O</th>
                  <th scope="col">Telefon</th>
                  <th scope="col">Filial</th>
                  <th scope="col">Smena</th>
                  <th scope="col">Manzil</th>
                  <th scope="col">Ish haqi</th>
                  <th scope="col">Faol</th>
                  <th scope="col">Asosiy</th>
                  <th scope="col" style={{ width: "5px" }}>
                    <i className="fa fa-edit text-warning "></i>
                  </th>
                  <th scope="col" style={{ width: "5px" }}>
                    <i className="fa fa-trash-can text-danger "></i>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data && data.data.results.length === 0 && (
                  <tr>
                    <td colSpan={12}>
                      <h2>Xodimlar yo'q!</h2>
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id} className="scaleY">
                      <td data-label="№" className="text-capitalize text-break">
                        {index + 1}
                      </td>
                      <td
                        data-label="F.I.O"
                        className="text-capitalize text-break"
                      >
                          {item.first_name} {item.last_name}
                      
                      </td>
                      <td data-label="Telefon">{item.phone_number}</td>
                      <td data-label="Filial">{item.pharmacy_name}</td>
                      <td data-label="Smena">{item.shift}</td>
                      <td data-label="Manzil">
                        {item.address ? item.address : "~"}
                      </td>
                      <td data-label="Ish haqi">
                        {item.wage == 0 ? "~" : formatNumber(item.wage)}
                      </td>
                      <td data-label="Faol">
                        {item.is_active ? (
                          <span className="badge text-bg-success"><i className="fa fa-check"></i></span>
                        ) : (
                          <span className="badge text-bg-danger">
                            <i className="fa fa-xmark"></i>
                          </span>
                        )}
                      </td>
                      <td data-label="Asosiy">
                        {item.is_main_worker ? (
                          <span className="badge text-bg-success"><i className="fa fa-check"></i></span>
                        ) : (
                          <span className="badge text-bg-danger">
                            <i className="fa fa-xmark"></i>
                          </span>
                        )}
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
                  ))}{" "}
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

export default WorkersDeteils;
