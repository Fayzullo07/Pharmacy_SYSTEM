import React from "react";
import ModalSimple from "../../../../../../utils/ModalSimple";
import Textarea from "../../../../../../ui/Textarea";

const DeteilsFirmIncome = ({ showModal, setShowModal, data }) => {
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={"To'liq malumot"}
    >
      <h2>
        {data.desc}
      </h2>
      <Textarea
        value={data.desc}
        handleInputChange={null}
        handleSubmit={null}
      />
    </ModalSimple>
  );
};

export default DeteilsFirmIncome;
