import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { clientPatchAction } from "../../../../../functions/GlobalActions";
import {
  checkPhoneNumber,
  cleanedData,
  tekshirish3
} from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";
import PhoneInput from "../../../../../ui/PhoneInput";
import NumberInput from "../../../../../ui/NumberInput";
import TextInput from "../../../../../ui/TextInput";
import DateInput from "../../../../../ui/DateInput";
import { useTranslation } from "react-i18next";

const UpdateClient = props => {
  const { showModal, setShowModal, data } = props;
  const [formData, setFormData] = useState({
    first_name: data.first_name,
    phone_number1: data.phone_number1,
    total_amount: data.total_amount,
    birthdate: data.birthdate.split(".").reverse().join("-"),
    bio: data.bio
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "first_name" && value.length > 50) {
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

    if (name === "total_amount" && value.length > 9) {
      return;
    }

    if (name === "bio" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return clientPatchAction(data.id, cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
      }
    }
  );

  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
   const handleSubmit = () => {
     if (!tekshirish3(formData.first_name)) {
       toast.warning(m(18));
       return;
     }

     if (!formData.birthdate) {
       toast.warning(m(0));
       return;
     }

     if (formData.total_amount < 100) {
       toast.warning(g(33));
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
      showModal={showModal}
      setShowModal={setShowModal}
      mutation={mutation}
      handleSubmit={handleSubmit}
      title={"O'zgartirish"}
    >
      <div className="modal-body">
        {/* F.I.O */}
        <TextInput
          name={"first_name"}
          value={formData.first_name}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"F.I.O"}
        />

        {/* BIRTHDATE */}
        <DateInput
          name={"birthdate"}
          value={formData.birthdate}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Tug'ilgan kuni"}
        />

        {/* PHONE 1 */}
        <PhoneInput
          name={"phone_number1"}
          value={formData.phone_number1}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
        />

        {/* TOTAL AMOUNT */}
        <NumberInput
          name={"total_amount"}
          value={formData.total_amount}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Mahsulot summasi"}
        />

        {/* BIO */}
        <Textarea
          name={"bio"}
          value={formData.bio}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default UpdateClient;
