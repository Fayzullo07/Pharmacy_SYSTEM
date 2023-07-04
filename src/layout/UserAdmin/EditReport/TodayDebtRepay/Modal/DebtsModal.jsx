import React, { useState } from "react";
import ModalSimple from "../../../../../utils/ModalSimple";
import SkeletLoading from "../../../../../utils/SkeletLoading";
import PaginationForModal from "../../../../../utils/PaginationForModal";
import { useQuery } from "react-query";
import { pharmaciesDebtsGetAPI } from "../../../../../api/DirectorRequest";
import SearchInput from "../../../../../utils/SearchInput";
import { today } from "../../../../../api";

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
        to_pharmacy: getData.to_pharmacy,
        is_paid: false,
        report_date: date,
        page,
        search
      });
    },
    keepPreviousData: true
  });

  if (error) return `Error: ${error.message}`;

  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title="Olingan qarzlar"
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
        <table id="table" className="table table-hover align-middle">
          <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
            <tr>
              <th scope="col" style={{ width: "5px" }}>
                №
              </th>
              <th scope="col">Ismi</th>
              <th scope="col">Qarz</th>
              <th scope="col">Berilgan</th>
              <th scope="col">Qolgan</th>
              <th scope="col">Vaqt</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.results.length === 0 &&
              <tr className="cursor_pointer">
                <td colSpan={7}>
                  <h2>Qarz topilmadi!</h2>
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
                  <td data-label="Vaqt" className="text-break">
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
