import React, { useState } from "react";
import {
  naxt,
  today,
  transfers,
  transfersWorker,
  xisob_raqam,
} from "../../../../../api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { pharmacyDebtsPostAction } from "../../../../../functions/DirectorActions";
import {
  checkPhoneNumber,
  cleanedData,
  tekshirish3,
} from "../../../../../functions/NecessaryFunctions";
import { firmsExpenseDebtPostAction } from "../../../../../functions/GlobalActions";
import Modal from "../../../../../utils/Modal";

const AddExPenseToFirm = ({
  showModal,
  setShowModal,
  deteils,
  setFirmExpenseId,
  setViewModal,
  getData,
  curData,
}) => {
  let director = null;
  deteils.employees.map((user) => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });

  const queryClient = useQueryClient();

  const [moveMoney, setMoveMoney] = useState(false);

  const [formData, setFormData] = useState({
    price: "",
    from_user_price: "",
    desc: "",
    verified_phone_number: "",
    verified_firm_worker_name: "",
    transfer_type: naxt,
    from_user: null,
    to_firm: curData.id,
    shift: getData.shift,
    from_pharmacy: getData.to_pharmacy,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" && value.length > 9) {
      return;
    }

    if (name === "desc" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const mutationToFirm = useMutation(
    async () => {
      return firmsExpenseDebtPostAction(
        cleanedData({
          ...formData,
        }),
        setViewModal,
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_to_firm"); // Ma'lumotlarni yangilash
      },
    }
  );

  const handleSubmit = () => {
    if (
      !tekshirish3(formData.verified_firm_worker_name) &&
      formData.transfer_type != xisob_raqam
    ) {
      toast.warning("Qabul qiluvchi F.I.O!");
      return;
    }

    if (
      checkPhoneNumber(formData.verified_phone_number) &&
      formData.transfer_type != xisob_raqam
    ) {
      toast.warning(
        "Qabul qiluvchi telefon raqamini to'gri kiriting +998 9? 111 22 33 !"
      );
      return;
    }

    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    mutationToFirm.mutate();
  };
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      mutation={mutationToFirm}
      handleSubmit={handleSubmit}
      title={curData.name}
    >
      <div className="modal-body">
        <div className="row">
          <div className="col-md-6">
            {/* TRANSFER TYPE */}
            <div className="form-floating">
              <select
                className="form-select mb-3"
                id="transfer_type"
                name="transfer_type"
                value={formData.transfer_type}
                onChange={handleInputChange}
              >
                <option value={naxt}>NAXT</option>
                <option value={2}>NAXT PULSIZ</option>
              </select>
              <label htmlFor="transfer_type">
                To'lov turini tanlang <b className="text-danger">*</b>
              </label>
            </div>
          </div>

          <div className="col-md-6">
            {!moveMoney && (
              // CLICK KIMGA TASHLANADI
              <div className="form-floating">
                <select
                  className={`form-select mb-3`}
                  id="from_user"
                  name="from_user"
                  value={formData.from_user}
                  onChange={handleInputChange}
                  disabled={formData.transfer_type == 2}
                >
                  {formData.transfer_type == naxt && (
                    <option value="">Kassadan</option>
                  )}
                  <option value={director.id}>
                    Rahbar - {director.first_name} {director.last_name}
                  </option>
                </select>
                <label htmlFor="from_user">
                  Pul kimdan berildi <b className="text-center">*</b>
                </label>
              </div>
            )}
          </div>

          <div className="col-md-6">
            {/* NAME WHO TAKE */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Qabul qiluvchi ismi"
                id="verified_firm_worker_name"
                name="verified_firm_worker_name"
                value={formData.verified_firm_worker_name}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label htmlFor="verified_firm_worker_name">
                Qabul qiluvchi F.I.O <b className="text-danger">*</b>
              </label>
            </div>
          </div>

          <div className="col-md-6">
            {/* PHONE WHO TAKE */}
            <div className="form-floating mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Qabul qiluvchining telefon nomeri"
                id="verified_phone_number"
                name="verified_phone_number"
                value={formData.verified_phone_number}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label htmlFor="verified_phone_number">
                Qabul qiluvchining telefon nomeri{" "}
                <b className="text-danger">*</b>
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row">
              <div className="col">
                {/* MONEY INCOMES*/}
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Berilgan summa"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                  <label htmlFor="price">
                    Berilgan summa <b className="text-danger">*</b>
                  </label>
                </div>
              </div>
              <div className="col">
                {/* MONEY INCOMES*/}
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Berilgan summa"
                    id="from_user_price"
                    name="from_user_price"
                    value={formData.from_user_price}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                  <label htmlFor="from_user_price">
                    Berilgan summa <b className="text-danger">*</b>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            {/* BIO */}
            <div className="form-floating mb-3">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Izoh"
                  name="desc"
                  value={formData.desc}
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
        </div>
      </div>
    </Modal>
  );
};

export default AddExPenseToFirm;
