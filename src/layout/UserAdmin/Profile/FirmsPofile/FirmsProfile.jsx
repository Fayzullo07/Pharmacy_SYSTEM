import React, { useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { firmsGetAPI } from "../../../../api/DirectorRequest";
import PaginationForModal from "../../../../utils/PaginationForModal";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { formatNumber } from "../../../../functions/NecessaryFunctions";
import SearchInput from "../../../../utils/SearchInput";
import { isFavoriteFunction } from "../../../../redux/Actions/ToggleActions";
import AddFirma from "../../Home/Firms/Modal/AddFirma";
import DeleteFirm from "../../Home/Firms/Modal/DeleteFirm";
import UpdateFirma from "../../Home/Firms/Modal/UpdateFirma";
import { pagination } from "../../../../api";
import { useTranslation } from "react-i18next";

const FirmsProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [curData, setCurData] = useState();

  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;
  const { is_favorite } = reduxData.is_favorite;

  const { data, isLoading, error } = useQuery({
    queryKey: ["firms", page, is_favorite, search],
    queryFn: async () => {
      return await firmsGetAPI({ page, is_favorite, search });
    },
    keepPreviousData: true,
  });

  if (error) return `Error: ${error.message}`;

  const { t } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <>
      {showModal && (
        <AddFirma showModal={showModal} setShowModal={setShowModal} />
      )}

      {deleteModal && (
        <DeleteFirm
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdateFirma
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
              <h2>{t(16)}</h2>
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

            <div className="btns_flex">
              <div class="btn-group btn-group-sm me-2">
                <button
                  type="button"
                  className={`btn btn${is_favorite ? "" : "-outline"
                    }-primary btn-sm`}
                  onClick={() => {
                    setPage(1);
                    dispatch(isFavoriteFunction(true));
                  }}
                >
                  {t(8)}
                </button>
                <button
                  type="button"
                  className={`btn btn${!is_favorite ? "" : "-outline"
                    }-danger btn-sm`}
                  onClick={() => {
                    setPage(1);
                    dispatch(isFavoriteFunction(false));
                  }}
                >
                  {t(9)}
                </button>
              </div>
            </div>
          </div>
          {/* TABLE */}
          <div
            className="container-fluid"
            style={{ maxHeight: "calc(100vh - 170px)", overflowY: "scroll" }}
          >
            <table className="table table-hover table-bordered border-secondary align-middle text-center"
              style={{
                width: "max-content",
                minWidth: "100%"
              }}>
              <thead className="align-middle"
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "var(--blue)",
                  color: "#fff",
                  zIndex: 55
                }}>
                <tr>
                  <th scope="col" style={{ width: "5px", padding: '10px' }}>
                    №
                  </th>
                  <th scope="col">
                    {t(4)}
                  </th>
                  <th scope="col">
                    {t(5)}
                  </th>
                  <th scope="col">
                    {t(2)}
                  </th>
                  <th scope="col" style={{ width: "5px" }}>
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
                      {t(15)}
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№">{index + 1}</td>
                      <td
                        data-label="Firma nomi"
                        className="text-capitalize text-break text-start"
                      >
                        {item.name}
                      </td>
                      <td data-label="Telefon raqami">{item.phone_number1}</td>
                      <td data-label="Manzil" className="text-break">
                        {item.address ? item.address : "~"}
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

                      <td
                        data-label="O'chirish"
                        onClick={() => {
                          setCurData(item);
                          setDeleteModal(!deleteModal);
                        }}
                      >
                        <i className="fa fa-trash-can text-danger  cursor_pointer"></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
          </div>
          <div className="fixed-bottom" style={{ zIndex: 1 }}>
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

export default FirmsProfile;
