import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  checkPhoneNumber,
  cleanedData
} from "../../../../../functions/NecessaryFunctions";
import { pharmacyToDebtsPatchAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";

const UpdateTradeToDebt = props => {
  const { showModal, setShowModal, data } = props;
  const [formData, setFormData] = useState({
    second_name: data.second_name,
    phone_number: data.phone_number,
    price: data.price,
    desc: data.desc,
    to_who: data.to_who
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "to_who" && value.length > 50) {
      return;
    }

    if (name === "second_name" && value.length > 50) {
      return;
    }

    if (name === "price" && value.length > 9) {
      return;
    }

    if (name === "desc" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: value });
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
        queryClient.invalidateQueries("to_debts_trade"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("to_debts_trade_list");
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.second_name || formData.second_name.length < 2) {
      toast.warning("Mahsulot nomini kiriting eng kami 2ta harf!");
      return;
    }

    if (!formData.to_who || formData.to_who.length < 3) {
      toast.warning("Kimga qarz berildi kiriting eng kami 3ta harf!");
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
      title={"O'zgartirish"}
    >
      <div className="modal-body">
        {/* DEBT FOR WHO */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Kimga qarz berildi"
            name="to_who"
            value={formData.to_who}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Kimga qarz berildi <b className="text-danger">*</b>
          </label>
        </div>

        {/* NAME PRODUCT */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Maxsulot nomi"
            name="second_name"
            value={formData.second_name}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Maxsulot nomi <b className="text-danger">*</b>
          </label>
        </div>

        {/* MONEY DEBTS*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Miqdor"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label htmlFor="price">
            Miqdor <b className="text-danger">*</b>
          </label>
        </div>

        {/* PHONE NUMBER */}
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Telefon"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Telefon <b className="text-danger">*</b>
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

export default UpdateTradeToDebt;
