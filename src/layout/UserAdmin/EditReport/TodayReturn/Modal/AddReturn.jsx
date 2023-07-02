import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { naxt, vozvrat } from "../../../../../api";
import {
  accountsExpensesPostAction,
  pharmacyExpensesPostAction
} from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import NumberInput from "../../../../../ui/NumberInput";
import Textarea from "../../../../../ui/Textarea";
import ModalSimple from "../../../../../utils/ModalSimple";

const AddReturn = props => {
  const { showModal, setShowModal, deteils, getData } = props;
  let director = null;
  deteils.employees.map(user => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });

  const [formData, setFormData] = useState({
    second_name: "",
    price: "",
    desc: "",
    transfer_type: naxt,
    expense_type: vozvrat,
    from_user: "k",
    report_date: getData.report_date,
    shift: getData.shift
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "second_name" && value.length > 50) {
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
        queryClient.invalidateQueries("expenses_return_pharm"); // Ma'lumotlarni yangilash
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
        queryClient.invalidateQueries("expenses_return_account"); // Ma'lumotlarni yangilash
      }
    }
  );

  const handleSubmit = () => {
    if (!formData.second_name || formData.second_name.length < 2) {
      toast.warning("Maxsulot nomini kiriting!");
      return;
    }
    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (formData.from_user == null || formData.from_user == "") {
      toast.warning("Pul qayerdan berilgan tanlang!");
      return;
    }

    if (formData.from_user == "k") {
      mutationPharm.mutate();
    } else {
      mutationAccount.mutate();
    }
  };
  return (
    <ModalSimple showModal={showModal} setShowModal={setShowModal}>
      <div className="modal-body">
        {/* PRODUCT NAME */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Maxsulot nomi"
            id="second_name"
            name="second_name"
            value={formData.second_name}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label htmlFor="second_name">
            Maxsulot nomi <b className="text-danger">*</b>
          </label>
        </div>

        {/* MONEY EXPNESES*/}
        <NumberInput
          name={"price"}
          value={formData.price}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Mahsulot summasi"}
        />

        {/* GIVEN MONEY FROM WHO */}
        <div className="form-floating">
          <select
            className="form-select mb-3"
            id="from_user"
            name="from_user"
            value={formData.from_user}
            onChange={handleInputChange}
          >
            <option value="k">Kassadan</option>
            <option value={director.id}>
              Rahbar - {director.first_name} {director.last_name}
            </option>
          </select>
          <label htmlFor="to_user">
            Pul kimdan berildi <b className="text-danger">*</b>
          </label>
        </div>

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

export default AddReturn;
