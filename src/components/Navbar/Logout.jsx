import React from "react";
import ModalSimple from "../../utils/ModalSimple";
import { handleLogout } from "../../App";

const Logout = ({ showModal, setShowModal }) => {
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={"Tizimdan chiqish"}
      zIndex={55555555}
    >
      <div className="modal-body">
        <h2 className="text-muted text-center">
          Siz haqiqatdan ham tizimdan chiqmoqchimisiz?
        </h2>
      </div>

      <div className="modal-footer">
        <div className="d-grid d-flex justify-content-evenly col-12 ">
          <button
            className="btn btn-primary rounded-3 col-3"
            style={{ background: "red" }}
            onClick={handleLogout}
          >
            Ha
          </button>
          <button
            className="btn btn-primary rounded-3 col-3"
            style={{ background: "var(--blue)" }}
            onClick={() => setShowModal(false)}
          >
            Yo'q
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default Logout;
