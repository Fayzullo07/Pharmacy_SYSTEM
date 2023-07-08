import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import AddManager from "./Modal/AddManager";
import DeleteManager from "./Modal/DeleteManager";
import UpdateManager from "./Modal/UpdateManager";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { useQuery } from "react-query";
import { managerGetAPI } from "../../../../api/DirectorRequest";
import PaginationForModal from "../../../../utils/PaginationForModal";
import { pagination } from "../../../../api";

const Managers = () => {
  const toggleData = useSelector((state) => state.toggle);
  const { toggle } = toggleData;

  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [page, setPage] = useState(1);

  const [curData, setCurData] = useState();

  const { data, error, isLoading } = useQuery({
    queryKey: ["managers", page],
    queryFn: async () => {
      return await managerGetAPI({ page });
    },
  });

  if (error) return `Error: ${error.message}`;

  return (
    <>
      {showModal && (
        <AddManager showModal={showModal} setShowModal={setShowModal} />
      )}

      {deleteModal && (
        <DeleteManager
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateManager
          showModal={updateModal}
          setShowModal={setUpdateModal}
          data={curData}
        />
      )}
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar>
            <div className="header_flex">
              <h2>Menejerlar</h2>
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
            className="container-fluid m-1"
            style={{ maxHeight: "calc(100vh - 170px)", overflowY: "scroll" }}
          >
            <table id="table" className="my-2 table table-hover">
              <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
                <tr>
                  <th scope="col" style={{ width: "5px" }}>
                    №
                  </th>
                  <th scope="col">F.I.O</th>
                  <th scope="col">Telefon</th>
                  <th scope="col">Manzil</th>
                  <th scope="col">Active</th>
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
                {data && data.data.results.length === 0 && (
                  <tr>
                    <td colSpan={12}>
                      <h2> Manager topilmadi!</h2>
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№" className="text-capitalize text-break">
                        <b>{index + 1}</b>
                      </td>
                      <td data-label="F>I.O" className="text-capitalize">
                        <b>
                          {item.first_name} {item.last_name}
                        </b>
                      </td>
                      <td data-label="Telefon">{item.phone_number}</td>
                      <td data-label="Manzil" className="text-break">
                        {item.address ? item.address : "~"}
                      </td>
                      <td data-label="Active">
                        {item.is_active ? (
                          <span className="badge text-bg-success">Active</span>
                        ) : (
                          <span className="badge text-bg-danger">
                            Not Actiove
                          </span>
                        )}
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

export default Managers;
