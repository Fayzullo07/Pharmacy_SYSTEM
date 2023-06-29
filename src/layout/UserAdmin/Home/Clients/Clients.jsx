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
              <h2>Mijozlar</h2>
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
            <table id="table" className="table table-hover">
              <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
                <tr>
                  <th style={{ width: "5px" }}>№</th>
                  <th>F.I.O</th>
                  <th>Tug'ilgan</th>
                  <th>Telefon</th>
                  <th>Miqdor</th>
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
                      <h2> Klient topilmadi!</h2>
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№">{index + 1}</td>
                      <td data-label="F.I.O" className="text-capitalize">
                        <b>{item.first_name}</b>
                      </td>
                      <td data-label="Tug'ilgan">
                        {item.birthdate ? item.birthdate : "~"}
                      </td>
                      <td data-label="Telefon">{item.phone_number1}</td>
                      <td data-label="Miqdor">
                        <b className="text-success">
                          {formatNumber(item.total_amount)}
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

          <div className="fixed-bottom">
            <PaginationForModal
              page={page}
              pages={Math.ceil(data && data.data.count / 10)}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
