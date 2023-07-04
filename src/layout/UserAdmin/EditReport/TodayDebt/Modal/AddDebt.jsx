import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Naqd, Naqd_siz, naxt } from "../../../../../api";
import {
  checkPhoneNumber,
  cleanedData
} from "../../../../../functions/NecessaryFunctions";
import { pharmacyDebtsPostAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";
import TextInput from "../../../../../ui/TextInput";
import NumberInput from "../../../../../ui/NumberInput";
import PhoneInput from "../../../../../ui/PhoneInput";

const AddDebt = props => {
  const { showModal, setShowModal, getData } = props;
  const [formData, setFormData] = useState({
    price: null,
    desc: "",
    from_who: "",
    phone_number: "+998",
    transfer_type: naxt,
    report_date: getData.report_date,
    shift: getData.shift,
    to_pharmacy: getData.to_pharmacy
  });

  const queryClient = useQueryClient();

  const handleInputChange = e => {
    const { name, value } = e.target;

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

  const mutation = useMutation(
    async () => {
      return pharmacyDebtsPostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("debts"); // Ma'lumotlarni yangilash
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.from_who) {
      toast.warning("Kimga qarz berganingiz ismini kiriting!");
      return;
    }
    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (checkPhoneNumber(formData.phone_number)) {
      toast.warning("Telefon raqamni to'gri kiriting +998 9? 111 22 33 !");
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
      title={"Kimdan qarz olindi"}
    >
      <div className="modal-body">
        {/* TAKE DEBT FROM WHO */}
        <TextInput
          name={"from_who"}
          value={formData.from_who}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Kimgdan qarz olindi"}
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

        {/* PHONE */}
        <PhoneInput
          name={"phone_number"}
          value={formData.phone_number}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
        />

        {/* TRANSFER TYPE */}
        <div className="form-floating">
          <select
            className="form-select mb-3"
            id="transfer_type"
            name="transfer_type"
            value={formData.transfer_type}
            onChange={handleInputChange}
          >
            <option value={naxt}>{Naqd}</option>
            <option value={2}>{Naqd_siz}</option>
          </select>
          <label htmlFor="transfer_type">
            To'lov turini tanlang <b className="text-danger">*</b>
          </label>
        </div>

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

export default AddDebt;
