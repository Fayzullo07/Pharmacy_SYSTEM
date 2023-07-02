import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { clientPostAction } from "../../../../../functions/GlobalActions";
import {
  checkPhoneNumber,
  cleanedData,
  tekshirish3
} from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import Textarea from "../../../../../ui/Textarea";
import Modal from "../../../../../utils/Modal";
import PhoneInput from "../../../../../ui/PhoneInput";
import NumberInput from "../../../../../ui/NumberInput";
import TextInput from "../../../../../ui/TextInput";
import DateInput from "../../../../../ui/DateInput";

const AddClient = props => {
  const { showModal, setShowModal } = props;
  const [formData, setFormData] = useState({
    first_name: "",
    phone_number1: "+998",
    total_amount: "",
    birthdate: null,
    bio: ""
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
      return clientPostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
      }
    }
  );

  const handleSubmit = () => {
    if (!tekshirish3(formData.first_name)) {
      toast.warning("F.I.O !");
      return;
    }

    if (!formData.birthdate) {
      toast.warning("Tugilgan kun kiriting!");
      return;
    }

    if (formData.total_amount < 100) {
      toast.warning("Eng kam summa 100 so'm!");
      return;
    }

    if (checkPhoneNumber(formData.phone_number1)) {
      toast.warning("Telefon raqamni to'gri kiriting +998 99 111 22 33 !");
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

export default AddClient;
