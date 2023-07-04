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
    verified_phone_number: "",
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
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Mahsulot nomi"
                className="form-control"
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
                Mahsulot nomi <b className="text-danger">*</b>
              </label>
            </div>
          </div>

          {/* PRICE */}
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="number"
                placeholder="Miqdor"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Miqdor <b className="text-danger">*</b>{" "}
              </label>
            </div>
          </div>

          {/* DEADLINE DATE */}
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Qabul qiluvchi ismi"
                className="form-control"
                name="verified_firm_worker_name"
                value={formData.verified_firm_worker_name}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Qabul qiluvchi ismi <b className="text-danger">*</b>
              </label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="tel"
                placeholder="Qabul qiluvchi telefon nomeri"
                className="form-control"
                name="verified_phone_number"
                value={formData.verified_phone_number}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Qabul qiluvchi telefon nomeri <b className="text-danger">*</b>
              </label>
            </div>
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
