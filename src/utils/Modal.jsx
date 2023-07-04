import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Modal = ({
  showModal,
  setShowModal,
  children,
  title = "Qo'shish",
  mutation,
  handleSubmit
}) => {
  const [placeholderInput, setPlaceholderInput] = useState("");

  useEffect(
    () => {
      switch (title) {
        case "O'zgartirish":
          setPlaceholderInput("O'zgartirish");
          break;
        case "Kimdan qarz olindi":
          setPlaceholderInput("Kimdan qarz olindi");
          break;
        case "Olingan qarzni qaytarish":
          setPlaceholderInput("Olingan qarzni qaytarish");
          break;
        case "Chegirma bilan savdo":
          setPlaceholderInput("Chegirma bilan savdo");
          break;
        case "Tushumlar":
          setPlaceholderInput("Tushumlar");
          break;
        case "Qarz berish":
          setPlaceholderInput("Qarz berish");
          break;
        case "Qarzga qilingan savdo":
          setPlaceholderInput("Qarzga qilingan savdo");
          break;
        case "Berilgan qarzni qaytarish":
          setPlaceholderInput("Berilgan qarzni qaytarish");
          break;
        case "Qarzga qilingan savdoni qaytarish":
          setPlaceholderInput("Qarzga qilingan savdoni qaytarish");
          break;
        default:
          setPlaceholderInput(title);
      }
    },
    [title]
  );
  return (
    <div
      className="modal fade-centered d-flex justify-content-center align-items-center"
      style={{ position: "absolute", zIndex: 500 }}
      onClick={() => setShowModal(false)}
    >
      {/* <!-- Modal content --> */}

      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title text-center w-100">
            {placeholderInput}
          </h5>

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
              {mutation.isLoading
                ? <i className="fa fa-spinner fa-spin" />
                : "Saqlash"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
