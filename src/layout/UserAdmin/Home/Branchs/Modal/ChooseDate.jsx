import React, { useState } from "react";
import { today } from "../../../../../api";
import { useNavigate } from "react-router-dom";
import ModalSimple from "../../../../../utils/ModalSimple";

const ChooseDate = (props) => {
  const { showModal, setShowModal, pharm_id } = props;
  const navigate = useNavigate();

  const [shift, setShift] = useState(1);
  const [date, setDate] = useState(today);

  const handleSubmit = () => {
    navigate(`/edit/report/${pharm_id}/${shift}/${date}`);
  };
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={"Sana va Smena tanlang"}
    >
      <div className="modal-body">
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          >
            <option value={1}>Smena 1</option>
            <option value={2}>Smena 2</option>
            <option value={3}>Smena 3</option>
          </select>
          <label htmlFor="shift">
            Smenani tanlang <b className="text-danger">*</b>
          </label>
        </div>

        {/* CHOOSE DATE */}
        <div className="form-floating mb-3">
          <input
            type="date"
            placeholder="Ismi"
            className="form-control"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            onKeyDown={(e) => {
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
