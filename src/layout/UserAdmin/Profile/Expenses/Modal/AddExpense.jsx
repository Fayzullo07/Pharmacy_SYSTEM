import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmacyExpensesTypesPostAction } from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import { useDispatch } from "react-redux";
import Modal from "../../../../../utils/Modal";

const AddExpense = (props) => {
  const { showModal, setShowModal } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
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
      return pharmacyExpensesTypesPostAction(
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

  const handleSubmit = (e) => {
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
    >
      <div className="modal-body">
        <div class="col-md-12">
          {/* NAME */}
          <div className="form-floating mb-3">
            <input
              type="tel"
              placeholder="Xarajat turi"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              required
            />
            <label className="form-label">
              Xarajat nomi <b className="text-danger">*</b>
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddExpense;
