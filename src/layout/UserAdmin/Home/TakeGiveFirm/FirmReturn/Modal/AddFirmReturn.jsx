import React, { useState } from "react";
import Modal from "../../../../../../utils/Modal";
import { useMutation, useQueryClient } from "react-query";
import {
  checkPhoneNumber,
  cleanedData,
  tekshirish3
} from "../../../../../../functions/NecessaryFunctions";
import { firmsReturnPostAction } from "../../../../../../functions/GlobalActions";
import { toast } from "react-toastify";
import Textarea from "../../../../../../ui/Textarea";
import TextInput from "../../../../../../ui/TextInput";
import NumberInput from "../../../../../../ui/NumberInput";
import PhoneInput from "../../../../../../ui/PhoneInput";

const AddFirmReturn = ({
  showModal,
  setShowModal,
  curData,
  setViewModal,
  setFirmReturnId
}) => {
  const [formData, setFormData] = useState({
    price: "",
    desc: "",
    second_name: "",
    verified_phone_number: "+998",
    verified_firm_worker_name: "",
    firm_income: curData.id
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == "second_name" && value.length > 50) {
      return;
    }

    if (name == "price" && curData.remaining_debt < Number(value)) {
      return;
    }

    if (name == "verified_firm_worker_name" && value.length > 50) {
      return;
    }

    if (name === "verified_phone_number") {
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
      return firmsReturnPostAction(
        cleanedData(formData),
        setViewModal,
        setShowModal,
        setFirmReturnId
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("firms_incomes");
      }
    }
  );
  const handleSubmit = () => {
    if (!formData.second_name) {
      toast.warning("Qaytarilgan mahsulot nomini kiriting !");
      return;
    }

    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 so'm");
      return;
    }

    if (!tekshirish3(formData.verified_firm_worker_name)) {
      toast.warning("F.I.O !");
      return;
    }

    if (checkPhoneNumber(formData.verified_phone_number)) {
      toast.warning("Telefon raqamni to'gri kiriting +998 99 111 22 33 !");
      return;
    }

    mutation.mutate();
  };
  return (
    <Modal
      title={"Firmaga qaytarilgan mahsulot"}
      showModal={showModal}
      setShowModal={setShowModal}
      mutation={mutation}
      handleSubmit={handleSubmit}
    >
      <div className="modal-body">
        <div className="row">
          {/* NAME */}
          <div className="col-md-6">
            <TextInput
              name={"second_name"}
              value={formData.second_name}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Mahsulot nomi"}
            />
          </div>
          <div className="col-md-6">
            {/* PRICE */}
            <NumberInput
              name={"price"}
              value={formData.price}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Mahsulot summasi"}
            />
          </div>

          <div className="col-md-6">
            <TextInput
              name={"verified_firm_worker_name"}
              value={formData.verified_firm_worker_name}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Qabul qiluvchi F.I.O"}
            />
          </div>

          <div className="col-md-6">
            {/* PHONE */}
            <PhoneInput
              name={"verified_phone_number"}
              value={formData.verified_phone_number}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Qabul qiluvchining telefon nomeri"}
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

export default AddFirmReturn;
