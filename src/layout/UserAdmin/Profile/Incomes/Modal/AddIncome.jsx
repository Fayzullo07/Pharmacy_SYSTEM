import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { transfersTypesPostAction } from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";
import TextInput from "../../../../../ui/TextInput";

const AddIncome = props => {
  const { showModal, setShowModal } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: "" });

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
      return transfersTypesPostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transfer");
        dispatch(getGlobalDeteilsAction());
      }
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
        <TextInput
          name={"name"}
          value={formData.name}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Tushum nomi"}
        />
      </div>
    </Modal>
  );
};

export default AddIncome;
