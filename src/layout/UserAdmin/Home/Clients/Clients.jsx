import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import PaginationForModal from "../../../../utils/PaginationForModal";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { useQuery } from "react-query";
import { clientsGetAPI } from "../../../../api/GlobalRequest";
import SearchInput from "../../../../utils/SearchInput";
import AddClient from "./Modal/AddClient";
import { formatNumber } from "../../../../functions/NecessaryFunctions";
import DeleteClient from "./Modal/DeleteClients";
import UpdateClient from "./Modal/UpdateClient";
import { pagination } from "../../../../api";
import { useTranslation } from "react-i18next";

const Clients = () => {
  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [curData, setCurData] = useState({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["clients", page, search],
    queryFn: async () => {
      return await clientsGetAPI({ page, search });
    },
    keepPreviousData: true,
  });

  if (error) return `Error: ${error.message}`;

  const { t: h } = useTranslation("translation", { keyPrefix: "Home" });
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: p } = useTranslation("translation", { keyPrefix: "Profile" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: n } = useTranslation("translation", { keyPrefix: "Navbar" });
  return (
    <>
      {showModal && (
        <AddClient showModal={showModal} setShowModal={setShowModal} />
      )}

      {deleteModal && (
        <DeleteClient
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateClient
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
              <h2>{h(3)}</h2>
            </div>
            <button
              className="btn btn-sm me-2"
              style={{ background: "var(--blue)", color: "var(--g_white)" }}
              onClick={() => setShowModal(!showModal)}
            >
              <i className="fa fa-add"></i>
            </button>
          </Topbar>

          <div className="header_flex">
            <SearchInput
              search={search}
              setSearch={setSearch}
              setPage={setPage}
            />
          </div>

          {/* MIJOZLAR */}
          <div
            className="container-fluid my-2"
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
                  <th style={{ width: "5px", padding: '10px' }}>№</th>
                  <th>{m(18)}</th>
                  <th>{m(0)}</th>
                  <th>{g(5)}</th>
                  <th>{g(19)}</th>
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
                      <h2>{g(23)}</h2>
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№">{index + 1}</td>
                      <td data-label="F.I.O" className="text-capitalize text-start">
                        {item.first_name}
                      </td>
                      <td data-label="Tug'ilgan kuni">
                        {item.birthdate ? item.birthdate : "~"}
                      </td>
                      <td data-label="Telefon raqami">{item.phone_number1}</td>
                      <td data-label="Mahsulot summasi">
                        <b className="text-success fw-600">
                          {formatNumber(item.total_amount)}
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
                      }} className="cursor_pointer">
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

export default Clients;
