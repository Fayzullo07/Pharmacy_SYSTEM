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
import TextInput from "../../../../../ui/TextInput";
import { useTranslation } from "react-i18next";

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

   const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
   const { t: p } = useTranslation("translation", { keyPrefix: "Profile" });
   
  const handleSubmit = () => {
    if (!formData.second_name) {
      toast.warning(g(18));
      return;
    }
    if (formData.price < 100) {
      toast.warning(g(33));
      return;
    }

    if (formData.from_user == null || formData.from_user == "") {
      toast.warning(g(103));
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
        <TextInput
          name={"second_name"}
          value={formData.second_name}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Mahsulot nomi"}
        />

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
            <option value="k">{g(61)}</option>
            <option value={director.id}>
              {g(95)} - {director.first_name} {director.last_name}
            </option>
          </select>
          <label htmlFor="to_user">
            {g(103)} <b className="text-danger">*</b>
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
              : p(6)}
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default AddReturn;
