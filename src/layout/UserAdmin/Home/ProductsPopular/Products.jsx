import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../../components/Navbar/Navbar";
import Topbar from "../../../../components/Topbar/Topbar";
import PaginationForModal from "../../../../utils/PaginationForModal";
import SkeletLoading from "../../../../utils/SkeletLoading";
import { popularProductsGetAPI } from "../../../../api/GlobalRequest";
import { useQuery } from "react-query";
import { formatNumber } from "../../../../functions/NecessaryFunctions";
import SearchInput from "../../../../utils/SearchInput";
import AddPopularProducts from "./Modal/AddPopularProducts";
import DeletePopularProducts from "./Modal/DeletePopularProducts";
import UpdatePopularProducts from "./Modal/UpdatePopularProducts";
import { useTranslation } from "react-i18next";
import { pagination } from "../../../../api";

const Products = () => {
  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;
  const { deteils } = reduxData.deteils;

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [curData, setCurData] = useState({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["popular_products", page, search],
    queryFn: async () => {
      return await popularProductsGetAPI({ page, search });
    },
  });

  if (error) return `Error: ${error.message}`;
 
  const { t } = useTranslation("translation", { keyPrefix: "Global" });

  return (
    <>
      {showModal && (
        <AddPopularProducts
          showModal={showModal}
          setShowModal={setShowModal}
          deteils={deteils}
        />
      )}

      {deleteModal && (
        <DeletePopularProducts
          showModal={deleteModal}
          setShowModal={setDeleteModal}
          data={curData}
        />
      )}

      {updateModal && (
        <UpdatePopularProducts
          showModal={updateModal}
          setShowModal={setUpdateModal}
          data={curData}
          deteils={deteils}
        />
      )}
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar>
            <div className="header_flex">
              <h2>{t(22)}</h2>
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

          {/* PRODUCTS */}
          <div
            className="container-fluid my-2"
            style={{ maxHeight: "calc(100vh - 170px)", overflowY: "scroll" }}
          >
            <table id="table" className="table table-hover">
              <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
                <tr>
                  <th style={{ width: "5px" }}>№</th>
                  <th>{t(17)}</th>
                  <th>{t(18)}</th>
                  <th>{t(19)}</th>
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
                      <h2>{t(15)}</h2>
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№">{index + 1}</td>
                      <td data-label={t(17)} className="text-capitalize">
                        {item.pharmacy_name}
                      </td>
                      <td data-label={t(18)} className="text-capitalize">
                        {item.name}
                      </td>
                      <td data-label={t(19)}>
                        <b className="text-success fw-600">
                          {formatNumber(item.price)}
                        </b>
                      </td>
                      <td data-label={t(20)} onClick={() => {
                        setCurData(item);
                        setUpdateModal(!updateModal);
                      }}
                      className="cursor_pointer">
                        <i
                          className="fa fa-edit text-warning"

                        ></i>
                      </td>
                      <td data-label={t(21)} onClick={() => {
                        setCurData(item);
                        setDeleteModal(!deleteModal);
                      }} 
                      className="cursor_pointer">
                        <i
                          className="fa fa-trash-can text-danger "

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

export default Products;
