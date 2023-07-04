import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { workerPostAction } from "../../../../../functions/DirectorActions";
import { toast } from "react-toastify";
import {
  checkPhoneNumber,
  cleanedData
} from "../../../../../functions/NecessaryFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";

const AddWorker = props => {
  const { showModal, setShowModal } = props;
  const deteils = useSelector(state => state.deteils.deteils);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "+998",
    pharmacy: "",
    is_main_worker: false,
    shift: "",
    password: "",
    re_password: "",
    wage: "",
    address: "",
    is_active: true,
    bio: "",
    father_name: ""
  });

  const queryClient = useQueryClient();

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == "first_name" && value.length > 50) {
      return;
    }

    if (name == "last_name" && value.length > 50) {
      return;
    }

    if (name == "father_name" && value.length > 50) {
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

    if (name == "address" && value.length > 50) {
      return;
    }

    if (name == "wage" && value.length > 9) {
      return;
    }

    if (name == "bio" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: e.target.value });
  };

  const mutation = useMutation(
    async () => {
      return workerPostAction(
        cleanedData({
          ...formData,
          last_name: `${formData.last_name} ${formData.father_name}`
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workers");
        dispatch(getGlobalDeteilsAction());
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.first_name || !formData.last_name) {
      toast.warning("Ism Familiyani kiriting !");
      return;
    }

    if (!formData.father_name) {
      toast.warning("Otasini Ismini kiriting !");
      return;
    }

    if (checkPhoneNumber(formData.phone_number)) {
      toast.warning("Telefon raqamini to'g'ri kitriting +998 9? 111 22 33");
      return;
    }

    if (!formData.pharmacy) {
      toast.warning("Filial tanlang !");
      return;
    }

    if (!formData.shift) {
      toast.warning("Smena tanlang !");
      return;
    }

    if (!formData.wage) {
      toast.warning("Ish haqini kiriting !");
      return;
    }

    if (!formData.password) {
      toast.warning("Parolni kiriting !");
      return;
    }

    if (formData.password != formData.re_password) {
      toast.warning("Parolni bir xil kiriting!");
      return;
    }
    mutation.mutate();
  };

  return (
    <Modal
      setShowModal={setShowModal}
      showModal={showModal}
      mutation={mutation}
      handleSubmit={handleSubmit}
    >
      <div className="modal-body">
        <div className="row">
          <div className="col-md-4">
            {/* FIRST NAME */}
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Ismi"
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Ismi <b className="text-danger">*</b>
              </label>
            </div>
          </div>
          <div className="col-md-4">
            {/* LAST NAME */}
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Familiya"
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Familiya <b className="text-danger">*</b>
              </label>
            </div>
          </div>

          <div className="col-md-4">
            {/* FATHER NAME */}
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="O'tasini ismi"
                className="form-control"
                name="father_name"
                value={formData.father_name}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Otasini ismi <b className="text-danger">*</b>
              </label>
            </div>
          </div>

          <div className="col-md-4">
            {/* PHONE */}
            <div className="mb-3 form-floating">
              <input
                type="tel"
                placeholder="Telefon"
                className="form-control"
                name="phone_number"
                pattern={`^\+998\d{9}$`}
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
          </div>
          <div className="col-md-4">
            {/* PHARMACY */}
            <div className="form-floating">
              <select
                className="form-select mb-3"
                aria-label="Default select example"
                name="pharmacy"
                value={formData.pharmacy}
                onChange={handleInputChange}
              >
                <option>Filialni tanlang. . .</option>
                {deteils.pharmacies.map((item, index) =>
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                )}
              </select>
              <label>
                Filialni tanlang <b className="text-danger">*</b>
              </label>
            </div>
          </div>
          <div className="col-md-4">
            {/* SHIFT */}
            <div className="form-floating">
              <select
                className="form-select mb-3"
                name="shift"
                value={formData.shift}
                onChange={handleInputChange}
              >
                <option selected>Smena tanlang. . .</option>
                <option value={1}>Smena 1</option>
                <option value={2}>Smena 2</option>
                <option value={3}>Smena 3</option>
              </select>
              <label>
                Smena tanlang <b className="text-danger">*</b>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {/* CHECKBOX USER */}
            <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded py-3 p-1 mb-3">
              <b
                className={
                  formData.is_main_worker ? "text-success" : "text-danger"
                }
              >
                Asosiy xodim sifatida belgilash
              </b>
              <input
                className="form-check-input mx-1"
                type="checkbox"
                checked={formData.is_main_worker}
                value={formData.is_main_worker}
                onClick={() =>
                  setFormData({
                    ...formData,
                    is_main_worker: !formData.is_main_worker
                  })}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* CHECKBOX USER */}
            <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded py-3 p-1 mb-3">
              <b
                className={formData.is_active ? "text-success" : "text-danger"}
              >
                Active
              </b>
              <input
                className="form-check-input mx-1"
                type="checkbox"
                checked={formData.is_active}
                value={formData.is_active}
                onClick={() =>
                  setFormData({ ...formData, is_active: !formData.is_active })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* PASSWORD */}
            <div className="form-floating mb-3">
              <input
                type="password"
                placeholder="Parol"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Parol <b className="text-danger">*</b>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {/* PASSWORD CHECK */}
            <div className="mb-3 form-floating">
              <input
                type="password"
                placeholder="Parolni qaytadan kiriting"
                className="form-control"
                name="re_password"
                value={formData.re_password}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Parolni qaytadan kiriting <b className="text-danger">*</b>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {/* WAGE */}
            <div className="mb-3 form-floating">
              <input
                type="number"
                placeholder="Ish haqi"
                className="form-control"
                name="wage"
                value={formData.wage}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                Ish haqi <b className="text-danger">*</b>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {/* ADDRESS */}
            <div className="mb-3 form-floating">
              <input
                type="text"
                placeholder="Manzil"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>Manzil</label>
            </div>
          </div>
        </div>

        {/* IZOH */}
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

export default AddWorker;
