import React, { useState } from "react";
import { today } from "../../../../../api";
import { useNavigate } from "react-router-dom";
import ModalSimple from "../../../../../utils/ModalSimple";
import SmenaSelect from "../../../../../ui/SmenaSelect";

const ChooseDate = props => {
  const { showModal, setShowModal, pharm_id, pharm_name  } = props;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shift: 1,
    date: today
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = () => {
    navigate(`/edit/report/${pharm_id}/${formData.shift}/${formData.date}/${pharm_name}`);
  };
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={"Sana va Smena tanlang"}
    >
      <div className="modal-body">
        <SmenaSelect
          name={"shift"}
          value={formData.shift}
          handleInputChange={handleInputChange}
          isRequired={true}
        />

        {/* CHOOSE DATE */}
        <div className="form-floating mb-3">
          <input
            type="date"
            placeholder="Ismi"
            className="form-control"
            name="date"
            value={formData.date}
            max={today}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Sanani tanlang <b className="text-danger">*</b>
          </label>
        </div>
      </div>

      <div className="modal-footer">
        <div className="d-grid col-12">
          <button
            className="btn btn-primary rounded-3"
            style={{ background: "var(--blue)" }}
            onClick={() => handleSubmit()}
          >
            Tanlash
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default ChooseDate;
