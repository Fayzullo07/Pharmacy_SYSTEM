import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { transfersTypesPostAction } from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/hodimActions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";

const AddIncome = (props) => {
  const { showModal, setShowModal } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "" });

  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "name" && value.length > 30) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  const mutation = useMutation(
    async () => {
      return transfersTypesPostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transfer");
        dispatch(getGlobalDeteilsAction());
      },
    }
  );

  const handleSubmit = () => {
    if (!formData.name) {
      toast.warning("O'tkazma turi nomi kiriting !");
      return;
    }

    mutation.mutate();
  };
  return (
    <Modal
      setShowModal={setShowModal}
      showModal={showModal}
      mutation={mutation}
      handleSubmit={handleSubmit}
    >
      <div className="modal-body">
        {/* NAME */}
        <div className="form-floating mb-3">
          <input
            type="text"
            placeholder="O'tkazma nomi"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            O'tkazma nomi <b className="text-danger">*</b>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default AddIncome;
