import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { managerPatchAction } from "../../../../../functions/DirectorActions";
import {
  checkPhoneNumber,
  cleanedData,
} from "../../../../../functions/NecessaryFunctions";
import { toast } from "react-toastify";
import Modal from "../../../../../utils/Modal";

const UpdateManager = (props) => {
  const { showModal, setShowModal, data } = props;

  const [formData, setFormData] = useState({
    first_name: data.first_name,
    last_name: data.last_name.split(" ")[0],
    father_name: data.last_name.split(" ")[1],
    phone_number: data.phone_number,
    is_active: data.is_active,
  });

  const queryClient = useQueryClient();

  const [chamgePass, setChangePass] = useState(false);
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const handleInputChange = (e) => {
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

    if (name == "phone_number" && value.length > 13) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation(
    async () => {
      return managerPatchAction(
        data.id,
        cleanedData({
          ...formData,
          last_name: `${formData.last_name} ${formData.father_name}`,
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("managers");
      },
    }
  );

  const handleSubmit = () => {
    if (checkPhoneNumber(formData.phone_number)) {
      toast.warning("Telefon raqamini to'g'ri kitriting +998 9? 111 22 33");
      return;
    }

    if (chamgePass) {
      if (!password) {
        toast.warning("Parolni kiriting !");
        return;
      }
      if (password != re_password) {
        toast.warning("Parolni bir xil kiriting!");
        return;
      }
      setFormData({ ...formData, password });
    }
    mutation.mutate();
  };
  return (
    <Modal
      setShowModal={setShowModal}
      showModal={showModal}
      title={"O'zgartirish"}
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
                onKeyDown={(e) => {
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
                onKeyDown={(e) => {
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
                onKeyDown={(e) => {
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Telefon raqam <b className="text-danger">*</b>
          </label>
        </div>

        <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border py-3 p-1 rounded">
          <b className={formData.is_active ? "text-success" : "text-danger"}>
            Active
          </b>
          <input
            className="form-check-input mx-1"
            type="checkbox"
            checked={formData.is_active}
            value={formData.is_active}
            onClick={() =>
              setFormData({ ...formData, is_active: !formData.is_active })
            }
          />
        </div>

        <div className="col-12">
          {/* CHECKBOX USER */}
          <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded p-1 py-3 mb-3">
            <b>Parol o'zgartirish</b>
            <input
              className="form-check-input mx-1"
              type="checkbox"
              checked={chamgePass}
              onClick={() => setChangePass(!chamgePass)}
            />
          </div>
        </div>
        {chamgePass && (
          <>
            <div className="row">
              <div className="col-md-6">
                {/* PASSWORD */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    placeholder="Parol"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
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
                    value={re_password}
                    onChange={(e) => setRePassword(e.target.value)}
                    onKeyDown={(e) => {
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
          </>
        )}
      </div>
    </Modal>
  );
};

export default UpdateManager;
