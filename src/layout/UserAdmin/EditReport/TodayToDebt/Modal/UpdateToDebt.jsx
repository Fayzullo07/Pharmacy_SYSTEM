import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { pharmacyToDebtsPatchAction } from "../../../../../functions/DirectorActions";
import {
  checkPhoneNumber,
  cleanedData
} from "../../../../../functions/NecessaryFunctions";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";
import PhoneInput from "../../../../../ui/PhoneInput";
import NumberInput from "../../../../../ui/NumberInput";
import TextInput from "../../../../../ui/TextInput";
import { useTranslation } from "react-i18next";

const UpdateToDebt = ({ showModal, setShowModal, data }) => {
  const [formData, setFormData] = useState({
    phone_number: data.phone_number,
    price: data.price,
    desc: data.desc,
    to_who: data.to_who,
    transfer_type: data.transfer_type
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "to_who" && value.length > 50) {
      return;
    }

    if (name === "price" && value.length > 9) {
      return;
    }

    if (name === "phone_number") {
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

    if (name === "desc" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return pharmacyToDebtsPatchAction(
        data.id,
        cleanedData(formData),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("to_debts"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("to_debts_list");
        queryClient.invalidateQueries("to_debts_repay");
      }
    }
  );

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });

  const handleSubmit = () => {
    if (!formData.to_who) {
      toast.warning(m(35));
      return;
    }
    if (formData.price < 100) {
      toast.warning(g(33));
      return;
    }

    if (checkPhoneNumber(formData.phone_number)) {
      toast.warning(g(34));
      return;
    }
    mutation.mutate();
  };
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      mutation={mutation}
      handleSubmit={handleSubmit}
      title={"O'zgartirish"}
    >
      <div className="modal-body">
        {/* DEBT FOR WHO */}
        <TextInput
          name={"to_who"}
          value={formData.to_who}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Kimga qarz berildi"}
        />

        {/* MONEY DEBTS*/}
        <NumberInput
          name={"price"}
          value={formData.price}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Qarz summasi"}
        />

        {/* PHONE NUMBER */}
        <PhoneInput
          name={"phone_number"}
          value={formData.phone_number}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
        />

        {/* BIO */}
        <Textarea
          value={formData.desc}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default UpdateToDebt;
