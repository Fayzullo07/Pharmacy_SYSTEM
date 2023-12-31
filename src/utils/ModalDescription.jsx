import React from "react";
import ModalSimple from "./ModalSimple";
import { useTranslation } from "react-i18next";

const ModalDescription = ({
  showModal,
  setShowModal,
  data = ""
}) => {
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <ModalSimple showModal={showModal} setShowModal={setShowModal} title={g(62)}>
        {/* <span className="px-2 mx-2">Izoh</span> */}
      <div className="border m-2 p-2 py-3 rounded text-break">
        {data}
      </div>
    </ModalSimple>
  );
};

export default ModalDescription;
