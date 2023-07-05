import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { aptekaPatchAction } from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";
import TextInput from "../../../../../ui/TextInput";
import Textarea from "../../../../../ui/Textarea";

const UpdateApteka = props => {
  const { showModal, setShowModal, data } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: data.name,
    address: data.address,
    desc: data.desc,
    last_shift_end_hour: data.last_shift_end_hour
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == "name" && value.length > 50) {
      return;
    }

    if (
      (name == "last_shift_end_hour" && Number(value) < 0) ||
      Number(value) > 24
    ) {
      return;
    }

    if (name == "address" && value.length > 50) {
      return;
    }

    if (name == "desc" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return aptekaPatchAction(data.id, cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("apteka");
        dispatch(getGlobalDeteilsAction());
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.name) {
      toast.warning("Filial nomini kiriting !");
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
          placeholder={"Filial nomi"}
        />

        {/* DATE */}
        <div className="mb-3">
          <label for="basic-url" className="form-label">
            Filial 00:00 gacha ishlaydimi? Agar yo'q bo'lsa, ish kuni qachon
            tugashini kiriting. <b className="text-danger">*</b>
          </label>
          <div className="input-group">
            <select
              name="last_shift_end_hour"
              value={formData.last_shift_end_hour}
              onChange={handleInputChange}
              className="form-select form-select-lg mb-3"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
        </div>

        {/* ADDRESS */}
        <TextInput
          name={"address"}
          value={formData.address}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          placeholder={"Manzil"}
        />

        {/* IZOH */}
        <Textarea
          value={formData.desc}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default UpdateApteka;
