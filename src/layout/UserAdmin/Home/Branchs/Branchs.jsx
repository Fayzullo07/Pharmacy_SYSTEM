import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../../../components/Topbar/Topbar";
import Navbar from "../../../../components/Navbar/Navbar";
import { useQuery } from "react-query";
import { aptekaGetAPI } from "../../../../api/DirectorRequest";
import SkeletLoading from "../../../../utils/SkeletLoading";
import PaginationForModal from "../../../../utils/PaginationForModal";
import AddApteka from "./Modal/AddApteka";
import ChooseDate from "./Modal/ChooseDate";
import { toggleFunction } from "../../../../redux/Actions/ToggleActions";

const Branchs = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [chooseDate, setChooseDate] = useState(false);
  
  const [curData, setCurData] = useState();
  
  const reduxData = useSelector((state) => state);
  const { toggle } = reduxData.toggle;
  
  const dispatch = useDispatch();
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

  //   const { t } = useTranslation("translation", { keyPrefix: "Home" });
  return (
    <>
      {showModal && (
        <AddApteka showModal={showModal} setShowModal={setShowModal} />
      )}

      {chooseDate && (
        <ChooseDate
          showModal={chooseDate}
          setShowModal={setChooseDate}
          pharm_id={curData.id}
        />
      )}
      <div className="d-flex">
        <Navbar />
        <div className={`container_g ${toggle ? "" : "active"}`}>
          <Topbar>
            <div className="header_flex">
              <h2>Filiallar</h2>
            </div>
            <button
              className="btn btn-sm me-2"
              style={{ background: "var(--blue)", color: "var(--g_white)" }}
              onClick={() => setShowModal(!showModal)}
            >
              <i className="fa fa-add"></i>
            </button>
          </Topbar>

          {/* TABLE */}
          <div
            className="container-fluid m-1"
            style={{ maxHeight: "calc(100vh - 150px)", overflowY: "scroll" }}
          >
            <table id="table" className="table table-hover">
              <thead style={{ position: "sticky", top: 0, zIndex: 55 }}>
                <tr>
                  <th scope="col" style={{ width: "5px" }}>
                    №
                  </th>
                  <th scope="col">Filial</th>
                  <th scope="col">Manzil</th>
                  <th scope="col">Nazorat</th>
                </tr>
              </thead>
              <tbody>
                {data && data.data.results.length === 0 && (
                  <tr>
                    <td colSpan={12}>
                      <h2>Malumot topilmadi!</h2>
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
                        data-label="Filial"
                        className="text-capitalize text-break"
                      >
                        {item.name}
                      </td>
                      <td data-label="Manzil" className="text-break">
                        {item.address ? item.address : "~"}
                      </td>
                      <td data-label="Nazorat"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="btn btn-outline-primary" onClick={() => {
                          setCurData(item);
                          setChooseDate(!chooseDate);
                        }}>
                          <i
                            className="fa-solid fa-clock text-info cursor_pointer me-2"

                          ></i>
                          Nazorat
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
              pages={Math.ceil(data && data.data.count / 10)}
              setPage={setPage}
            />
          </div>
        </div>
      </div >
    </>
  );
};

export default Branchs;
