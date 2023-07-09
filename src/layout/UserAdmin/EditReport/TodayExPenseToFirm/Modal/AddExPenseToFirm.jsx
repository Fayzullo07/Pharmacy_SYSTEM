import React, { useState } from "react";
import {
  naxt,
  today,
  xisob_raqam
} from "../../../../../api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  checkPhoneNumber,
  cleanedData,
  tekshirish3
} from "../../../../../functions/NecessaryFunctions";
import { firmsExpenseDebtPostAction } from "../../../../../functions/GlobalActions";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";
import TransferTypeSelect from "../../../../../ui/TransferTypeSelect";
import TextInput from "../../../../../ui/TextInput";
import PhoneInput from "../../../../../ui/PhoneInput";

const AddExPenseToFirm = ({
  showModal,
  setShowModal,
  deteils,
  setFirmExpenseId,
  setViewModal,
  getData,
  curData,
  setIsLeader
}) => {
  let director = null;
  deteils.employees.map(user => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });

  const queryClient = useQueryClient();


  const [formData, setFormData] = useState({
    price: "",
    from_user_price: 0,
    verified_phone_number: "+998",
    verified_firm_worker_name: "",
    transfer_type: naxt,
    from_user: null,
    desc: "",
    to_firm: curData.id,
    shift: getData.shift,
    from_pharmacy: getData.to_pharmacy,
    report_date: today
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "price" && value.length > 9) {
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

    if (name === "desc" && value.length > 300) {
      return;
    }
    setFormData({ ...formData, [name]: e.target.value });
  };

  const mutationToFirm = useMutation(
    async () => {
      return firmsExpenseDebtPostAction(
        cleanedData({
          ...formData,
          from_pharmacy_transfer: formData.transfer_type == naxt ? false : true,
          price: Number(formData.price) + Number(formData.from_user_price),
          from_user: ["k", "h", "k_r"].includes(formData.from_user) ? null : formData.from_user,
          transfer_type: formData.from_user == 'h' ? xisob_raqam : formData.transfer_type,
          from_user_price: formData.from_user == director.id ? Number(formData.price) : Number(formData.from_user_price),
          verified_phone_number: formData.transfer_type == naxt ? formData.verified_phone_number : "",
          verified_firm_worker_name: formData.transfer_type == naxt ? formData.verified_firm_worker_name : "",
        }),
        setViewModal,
        setShowModal,
        setFirmExpenseId,
        formData.transfer_type == naxt ? true : false

      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_to_firm"); // Ma'lumotlarni yangilash
        if (formData.from_user_price > 100) {
          setIsLeader({
            isTrue: true,
            price: formData.price
          })
        }
      }
    }
  );

  const handleSubmit = () => {

    if (!formData.from_user) {
      toast.warning("Pul kimdan berildi!")
      return;
    }
    if (!tekshirish3(formData.verified_firm_worker_name) && formData.transfer_type == naxt) {
      toast.warning("Qabul qiluvchi F.I.O!");
      return;
    }

    if (checkPhoneNumber(formData.verified_phone_number) && formData.transfer_type == naxt) {
      toast.warning(
        "Qabul qiluvchi telefon raqamini to'gri kiriting +998 9? 111 22 33 !"
      );
      return;
    }

    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (formData.from_user == 'k_r' && formData.from_user_price < 100) {
      toast.warning("Rahbardan eng kam summa 100 somdan ko'p bo'lish kerak!");
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
            <TransferTypeSelect
              name={"transfer_type"}
              value={formData.transfer_type}
              handleInputChange={handleInputChange}
            />

          </div>

          <div className="col-md-6">
            <div className="form-floating">
              {/* CLICK KIMGA TASHLANADI */}
              <select
                className={`form-select mb-3`}
                id="from_user"
                name="from_user"
                value={formData.from_user}
                onChange={handleInputChange}
              >
                <option value="">Pul kimdan berildi . . .</option>
                {formData.transfer_type == naxt &&
                  <option value="k">Kassadan</option>}

                <option value={director.id}>Rahbardan</option>

                {formData.transfer_type == naxt &&
                  <option value="k_r">Kassa va Rahbardan</option>}

                {formData.transfer_type != naxt &&
                  <option value="h">Hisob raqamdan</option>}
              </select>
              <label htmlFor="from_user">
                Pul kimdan berildi <b className="text-center">*</b>
              </label>
            </div>
          </div>

          {formData.transfer_type == naxt && (
            <>
              <div className="col-md-6">
                {/* NAME WHO TAKE */}
                <TextInput
                  name={"verified_firm_worker_name"}
                  value={formData.verified_firm_worker_name}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isRequired={true}
                  placeholder={"Qabul qiluvchi F.I.O"}
                />
              </div>

              <div className="col-md-6">
                {/* PHONE WHO TAKE */}
                <PhoneInput
                  name={"verified_phone_number"}
                  value={formData.verified_phone_number}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isRequired={true}
                  placeholder={"Qabul qiluvchining telefon nomeri"}
                />
              </div>
            </>
          )}

          <div className="col-md-12">
            <div className="row">
              <div className="col">
                {/* MONEY FROM KASSA*/}
                <div class="mb-3">
                  <label htmlFor="price" className="form-label">
                    Berilgan summa <b className="text-danger">*</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder={`${formData.from_user == 'h' ? "Hisob raqamdan" : formData.from_user == director.id ? "Rahbardan" : 'Kassadan'}`}
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
                </div>
              </div>
              {formData.from_user == "k_r" && (
                <div className="col">
                  {/* MONEY FROM LEADER*/}
                  <div class="mb-3">
                    <label htmlFor="from_user_price" className="form-label">
                      Rahbardan berilgan summa <b className="text-danger">*</b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Rahbardan"
                      id="from_user_price"
                      name="from_user_price"
                      value={formData.from_user_price}
                      onChange={handleInputChange}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-12">
            {/* BIO */}
            <Textarea
              value={formData.desc}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddExPenseToFirm;
