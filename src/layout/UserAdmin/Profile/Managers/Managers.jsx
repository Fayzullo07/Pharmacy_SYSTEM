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
import { useTranslation } from "react-i18next";

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

    const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
    const { t: p } = useTranslation("translation", { keyPrefix: "Profile" });
    const { t: g } = useTranslation("translation", { keyPrefix: "Global" });

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
              <h2>{p(0)}</h2>
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
            <table className="table table-hover table-bordered border-secondary align-middle text-center" style={{
              width: "max-content",
              minWidth: "100%",
            }}>
              <thead className="align-middle"
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "var(--blue)",
                  color: "#fff",
                  zIndex: 55,
                }}>
                <tr>
                  <th scope="col" style={{ width: "5px",padding: '10px' }}>
                    №
                  </th>
                  <th scope="col">{m(18)}</th>
                  <th scope="col">{g(5)}</th>
                  <th scope="col">{g(2)}</th>
                  <th scope="col">{g(8)}</th>
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
                      {g(23)}
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№" className="text-capitalize text-break">
                        {index + 1}
                      </td>
                      <td data-label="F.I.O" className="text-capitalize">
                        
                          {item.first_name} {item.last_name}
                        
                      </td>
                      <td data-label="Telefon">{item.phone_number}</td>
                      <td data-label="Manzil" className="text-break">
                        {item.address ? item.address : "~"}
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
