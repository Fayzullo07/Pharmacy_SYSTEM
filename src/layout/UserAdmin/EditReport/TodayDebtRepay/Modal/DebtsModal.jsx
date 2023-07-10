import React, { useState } from "react";
import ModalSimple from "../../../../../utils/ModalSimple";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import PaginationForModal from "../../../../../utils/PaginationForModal";
import { useQuery } from "react-query";
import { pharmaciesDebtsGetAPI } from "../../../../../api/DirectorRequest";
import SearchInput from "../../../../../utils/SearchInput";
import { today } from "../../../../../api";
import { useTranslation } from "react-i18next";

const DebtsModal = ({
  showModal,
  setShowModal,
  setShowAddModal,
  setCurData,
  getData
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["debts_list", page, search, date],
    queryFn: async () => {
      return await pharmaciesDebtsGetAPI({
        pharmacy: getData.to_pharmacy,
        is_paid: false,
        report_date: date,
        page,
        search
      });
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
      title={g(18)}
    >
      <div className="header_flex m-2">
        <SearchInput search={search} setSearch={setSearch} setPage={setPage} />
        <div>
          <input
            className="form-control-sm cursor_pointer "
            type="date"
            value={date}
            max={today}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-body my-0 py-0">
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
                {m(28)}
              </th>
              <th scope="col">
                {g(12)}
              </th>
              <th scope="col">
                {m(3)}
              </th>
              <th scope="col">
                {g(114)}
              </th>
              <th scope="col">Vaqt</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.results.length === 0 &&
              <tr className="cursor_pointer">
                <td colSpan={7}>
                  {g(23)}
                </td>
              </tr>}
            {data &&
              data.data.results.map((user, index) =>
                <tr
                  key={user.id}
                  onClick={() => {
                    setCurData(user);
                    setShowModal(false);
                    setShowAddModal(true);
                  }}
                  className="cursor_pointer"
                >
                  <td data-label="№">
                    {index + 1}
                  </td>

                  <td data-label="Ismi" className="text-break">
                    {user.from_who ? user.from_who : user.to_who}
                  </td>

                  <td data-label="Qarz">
                    <b>
                      {user.price}
                    </b>
                  </td>
                  <td data-label="Berilgan">
                    <b className="text-success text-break">
                      {user.price - user.remaining_debt}
                    </b>
                  </td>
                  <td data-label="Qolgan">
                    <b className="text-danger text-break">
                      {user.remaining_debt}
                    </b>
                  </td>
                  <td
                    data-label="Vaqt"
                    className="text-break"
                    style={{ width: "120px" }}
                  >
                    {user.report_date}
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
      </div>
      <div className="modal-footer m-0 p-0">
        <PaginationForModal
          page={page}
          pages={Math.ceil(data && data.data.count / 10)}
          setPage={setPage}
        />
      </div>
    </ModalSimple>
  );
};

export default DebtsModal;
