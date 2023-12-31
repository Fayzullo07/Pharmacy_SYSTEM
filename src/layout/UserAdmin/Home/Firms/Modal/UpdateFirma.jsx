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
import TextInput from "../../../../../ui/TextInput";
import PhoneInput from "../../../../../ui/PhoneInput";
import Textarea from "../../../../../ui/Textarea";
import { useTranslation } from "react-i18next";

const UpdateFirma = ({ showModal, setShowModal, data }) => {
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

    if (name === "phone_number1") {
      if (value.length > 13) {
        return;
      } else {
        e.target.value = value.slice(0, 13);
        if (typeof value === "string") {
          // Raqam matn (string) turida kiritilgan
          e.target.value = value.replace(/[^0-9+]|(?<=^[\s\S]*?\+)[+]+/g, "");
        }
      }
    }

    if (name == "desc" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: e.target.value });
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

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const handleSubmit = () => {
    if (!formData.name) {
      toast.warning(g(4));
      return;
    }

    if (checkPhoneNumber(formData.phone_number1)) {
      toast.warning(g(34));
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
        <div className="row">
          <div className="col-md-6 col-12">
            {/* NAME */}
            <TextInput
              name={"name"}
              value={formData.name}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              placeholder={"Firma nomi"}
              isRequired={true}
            />
          </div>
          <div className="col-md-6 col-12">
            {/* PHONE 1 */}
            <PhoneInput
              name={"phone_number1"}
              value={formData.phone_number1}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
            />
          </div>
          <div className="col-md-6 col-12 ">
            <div className="form-check form-switch d-flex justify-content-between align-item-center p-2 border rounded py-3 p-1 mb-3">
              <input
                className="form-check-input mx-1"
                type="checkbox"
                checked={formData.is_favorite}
                onClick={() =>
                  setFormData({
                    ...formData,
                    is_favorite: !formData.is_favorite
                  })}
              />
              <b
                className={
                  formData.is_favorite ? "text-success" : "text-danger"
                }
              >
                {g(8)}
              </b>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <TextInput
              name={"address"}
              value={formData.address}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              placeholder={"Manzil"}
            />
          </div>
        </div>

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

export default UpdateFirma;
