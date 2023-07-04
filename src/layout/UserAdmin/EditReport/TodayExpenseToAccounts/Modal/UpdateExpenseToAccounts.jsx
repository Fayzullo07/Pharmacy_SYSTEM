import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Naqd, Naqd_siz, naxt } from "../../../../../api";
import {
  accountsExpensesPatchAction,
  pharmacyExpensesPatchAction
} from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import ModalSimple from "../../../../../utils/ModalSimple";
import Textarea from "../../../../../ui/Textarea";
import NumberInput from "../../../../../ui/NumberInput";

const UpdateExpenseToAccounts = ({
  showModal,
  setShowModal,
  deteils,
  data
}) => {
  let director = null;
  deteils.employees.map(user => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });

  const [formData, setFormData] = useState({
    price: data.price,
    desc: data.desc,
    transfer_type: data.transfer_type,
    from_user:
      data.from_user == undefined
        ? data.transfer_type == naxt ? "k" : "h"
        : data.from_user,
    to_user: data.to_user
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
      return accountsExpensesPatchAction(
        data.id,
        cleanedData(formData),
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
      return pharmacyExpensesPatchAction(
        data.id,
        cleanedData(formData),
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

    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (data.from_user == undefined) {
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
                disabled
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
                disabled
              >
                <option value={naxt}>{Naqd}</option>
                <option value={2}>{Naqd_siz}</option>
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
            disabled
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
        <NumberInput
          name={"price"}
          value={formData.price}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Berilgan summasi"}
        />

        {/* BIO */}
        <Textarea
          value={formData.desc}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
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

export default UpdateExpenseToAccounts;
