import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { naxt } from "../../../../../api";
import { checkPhoneNumber, cleanedData } from "../../../../../functions/NecessaryFunctions";
import { pharmacyDebtsPostAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";

const AddDebt = (props) => {
  const { showModal, setShowModal, getData } = props;
  const [formData, setFormData] = useState({
    price: null,
    desc: "",
    from_who: "",
    phone_number: "+998",
    transfer_type: naxt,
    report_date: getData.report_date,
    shift: getData.shift,
    to_pharmacy: getData.to_pharmacy,
  });

  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutation = useMutation(
    async () => {
      return pharmacyDebtsPostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("debts"); // Ma'lumotlarni yangilash
      },
    }
  );

  const handleSubmit = () => {
    if (!formData.from_who) {
      toast.warning("Kimga qarz berganingiz ismini kiriting!");
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
      title={"Kimdan qarz olindi"}
    >
      <div className="modal-body">
        {/* TAKE DEBT FROM WHO */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Kimdan qarz olindi"
            name="from_who"
            value={formData.from_who}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>
            Kimgdan qarz olindi <b className="text-danger">*</b>
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label htmlFor="price">
            Miqdor <b className="text-danger">*</b>
          </label>
        </div>

        {/* PHONE */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Telefon"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label>Telefon</label>
        </div>

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
    </Modal>
  );
};

export default AddDebt;
