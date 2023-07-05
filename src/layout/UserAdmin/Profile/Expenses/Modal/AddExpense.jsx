import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmacyExpensesTypesPostAction } from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import { useDispatch } from "react-redux";
import Modal from "../../../../../utils/Modal";
import TextInput from "../../../../../ui/TextInput";

const AddExpense = props => {
  const { showModal, setShowModal } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: ""
  });

  const queryClient = useQueryClient();

  const handleInputChange = e => {
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
      }
    }
  );

  const handleSubmit = e => {
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
          <TextInput
            name={"name"}
            value={formData.name}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isRequired={true}
            placeholder={"Xarajat nomi"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddExpense;
