import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmacyExpensesTypesPatchAction } from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";

const UpdateExpense = (props) => {
  const { showModal, setShowModal, data } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: data.name,
  });

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
      return pharmacyExpensesTypesPatchAction(
        data.id,
        cleanedData(formData),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses");
        dispatch(getGlobalDeteilsAction());
      },
    }
  );

  const handleSubmit = () => {
    if (!formData.name) {
      toast.warning("Xarajat turini kiriting !");
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
      title={"O'zgartirish"}
    >
      <div className="modal-body">
        {/* NAME */}
        <div className="form-floating mb-3">
          <input
            type="text"
            placeholder="Xarajat turi"
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
            Xarajat nomi <b className="text-danger">*</b>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateExpense;
