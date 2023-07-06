import React, { useState } from "react";
import PaginationForModal from "../../../../../../utils/PaginationForModal";
import { useQuery } from "react-query";
import SkeletLoading from "../../../../../../utils/SkeletLoading";
import { firmsInComesGetAPI } from "../../../../../../api/GlobalRequest";
import { formatNumber } from "../../../../../../functions/NecessaryFunctions";
import { pagination } from "../../../../../../api";

const DebtsModal = ({
  showModal,
  setShowModal,
  setCurData,
  setShowAddModal,
  from_firm,
  setSearchModal,
}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["firms_debts_list", from_firm],
    queryFn: async () => {
      return await firmsInComesGetAPI({
        is_paid: false,
        from_firm: from_firm?.id,
      });
    },
  });

  if (error) return `Error: ${error.message}`;

  return (
    <div
      className="modal fade-centered d-flex justify-content-center align-items-center"
      style={{ position: "absolute", zIndex: 100 }}
      onClick={() => setShowModal(false)}
    >
      {/* <!-- Modal content --> */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5
            className="modal-title border border-primary p-1 rounded cursor_pointer"
            onClick={() => setSearchModal(true)}
          >
            {from_firm.id == "" ? "Firmani tanlash" : from_firm.name}{" "}
            <span>
              <i className="fa fa-angle-down"></i>
            </span>
          </h5>

          <span className="close">
            <i
              className="fa fa-xmark"
              onClick={() => setShowModal(!showModal)}
            />
          </span>
        </div>

        <div className="modal-body my-0 py-0">
          {/* TABLE */}
          <table id="table" className="table table-hover align-middle">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr>
                <th scope="col" style={{ width: "5px" }}>
                  №
                </th>
                <th scope="col">Operatsiyalar</th>
                <th scope="col">Olingan mahsulot summasi</th>
                <th scope="col">Qolgan qarz</th>
              </tr>
            </thead>
            <tbody>
              {data && data.data.results.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <h2> Malumot topilmadi!</h2>
                  </td>
                </tr>
              )}
              {data &&
                data.data.results.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      setCurData(item);
                      setShowModal(false);
                      setShowAddModal(true);
                    }}
                    className="cursor_pointer"
                  >
                    <td data-label="№">{index + 1}</td>

                    <td
                      data-label="Olingan mahsulot summasi"
                      className="text-start text-break"
                    >
                      {item.created_at} <br />
                      {item.from_firm_name} <br />
                      {item.creator_name}
                    </td>
                    <td
                      data-label="Olingan mahsulot summasi"
                      className="text-capitalize text-break"
                    >
                      <b>{formatNumber(item.price)}</b>
                    </td>
                    <td data-label="Qolgan qarz">
                      <b className="text-danger">
                        {formatNumber(item.remaining_debt)}
                      </b>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && <SkeletLoading height={60} count={6} rodius={20} />}
        </div>
        <div className="modal-footer m-0 p-0">
          <PaginationForModal
            page={page}
            pages={Math.ceil(data && data.data.count / pagination)}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DebtsModal;
