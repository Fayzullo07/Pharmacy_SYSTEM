import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { managerPostAction } from "../../../../../functions/DirectorActions";
import {
  checkPhoneNumber,
  cleanedData
} from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";

const AddManager = props => {
  const { showModal, setShowModal } = props;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "+998",
    password: "",
    re_password: "",
    address: "",
    is_active: true,
    bio: "",
    father_name: ""
  });

  const queryClient = useQueryClient();

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == "first_name" && value.length > 20) {
      return;
    }

    if (name == "last_name" && value.length > 20) {
      return;
    }

    if (name == "father_name" && value.length > 30) {
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

    if (name == "bio" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: e.target.value });
  };

  const mutation = useMutation(
    async () => {
      return managerPostAction(
        cleanedData({
          ...formData,
          last_name: `${formData.last_name} ${formData.father_name}`
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("managers");
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.first_name || !formData.last_name) {
      toast.warning("Ism Familiyani kiriting !");
      return;
    }

    if (!formData.father_name) {
      toast.warning("Otasini Ismi!");
      return;
    }

    if (checkPhoneNumber(formData.phone_number)) {
      toast.warning("Telefon raqamini to'g'ri kitriting +998 9? 111 22 33");
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
                O'tasini ismi <b className="text-danger">*</b>
              </label>
            </div>
          </div>
        </div>

        {/* PHONE */}
        <div className="form-floating mb-3">
          <input
            type="tel"
            placeholder="Telefon raqam"
            className="form-control"
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
            Telefon raqam <b className="text-danger">*</b>
          </label>
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
        </div>

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

        <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded py-3 p-1 mb-3">
          <input
            className="form-check-input mx-1"
            type="checkbox"
            checked={formData.is_active}
            value={formData.is_active}
            onClick={() =>
              setFormData({ ...formData, is_active: !formData.is_active })}
          />
          <b className={formData.is_active ? "text-success" : "text-danger"}>
            Active
          </b>
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

export default AddManager;
