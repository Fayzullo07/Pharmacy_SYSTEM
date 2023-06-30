import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { firmaPatchAction } from "../../../../../functions/DirectorActions";
import {
  checkPhoneNumber,
  cleanedData
} from "../../../../../functions/NecessaryFunctions";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";

const UpdateFirma = props => {
  const { showModal, setShowModal, data } = props;

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: data.name,
    phone_number1: data.phone_number1,
    address: data.address,
    is_favorite: data.is_favorite,
    desc: data.desc
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == "name" && value.length > 50) {
      return;
    }

    if (name == "address" && value.length > 50) {
      return;
    }

    if (name == "phone_number1" && value.length > 13) {
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
      return firmaPatchAction(data.id, cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("firms");
        dispatch(getGlobalDeteilsAction());
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.name) {
      toast.warning("Firma nomini kiriting !");
      return;
    }

    if (checkPhoneNumber(formData.phone_number1)) {
      toast.warning("Telefon raqamni tog'ri kiriting +998 9? 111 22 33 !");
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
            placeholder="Nomi"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Firma nomi <b className="text-danger">*</b>
          </label>
        </div>

        {/* PHONE 1 */}
        <div className="form-floating mb-3">
          <input
            type="tel"
            placeholder="Telefon raqam kiriting"
            className="form-control"
            name="phone_number1"
            value={formData.phone_number1}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Telefon raqam kiriting <b className="text-danger">*</b>
          </label>
        </div>

        <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded py-3 p-1 mb-3">
          <input
            className="form-check-input mx-1"
            type="checkbox"
            checked={formData.is_favorite}
            onClick={() =>
              setFormData({ ...formData, is_favorite: !formData.is_favorite })}
          />
          <b className={formData.is_favorite ? "text-success" : "text-danger"}>
            Faol
          </b>
        </div>

        {/* ADDRESS */}
        <div className="form-floating mb-3">
          <input
            type="text"
            placeholder="Manzil"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>Manzil </label>
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
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateFirma;
