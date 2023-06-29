import React from "react";

const ModalSimple = ({
  showModal,
  setShowModal,
  children,
  title = "Qo'shish",
}) => {
  return (
    <div
      className="modal fade-centered d-flex justify-content-center align-items-center"
      style={{ position: "absolute", zIndex: 555 }}
      onClick={() => setShowModal(false)}
    >
      {/* <!-- Modal content --> */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title text-center w-100">{title}</h5>

          <span className="close">
            <i
              className="fa fa-xmark"
              onClick={() => setShowModal(!showModal)}
            />
          </span>
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalSimple;
