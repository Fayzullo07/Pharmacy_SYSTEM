import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { firmsReturnsVerifyPostAction } from "../../../../../../functions/GlobalActions";
import {
  cleanedData,
  formatNumber,
} from "../../../../../../functions/NecessaryFunctions";
import ModalSimple from "../../../../../../utils/ModalSimple";

const ViewModalSMS = (props) => {
  const { showModal, setShowModal, firm_return_id } = props;
  const [formData, setFormData] = useState({
    code: "",
    firm_return_id: firm_return_id.id,
  });

  const queryClient = useQueryClient();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "code" && value.length > 5) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation(
    async () => {
      return firmsReturnsVerifyPostAction(
        cleanedData({ ...formData, code: Number(formData.code) }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("firm_returns"); // Ma'lumotlarni yangilash
      },
    }
  );

  const handleSubmit = () => {
    if (!formData.code || formData.code.length < 5) {
      toast.warning("SMS Parolni to'g'ri kiriying!");
      return;
    }
    mutation.mutate();
  };
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={"Tasdiqlash"}
    >
      <div className="modal-body">
        <h5>
          Telefon nomer{" "}
          <span className="mx-2 text-muted">
            {firm_return_id.verified_phone_number}
          </span>
        </h5>
        <hr />
        <h5>
          F.I.O{" "}
          <span className="mx-2 text-muted">
            {firm_return_id.verified_firm_worker_name}
          </span>
        </h5>
        <hr />
        <h5>
          Berilgan summa{" "}
          <span className="mx-2 text-muted">
            {formatNumber(firm_return_id.price)}
          </span>
        </h5>
        <hr />

        {/* CODE */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control bg-light"
            placeholder="SMS kodini kiriting"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label htmlFor="code">
            SMS kodini kiriting <b className="text-danger">*</b>
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <div className="d-grid d-flex justify-content-evenly col-12 ">
          <button
            className="btn btn-primary rounded-3 col-5 col-md-4 py-2"
            style={{ background: "red" }}
            onClick={() => setShowModal(false)}
          >
            Bekor qilish
          </button>
          <button
            className="btn btn-primary rounded-3 col-5 col-md-4 py-2"
            style={{ background: "#2A80B9" }}
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <i className="fa fa-spinner fa-spin" />
            ) : (
              "Tasdiqlash"
            )}
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default ViewModalSMS;
