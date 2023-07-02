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

    if (name === "desc" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: value });
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

export default AddToDebt;
