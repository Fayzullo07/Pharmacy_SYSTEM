import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { aptekaPostAction } from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";

const AddApteka = (props) => {
  const { showModal, setShowModal } = props;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    desc: "",
    last_shift_end_hour: 0,
  });

  const handleInputChange = (e) => {
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
      return aptekaPostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("apteka");
        dispatch(getGlobalDeteilsAction());
      },
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
    >
      <div className="modal-body">
        {/* NAME */}
        <div className="mb-3 form-floating">
          <input
            type="text"
            placeholder="Filial nomi"
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
            Filial nomi <b className="text-danger">*</b>
          </label>
        </div>

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
        <div className="mb-3 form-floating">
          <input
            type="text"
            placeholder="Manzil"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>Manzil</label>
        </div>

        {/* IZOH */}
        <div className="form-floating mb-3">
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Izoh"
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddApteka;
