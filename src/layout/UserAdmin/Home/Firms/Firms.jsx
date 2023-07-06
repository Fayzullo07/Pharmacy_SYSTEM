import React, { useEffect, useState } from "react";
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
import {
  isFavoriteFunction,
  toggleFunction
} from "../../../../redux/Actions/ToggleActions";
import { useTranslation } from "react-i18next";
import { number_0, pagination } from "../../../../api";

const Firms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const reduxData = useSelector(state => state);
  const { toggle } = reduxData.toggle;
  const { is_favorite } = reduxData.is_favorite;

  useEffect(() => {
    dispatch(toggleFunction(true));
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["firms", page, is_favorite, search],
    queryFn: async () => {
      return await firmsGetAPI({ page, is_favorite, search });
    },
    keepPreviousData: true
  });

  if (error) return `Error: ${error.message}`;

  const { t } = useTranslation("translation", { keyPrefix: "Global" });

  return (
    <div className="d-flex">
      <Navbar />
      <div className={`container_g ${toggle ? "" : "active"}`}>
        <Topbar>
          <div className="header_flex">
            <h2>
              {t(16)}
            </h2>
          </div>
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
                className={`btn btn${is_favorite
                  ? ""
                  : "-outline"}-primary btn-sm`}
                onClick={() => {
                  setPage(1);
                  dispatch(isFavoriteFunction(true));
                }}
              >
                {t(8)}
              </button>
              <button
                type="button"
                className={`btn btn${!is_favorite
                  ? ""
                  : "-outline"}-danger btn-sm`}
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
          <table id="table" className="my-2 table table-hover">
            <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
              <tr>
                <th scope="col" style={{ width: "5px" }}>
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
                <th scope="col">
                  {t(6)}
                </th>
                <th scope="col">
                  {t(7)}
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.results.length === 0 &&
                <tr>
                  <td colSpan={12}>
                    <h2>
                      {t(15)}
                    </h2>
                  </td>
                </tr>}
              {data &&
                data.data.results.map((item, index) =>
                  <tr
                    key={item.id}
                    className="cursor_pointer"
                    onClick={() => navigate(`/firms/${item.id}/${item.name}`)}
                  >
                    <td data-label="№">
                      {index + 1}
                    </td>
                    <td
                      data-label={t(4)}
                      className="text-capitalize text-break"
                    >
                      <b>
                        {item.name}
                      </b>
                    </td>
                    <td data-label={t(5)}>
                      {item.phone_number1}
                    </td>
                    <td data-label={t(2)} className="text-break">
                      {item.address ? item.address : "~"}
                    </td>

                    <td
                      data-label={t(6)}
                      className={
                        item.not_transfer_debt > 0
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      <b>
                        {item.not_transfer_debt == 0
                          ? number_0
                          : formatNumber(item.not_transfer_debt)}
                      </b>
                    </td>
                    <td
                      data-label={t(7)}
                      className={
                        item.transfer_debt > 0 ? "text-danger" : "text-success"
                      }
                    >
                      <b>
                        {item.transfer_debt == 0
                          ? number_0
                          : formatNumber(item.transfer_debt)}
                      </b>
                    </td>
                  </tr>
                )}
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
  );
};

export default Firms;
