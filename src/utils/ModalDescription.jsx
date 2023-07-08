import React from "react";
import ModalSimple from "./ModalSimple";

const ModalDescription = ({
  showModal,
  setShowModal,
  data = ""
}) => {
  return (
    <ModalSimple showModal={showModal} setShowModal={setShowModal} title="Izoh">
        {/* <span className="px-2 mx-2">Izoh</span> */}
      <div className="border m-2 p-2 py-3 rounded text-break">
        {data}
      </div>
    </ModalSimple>
  );
};

export default ModalDescription;
