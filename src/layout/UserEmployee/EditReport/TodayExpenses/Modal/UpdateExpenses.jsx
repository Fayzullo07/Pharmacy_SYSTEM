import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { naxt } from "../../../../../api";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import {
  accountsExpensesPatchAction,
  pharmacyExpensesPatchAction,
} from "../../../../../functions/DirectorActions";
import ModalSimple from "../../../../../utils/ModalSimple";

const UpdateExpenses = ({ showModal, setShowModal, deteils, data }) => {
  let director = null;
  deteils.employees.map((user) => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });

  const [formData, setFormData] = useState({
    price: data.price,
    desc: data.desc,
    transfer_type: data.transfer_type,
    expense_type: data.expense_type,
    from_user: data.from_user ? data.from_user : null,
  });
  console.log(formData);

  const queryClient = useQueryClient();

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
  const mutationPharm = useMutation(
    async () => {
      return pharmacyExpensesPatchAction(
        data.id,
        cleanedData(formData),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_F"); // Ma'lumotlarni yangilash
      },
    }
  );

  const mutationAccount = useMutation(
    async () => {
      return accountsExpensesPatchAction(
        data.id,
        cleanedData(formData),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_A"); // Ma'lumotlarni yangilash
      },
    }
  );

  const handleSubmit = () => {
    if (!formData.expense_type) {
      toast.warning("Xarajat turini tanlang!");
      return;
    }

    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (data.from_user == null) {
      mutationPharm.mutate();
    } else {
      mutationAccount.mutate();
    }
  };

  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={"O'zgartirish"}
    >
      <div className="modal-body">
        <div className="row">
          <div className="col-md-6">
            {/* CHOOSE EXPENSES TYPE */}
            <div className="form-floating">
              <select
                className="form-select mb-3"
                id="expense_type"
                name="expense_type"
                value={formData.expense_type}
                onChange={handleInputChange}
                disabled
              >
                <option value="">Xarajat turini tanlang . . .</option>
                {deteils.expense_types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <label htmlFor="expense_type">
                Xarajat turini tanlang <b className="text-danger">*</b>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {/* CHOOSE TRANSFER TYPE */}
            <div className="form-floating">
              <select
                className="form-select mb-3"
                id="transfer_type"
                name="transfer_type"
                value={formData.transfer_type}
                onChange={handleInputChange}
                disabled
              >
                <option value={naxt}>NAXT</option>
                <option value={2}>NAXT PULSIZ</option>
              </select>
              <label htmlFor="transfer_type">
                To'lov turini tanlang <b className="text-danger">*</b>
              </label>
            </div>
          </div>
        </div>

        {/* FROM WHO */}
        <div className="form-floating">
          <select
            className={`form-select mb-3`}
            id="from_user"
            name="from_user"
            value={formData.from_user}
            onChange={handleInputChange}
            disabled
          >
            <option value={director.id}>
              Rahbar - {director.first_name} {director.last_name}
            </option>
            {formData.transfer_type == naxt && (
              <option value={1}>Kassadan</option>
            )}
          </select>
          <label htmlFor="from_user">
            Xarajat kimdan qilindi <b className="text-danger">*</b>
          </label>
        </div>

        {/* MONEY EXPNESES*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Miqdor"
            id="price"
            name="price"
            min={0}
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

      <div className="modal-footer">
        <div className="d-grid col-12">
          <button
            className="btn btn-primary rounded-3"
            style={{ background: "var(--blue)" }}
            onClick={handleSubmit}
            disabled={mutationPharm.isLoading || mutationAccount.isLoading}
          >
            {mutationPharm.isLoading || mutationAccount.isLoading ? (
              <i className="fa fa-spinner fa-spin" />
            ) : (
              "Saqlash"
            )}
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default UpdateExpenses;
