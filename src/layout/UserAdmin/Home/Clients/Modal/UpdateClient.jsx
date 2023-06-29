import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { clientPatchAction } from "../../../../../functions/GlobalActions";
import {
  checkPhoneNumber,
  cleanedData,
  tekshirish3,
} from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import { today } from "../../../../../api";
import Modal from "../../../../../utils/Modal";

const UpdateClient = (props) => {
  const { showModal, setShowModal, data } = props;
  const [formData, setFormData] = useState({
    first_name: data.first_name,
    phone_number1: data.phone_number1,
    total_amount: data.total_amount,
    birthdate: data.birthdate.split(".").reverse().join("-"),
    bio: data.bio,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "first_name" && value.length > 50) {
      return;
    }

    if (name === "total_amount" && value.length > 9) {
      return;
    }

    if (name === "bio" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return clientPatchAction(data.id, cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("clients");
      },
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

    if (checkPhoneNumber(formData.phone_number1)) {
      toast.warning("Telefon raqamni to'gri kiriting +998 99 111 22 33 !");
      return;
    }

    if (formData.total_amount < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
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
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="F.I.O"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            F.I.O <b className="text-danger">*</b>
          </label>
        </div>

        {/* BIRTHDATE */}
        <div className="form-floating mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="Tug'ilgan kun"
            name="birthdate"
            max={today}
            value={formData.birthdate}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Tug'ilgan kun <b className="text-danger">*</b>
          </label>
        </div>

        {/* PHONE 1 */}
        <div className="form-floating mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Telefon"
            name="phone_number1"
            value={formData.phone_number1}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Telefon <b className="text-danger">*</b>
          </label>
        </div>

        {/* TOTAL AMOUNT */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Summa"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Mahsulot summasi <b className="text-danger">*</b>
          </label>
        </div>

        {/* BIO */}
        <div className="form-floating mb-3">
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Izoh"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateClient;
