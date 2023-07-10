import React, { useState } from "react";
import ModalSimple from "../../../../../../utils/ModalSimple";
import SearchInput from "../../../../../../utils/SearchInput";
import { useQuery } from "react-query";
import { firmsGetAPI } from "../../../../../../api/DirectorRequest";
import PaginationForModal from "../../../../../../utils/PaginationForModal";
import SkeletLoading from "../../../../../../utils/SkeletLoading";
import { pagination } from "../../../../../../api";
import { useTranslation } from "react-i18next";

const ModalSearchFirmIncome = ({
  showModal,
  setShowModal,
  setCurData,
  setAddModal
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["firms", page, search],
    queryFn: async () => {
      return await firmsGetAPI({ page, is_favorite: true, search });
    },
    keepPreviousData: true
  });

  if (error) return `Error: ${error.message}`;

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });

  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={g(16)}
    >
      <div className="header_flex mt-2">
        <SearchInput search={search} setSearch={setSearch} setPage={setPage} />
      </div>

      <div className="modal-body">
        {/* TABLE */}
        <table
          className="table table-hover table-bordered border-secondary align-middle text-center"
          style={{ width: "max-content", minWidth: "100%" }}
        >
          <thead
            className="align-middle"
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "var(--blue)",
              color: "#fff",
              zIndex: 55
            }}
          >
            <tr>
              <th scope="col" style={{ width: "5px", padding: "10px" }}>
                №
              </th>
              <th scope="col">
                {g(4)}
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.results.length === 0 &&
              <tr>
                <td colSpan={2}>
                  <h2>
                    {g(23)}
                  </h2>
                </td>
              </tr>}
            {data &&
              data.data.results.map((item, index) =>
                <tr
                  key={item.id}
                  onClick={() => {
                    setCurData(item);
                    setShowModal(false);
                    setAddModal(true);
                  }}
                  className="cursor_pointer"
                >
                  <td data-label="№">
                    {index + 1}
                  </td>
                  <td
                    data-label="Firma"
                    className="text-capitalize text-break text-start"
                  >
                    <b>
                      {item.name}
                    </b>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
      </div>
      <div className="modal-footer">
        <PaginationForModal
          page={page}
          pages={Math.ceil(data && data.data.count / pagination)}
          setPage={setPage}
        />
      </div>
    </ModalSimple>
  );
};

export default ModalSearchFirmIncome;
