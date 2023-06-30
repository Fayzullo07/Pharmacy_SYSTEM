import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { naxt, xisob_raqam, xodim } from "../../../../../api";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import {
  accountsExpensesPostAction,
  pharmacyExpensesPostAction
} from "../../../../../functions/DirectorActions";
import ModalSimple from "../../../../../utils/ModalSimple";

const AddExpenseToAccounts = ({
  showModal,
  setShowModal,
  deteils,
  getData
}) => {
  let director = null;
  deteils.employees.map(user => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });

  const [formData, setFormData] = useState({
    price: "",
    desc: "",
    transfer_type: naxt,
    expense_type: xodim,
    from_user: "",
    to_user: deteils.employees[0].id,
    report_date: getData.report_date,
    shift: getData.shift
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "price" && value.length > 9) {
      return;
    }

    if (name === "desc" && value.length > 300) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return accountsExpensesPostAction(
        cleanedData({
          ...formData,
          from_user: director.id,
          to_pharmacy: getData.to_pharmacy,
          transfer_type:
            formData.from_user == "h" ? xisob_raqam : formData.transfer_type
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expensesA"); // Ma'lumotlarni yangilash
      }
    }
  );

  const mutationFarm = useMutation(
    async () => {
      return pharmacyExpensesPostAction(
        cleanedData({
          ...formData,
          from_pharmacy: getData.to_pharmacy
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expensesF"); // Ma'lumotlarni yangilash
      }
    }
  );

  const handleSubmit = () => {
    if (formData.to_user == formData.from_user) {
      toast.warning("O'zidan o'zidan mumkun emas!");
      return;
    }
    if (!formData.from_user) {
      toast.warning("Xarajat kimdan qilindi !");
      return;
    }
    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (formData.from_user == "k" || formData.from_user == "h") {
      mutationFarm.mutate();
    } else {
      mutation.mutate();
    }
  };
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title="Xodimlarga berilgan summa"
    >
      <div className="modal-body">
        <div className="row">
          <div className="col-md-6">
            {/* EXPENSE FOR WHO */}
            <div className="form-floating">
              <select
                className="form-select mb-3 "
                id="to_user"
                name="to_user"
                value={formData.to_user}
                onChange={handleInputChange}
              >
                {deteils.employees.map(user =>
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                )}
              </select>
              <label htmlFor="to_user">
                Xodimni tanlang <b className="text-danger">*</b>
              </label>
            </div>
          </div>
          <div className="col-md-6">
            {/* CHOOSE PAYMENT TYPE */}
            <div className="form-floating">
              <select
                className="form-select mb-3"
                id="transfer_type"
                name="transfer_type"
                value={formData.transfer_type}
                onChange={e => {
                  setFormData({ ...formData, from_user: "" });
                  handleInputChange(e);
                }}
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

        {/* TAKE EXPENSES FROM WHO */}
        <div className="form-floating">
          <select
            className={`form-select mb-3`}
            id="from_user"
            name="from_user"
            value={formData.from_user}
            onChange={handleInputChange}
          >
            <option value="">Xarajat kimdan qilindi . . .</option>

            {formData.transfer_type == naxt
              ? <option value={"k"}>Kassadan</option>
              : <option value={"h"}>Hisob raqamdan</option>}
            <option value={director.id}>
              Rahbardan - {director.first_name} {director.last_name}
            </option>
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
            placeholder="Berilgan summa"
            id="price"
            name="price"
            min={0}
            value={formData.price}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label htmlFor="price">
            Berilgan summa <b className="text-danger">*</b>
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
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="d-grid col-12">
          <button
            className="btn btn-primary rounded-3"
            style={{ background: "var(--blue)" }}
            onClick={handleSubmit}
            disabled={mutation.isLoading || mutationFarm.isLoading}
          >
            {mutation.isLoading || mutationFarm.isLoading
              ? <i className="fa fa-spinner fa-spin" />
              : "Saqlash"}
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default AddExpenseToAccounts;
