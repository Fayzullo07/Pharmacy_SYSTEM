import React from "react";

const ModalDelete = ({ showModal, setShowModal, mutation, handleSubmit }) => {
  return (
    <div
      className="modal fade-centered d-flex justify-content-center align-items-center"
      style={{ position: "absolute", zIndex: 555 }}
      onClick={() => setShowModal(false)}
    >
      {/* <!-- Modal content --> */}

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title text-center w-100">O'chirish</h5>

          <span className="close">
            <i
              className="fa fa-xmark"
              onClick={() => setShowModal(!showModal)}
            />
          </span>
        </div>

        <div className="modal-body">
          <h2 className="text-muted text-center">
            Siz haqiqatdan o'chirmoqchimisiz?
          </h2>
        </div>

        <div className="modal-footer">
          <div className="d-grid d-flex justify-content-evenly col-12 ">
            <button
              className="btn btn-primary rounded-3 col-3"
              style={{ background: "red" }}
              onClick={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                "Ha"
              )}
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
      </div>
    </div>
  );
};

export default ModalDelete;
