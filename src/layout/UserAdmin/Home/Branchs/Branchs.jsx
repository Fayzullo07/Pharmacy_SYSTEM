import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../../../components/Topbar/Topbar";
import Navbar from "../../../../components/Navbar/Navbar";
import { useQuery } from "react-query";
import { aptekaGetAPI } from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import PaginationForModal from "../../../../utils/PaginationForModal";
import ChooseDate from "./Modal/ChooseDate";
import { toggleFunction } from "../../../../redux/Actions/ToggleActions";
import { useTranslation } from "react-i18next";
import { pagination } from "../../../../api";

const Branchs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [chooseDate, setChooseDate] = useState(false);

  const [curData, setCurData] = useState();

  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;

  useEffect(() => {
    dispatch(toggleFunction(true));
  }, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ["apteka", page],
    queryFn: async () => {
      return await aptekaGetAPI({ page });
    },
    keepPreviousData: true,
  });

  if (error) return `Error: ${error.message}`;

  const { t } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <>
      {chooseDate && (
        <ChooseDate
          showModal={chooseDate}
          setShowModal={setChooseDate}
          pharm_id={curData.id}
          pharm_name={curData.name}
        />
      )}
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar>
            <div className="header_flex">
              <h2>{t(1)}</h2>
            </div>
          </Topbar>

          {/* TABLE */}
          <div
            className="container-fluid m-1"
            style={{ maxHeight: "calc(100vh - 150px)", overflowY: "scroll" }}
          >
            <table className="table table-hover table-bordered border-secondary align-middle text-center" style={{
              width: "max-content",
              minWidth: "100%"
            }}>
              <thead className="align-middle"
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "var(--blue)",
                  color: "#fff",
                  zIndex: 55,
                }}>
                <tr>
                  <th scope="col" style={{ width: "5px", padding: '10px' }}>
                    №
                  </th>
                  <th scope="col">{t(0)}</th>
                  <th scope="col">{t(2)}</th>
                  <th scope="col">{t(3)}</th>
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
                    <tr key={item.id}
                      className="cursor_pointer"
                      onClick={() => {
                        navigate(`/branchs/${item.id}/${item.name}`)
                        dispatch(toggleFunction(false));
                      }
                      }>
                      <td data-label="№">{index + 1}</td>
                      <td
                        data-label={t(0)}
                        className="text-capitalize text-break"
                      >
                        {item.name}
                      </td>
                      <td data-label={t(2)} className="text-break">
                        {item.address ? item.address : "~"}
                      </td>
                      <td data-label={t(3)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="btn btn-outline-primary" onClick={() => {
                          setCurData(item);
                          setChooseDate(!chooseDate);
                        }}>
                          <i
                            className="fa-solid fa-clock text-info cursor_pointer me-2"

                          ></i>
                          {t(3)}
                        </button>
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
      </div >
    </>
  );
};

export default Branchs;
