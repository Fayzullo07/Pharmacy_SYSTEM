import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { naxt } from "../../../../../api";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import {
  accountsExpensesPostAction,
  pharmacyExpensesPostAction
} from "../../../../../functions/DirectorActions";
import ModalSimple from "../../../../../utils/ModalSimple";
import Textarea from "../../../../../ui/Textarea";
import NumberInput from "../../../../../ui/NumberInput";
import SelectInput from "../../../../../ui/SelectInput";

const AddExpenses = ({ showModal, setShowModal, deteils, getData }) => {
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
    expense_type: "",
    from_user: naxt,
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
    if (name === "phone_number" && value.length > 13) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const queryClient = useQueryClient();

  const mutationPharm = useMutation(
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
        queryClient.invalidateQueries("expenses_F"); // Ma'lumotlarni yangilash
      }
    }
  );

  const mutationAccount = useMutation(
    async () => {
      return accountsExpensesPostAction(
        cleanedData({
          ...formData,
          from_user: director.id,
          to_pharmacy: getData.to_pharmacy
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_A"); // Ma'lumotlarni yangilash
      }
    }
  );

  const handleSubmit = async () => {
    if (!formData.expense_type) {
      toast.warning("Xarajat turini tanlang!");
      return;
    }

    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (formData.transfer_type == 2 || formData.from_user == director.id) {
      mutationAccount.mutate();
    } else {
      mutationPharm.mutate();
    }
  };
  return (
    <ModalSimple showModal={showModal} setShowModal={setShowModal}>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-6">
            {/* CHOOSE EXPENSES TYPE */}
            <SelectInput
              name={"expense_type"}
              value={formData.expense_type}
              handleInputChange={handleInputChange}
              isRequired={true}
              placeholder={"Xarajat turi"}
              data={deteils.expense_types}
            />
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
            disabled={formData.transfer_type == 2}
          >
            <option value={director.id}>
              Rahbar - {director.first_name} {director.last_name}
            </option>
            {formData.transfer_type == naxt &&
              <option value={1}>Kassadan</option>}
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
          placeholder={"Xarajat summasi"}
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
            disabled={mutationPharm.isLoading || mutationAccount.isLoading}
          >
            {mutationPharm.isLoading || mutationAccount.isLoading
              ? <i className="fa fa-spinner fa-spin" />
              : "Saqlash"}
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default AddExpenses;
