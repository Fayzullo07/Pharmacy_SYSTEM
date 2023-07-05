import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { pharmacyExpensesTypesPatchAction } from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";
import TextInput from "../../../../../ui/TextInput";

const UpdateExpense = props => {
  const { showModal, setShowModal, data } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: data.name
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
      }
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
        <TextInput
          name={"name"}
          value={formData.name}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Xarajat nomi"}
        />
      </div>
    </Modal>
  );
};

export default UpdateExpense;
