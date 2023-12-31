import React, { useState } from "react";
import ModalSimple from "../../../../../../utils/ModalSimple";
import SearchInput from "../../../../../../utils/SearchInput";
import { useQuery } from "react-query";
import { firmsGetAPI } from "../../../../../../api/DirectorRequest";
import PaginationForModal from "../../../../../../utils/PaginationForModal";
import SkeletLoading from "../../../../../../utils/SkeletLoading";
import { pagination } from "../../../../../../api";
import { useTranslation } from "react-i18next";

const ModalSearchFirmReturn = ({ showModal, setShowModal, setCurData }) => {
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
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });

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
        <table id="table" className="table table-hover">
          <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
            <tr>
              <th scope="col" style={{ width: "5px" }}>
                №
              </th>
              <th scope="col">{m(21)}</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.results.length === 0 &&
              <tr>
                <td colSpan={2}>
                  {g(23)}
                </td>
              </tr>}
            {data &&
              data.data.results.map((item, index) =>
                <tr
                  key={item.id}
                  onClick={() => {
                    setCurData(item);
                    setShowModal(false);
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

export default ModalSearchFirmReturn;
