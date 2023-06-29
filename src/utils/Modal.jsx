import React from "react";

const Modal = ({
  showModal,
  setShowModal,
  children,
  title = "Qo'shish",
  mutation,
  handleSubmit,
}) => {
  return (
    <div
      className="modal fade-centered d-flex justify-content-center align-items-center"
      style={{ position: "absolute", zIndex: 500 }}
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
        <div className="modal-footer">
          <div className="d-grid col-12">
            <button
              type="submit"
              className="btn btn-primary rounded-3"
              style={{ background: "var(--blue)" }}
              onClick={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                "Saqlash"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
