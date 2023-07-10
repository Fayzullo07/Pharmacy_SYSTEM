import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { workerPatchAction } from "../../../../../functions/DirectorActions";
import { toast } from "react-toastify";
import {
  checkPhoneNumber,
  cleanedData,
} from "../../../../../functions/NecessaryFunctions";
import { useDispatch } from "react-redux";
import { getGlobalDeteilsAction } from "../../../../../redux/Actions/GlobalAction";
import Modal from "../../../../../utils/Modal";
import PasswordInput from "../../../../../ui/PasswordInput";
import PhoneInput from "../../../../../ui/PhoneInput";
import SmenaSelect from "../../../../../ui/SmenaSelect";
import NumberInput from "../../../../../ui/NumberInput";
import TextInput from "../../../../../ui/TextInput";
import { useTranslation } from "react-i18next";

const UpdateWorker = (props) => {
  const { showModal, setShowModal, datas } = props;

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: datas.first_name,
    last_name: datas.last_name.split(" ")[0],
    father_name: datas.last_name.split(" ")[1],
    phone_number: datas.phone_number,
    shift: datas.shift,
    wage: datas.wage,
    is_main_worker: datas.is_main_worker,
    is_active: datas.is_active,
  });

  const [chamgePass, setChangePass] = useState(false);
  const [formPassword, setFormPassword] = useState({
    password: "",
    re_password: ""
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormPassword({ ...formPassword, [name]: value })
  }
  const handleInputChange = (e) => {
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

    if (name == "wage" && value.length > 9) {
      return;
    }
    setFormData({ ...formData, [name]: e.target.value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return workerPatchAction(
        datas.id,
        cleanedData({
          ...formData,
          last_name: `${formData.last_name} ${formData.father_name}`,
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("workers");
        dispatch(getGlobalDeteilsAction());
      },
    }
  );

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: p } = useTranslation("translation", { keyPrefix: "Profile" });

  const handleSubmit = () => {
    if (!formData.first_name) {
      toast.warning(m(28));
      return;
    }

    if (!formData.last_name) {
      toast.warning(m(29));
      return;
    }

    if (!formData.father_name) {
      toast.warning(m(30));
      return;
    }

    if (checkPhoneNumber(formData.phone_number)) {
      toast.warning(g(34));
      return;
    }

    if (!formData.shift) {
      toast.warning(m(15));
      return;
    }

    if (!formData.wage) {
      toast.warning(m(7));
      return;
    }
    if (chamgePass) {
      if (!formPassword.password) {
        toast.warning(m(8));
        return;
      }

      if (formPassword.password != formPassword.re_password) {
        toast.warning(m(9));
        return;
      }
      setFormData({ ...formData, password: formPassword.password });
    }

    mutation.mutate();
  };

  return (
    <Modal
      setShowModal={setShowModal}
      showModal={showModal}
      mutation={mutation}
      handleSubmit={handleSubmit}
      title={"O'zgartirish"}
    >
      <div className="modal-body">
        <div className="row">
          <div className="col-md-4">
            {/* FIRST NAME */}
            <TextInput
              name={"first_name"}
              value={formData.first_name}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Ismi"}
            />
          </div>
          <div className="col-md-4">
            {/* LAST NAME */}
            <TextInput
              name={"last_name"}
              value={formData.last_name}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Familiyasi"}
            />
          </div>

          <div className="col-md-4">
            {/* FATHER NAME */}
            <TextInput
              name={"father_name"}
              value={formData.father_name}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Otasini ismi"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            {/* PHONE */}
            <PhoneInput
              name={"phone_number"}
              value={formData.phone_number}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
            />
          </div>
          <div className="col-md-4">
            {/* SHIFT */}
            <SmenaSelect
              name={"shift"}
              value={formData.shift}
              handleInputChange={handleInputChange}
              isRequired={true}
            />
          </div>
          <div className="col-md-4">
            {/* WAGE */}
            <NumberInput
              name={"wage"}
              value={formData.wage}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Ish haqi"}
            />

          </div>
          <div className="col-md-6">
            {/* CHECKBOX USER */}
            <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded py-3 p-1 mb-3">
              <b
                className={
                  formData.is_main_worker ? "text-success" : "text-danger"
                }
              >
              {g(45)}
              </b>
              <input
                className="form-check-input mx-1"
                type="checkbox"
                checked={formData.is_main_worker}
                value={formData.is_main_worker}
                onClick={() =>
                  setFormData({
                    ...formData,
                    is_main_worker: !formData.is_main_worker,
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* CHECKBOX USER */}
            <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded py-3 p-1 mb-3">
              <b
                className={formData.is_active ? "text-success" : "text-danger"}
              >
                {g(8)}
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
          </div>

          <div className="col-12">
            {/* CHECKBOX USER */}
            <div className="form-check form-switch d-flex justify-content-between align-item-center p-0 my-2 border rounded p-1 py-3 mb-3">
              <b>{p(7)}</b>
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
              <div className="col-md-6">
                {/* PASSWORD */}
                <PasswordInput
                  name={"password"}
                  value={formPassword.password}
                  handleInputChange={handlePasswordChange}
                  handleSubmit={handleSubmit}
                  isRequired={true}
                  placeholder={"Parol"}
                />
              </div>
              <div className="col-md-6">
                {/* PASSWORD CHECK */}
                <PasswordInput
                  name={"re_password"}
                  value={formPassword.re_password}
                  handleInputChange={handlePasswordChange}
                  handleSubmit={handleSubmit}
                  isRequired={true}
                  placeholder={"Parol qayta"}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateWorker;
