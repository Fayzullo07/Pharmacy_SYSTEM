import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { naxt } from "../../../../../api";
import {
  checkPhoneNumber,
  cleanedData
} from "../../../../../functions/NecessaryFunctions";
import { pharmacyToDebtsPostAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";
import TextInput from "../../../../../ui/TextInput";
import NumberInput from "../../../../../ui/NumberInput";
import PhoneInput from "../../../../../ui/PhoneInput";

const AddToDebt = props => {
  const { showModal, setShowModal, is_client, getData } = props;
  const [formData, setFormData] = useState({
    phone_number: "+998",
    price: null,
    desc: "",
    to_who: "",
    is_client: is_client,
    transfer_type: naxt,
    report_date: getData.report_date,
    shift: getData.shift,
    from_pharmacy: getData.to_pharmacy
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
      return pharmacyToDebtsPostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("to_debts"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("to_debts_list"); // Ma'lumotlarni yangilash
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.to_who || formData.to_who.length < 3) {
      toast.warning("Kimga qarz berganingizni kiriting eng kami 3ta harf!");
      return;
    }
    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (checkPhoneNumber(formData.phone_number)) {
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
      title={"Qarz berish"}
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

export default AddToDebt;
