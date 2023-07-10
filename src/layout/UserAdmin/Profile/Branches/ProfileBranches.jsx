import React, { useState } from "react";

import { useSelector } from "react-redux";
import Topbar from "../../../../components/Topbar/Topbar";
import Navbar from "../../../../components/Navbar/Navbar";
import { useQuery } from "react-query";
import { aptekaGetAPI } from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import PaginationForModal from "../../../../utils/PaginationForModal";
import AddApteka from "../../Home/Branchs/Modal/AddApteka";
import DeleteApteka from "../../Home/Branchs/Modal/DeleteApteka";
import UpdateApteka from "../../Home/Branchs/Modal/UpdateApteka";
import { pagination } from "../../../../api";
import { useTranslation } from "react-i18next";

const ProfileBranches = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [curData, setCurData] = useState();

  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;

  const { data, isLoading, error } = useQuery({
    queryKey: ["apteka", page],
    queryFn: async () => {
      return await aptekaGetAPI({ page });
    },
    keepPreviousData: true,
  });

  if (error) return `Error: ${error.message}`;

  const { t } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <>
      {showModal && (
        <AddApteka showModal={showModal} setShowModal={setShowModal} />
      )}

      {deleteModal && (
        <DeleteApteka
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateApteka
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
              <h2>{t(1)}</h2>
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
            style={{ maxHeight: "calc(100vh - 150px)", overflowY: "scroll" }}
          >
            <table className="table table-hover table-bordered border-secondary align-middle text-center" style={{
              width: "max-content",
              minWidth: "100%"
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
                  <th scope="col" style={{ width: "5px", padding: '10px' }}>
                    №
                  </th>
                  <th scope="col">{t(0)}</th>
                  <th scope="col">{t(2)}</th>
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
                     {t(15)}
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№">{index + 1}</td>
                      <td
                        data-label="Filial"
                        className="text-capitalize text-break"
                      >
                        {item.name}
                      </td>
                      <td data-label="Manzil" className="text-break">
                        {item.address ? item.address : "~"}
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

export default ProfileBranches;
