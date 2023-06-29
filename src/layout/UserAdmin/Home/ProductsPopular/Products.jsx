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

  return (
    <>
      {showModal && (
        <AddPopularProducts
          showModal={showModal}
          setShowModal={setShowModal}
          deteils={deteils.pharmacies}
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
        />
      )}
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar>
            <div className="header_flex">
              <h2>Ommabob mahsulotlar</h2>
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
                  <th>Nomi</th>
                  <th>Miqdori</th>
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
                      <h2> Mahsulot topilmadi!</h2>
                    </td>
                  </tr>
                )}
                {data &&
                  data.data.results.map((item, index) => (
                    <tr key={item.id}>
                      <td data-label="№">{index + 1}</td>
                      <td data-label="Nomi" className="text-capitalize">
                        <b>{item.name}</b>
                      </td>
                      <td data-label="Miqdori">
                        <b className="text-success">
                          {formatNumber(item.price)}
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

export default Products;
