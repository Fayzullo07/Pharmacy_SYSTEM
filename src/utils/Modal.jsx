import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Modal = ({
  showModal,
  setShowModal,
  children,
  title = "",
  mutation,
  handleSubmit
}) => {
  const [placeholderInput, setPlaceholderInput] = useState("");

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: p } = useTranslation("translation", { keyPrefix: "Profile" });
  useEffect(
    () => {
      switch (title) {
        case "O'zgartirish":
          setPlaceholderInput(g(20));
          break;
        case "Kimdan qarz olindi":
          setPlaceholderInput(m(24));
          break;
        case "Olingan qarzni qaytarish":
          setPlaceholderInput(g(46));
          break;
        case "Chegirma bilan savdo":
          setPlaceholderInput(g(47));
          break;
        case "Tushumlar":
          setPlaceholderInput(g(48));
          break;
        case "Qarz berish":
          setPlaceholderInput(g(49));
          break;
        case "Qarzga qilingan savdo":
          setPlaceholderInput(g(24));
          break;
        case "Berilgan qarzni qaytarish":
          setPlaceholderInput(g(50));
          break;
        case "Qarzga qilingan savdoni qaytarish":
          setPlaceholderInput(g(51));
          break;
        case "Firmaga qaytarilgan mahsulot":
          setPlaceholderInput(g(36));
          break;
        default:
          setPlaceholderInput(g(52));
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
                : p(6)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
