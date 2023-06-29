import React, { useState } from "react";
import { chegirma, naxt } from "../../../../../api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { pharmacyExpensesPostAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";

const AddDiscount = (props) => {
  const { showModal, setShowModal, getData } = props;
  const [formData, setFormData] = useState({
    second_name: "",
    price: "",
    desc: "",
    transfer_type: naxt,
    expense_type: chegirma,
    report_date: getData.report_date,
    shift: getData.shift,
    from_pharmacy: getData.to_pharmacy,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "second_name" && value.length > 9) {
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

  const mutationPharm = useMutation(
    async () => {
      return pharmacyExpensesPostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_discount"); // Ma'lumotlarni yangilash
      },
    }
  );

  const handleSubmit = () => {
    if (formData.second_name < 100) {
      toast.warning("Maxsulot summasini kiriting !");
      return;
    }
    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }
    if (Number(formData.second_name) < Number(formData.price)) {
      toast.warning("Umumiy summadan ko'p chegirma mumkun emas!");
      return;
    }
    mutationPharm.mutate();
  };
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      mutation={mutationPharm}
      handleSubmit={handleSubmit}
      title={"Chegirma bilan savdo"}
    >
      <div className="modal-body">
        {/* PRODUCT TOTAL */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Maxsulot summasi"
            id="second_name"
            name="second_name"
            value={formData.second_name}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label htmlFor="second_name">
            Maxsulot summasi <b className="text-danger">*</b>
          </label>
        </div>

        {/* MONEY EXPNESES*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Chegirma summasi"
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
            Chegirma summasi <b className="text-danger">*</b>
          </label>
        </div>

        {/* DISCOUNT TURINI TANLANG */}
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
            Chegirma turi <b className="text-danger">*</b>
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

export default AddDiscount;
