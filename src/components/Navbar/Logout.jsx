import React, { useEffect } from "react";
import ModalSimple from "../../utils/ModalSimple";
import { handleLogout } from "../../App";
import { useTranslation } from "react-i18next";

const Logout = ({ showModal, setShowModal }) => {
  useEffect(
    () => {
      document.body.style.overflow = `${showModal ? "hidden" : "scroll"}`;
      window.scrollTo(0, 0);
    },
    [showModal]
  );
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: n } = useTranslation("translation", { keyPrefix: "Navbar" });
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={n(7)}
      zIndex={55555555}
    >
      <div className="modal-body">
        <h2 className="text-muted text-center">
          {g(66)}
        </h2>
      </div>

      <div className="modal-footer">
        <div className="d-grid d-flex justify-content-evenly col-12 ">
          <button
            className="btn btn-primary rounded-3 col-3"
            style={{ background: "red" }}
            onClick={handleLogout}
          >
            {g(54)}
          </button>
          <button
            className="btn btn-primary rounded-3 col-3"
            style={{ background: "var(--blue)" }}
            onClick={() => setShowModal(false)}
          >
            {g(55)}
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default Logout;
