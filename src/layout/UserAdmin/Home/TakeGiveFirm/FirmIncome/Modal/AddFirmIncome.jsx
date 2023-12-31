import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { firmIncomePostAction } from "../../../../../../functions/GlobalActions";
import { cleanedData } from "../../../../../../functions/NecessaryFunctions";
import { today } from "../../../../../../api";
import Modal from "../../../../../../utils/Modal";
import Textarea from "../../../../../../ui/Textarea";
import TextInput from "../../../../../../ui/TextInput";
import NumberInput from "../../../../../../ui/NumberInput";
import { useTranslation } from "react-i18next";

const AddFirmIncome = props => {
  const { showModal, setShowModal, date_firm, curData } = props;
  const [formData, setFormData] = useState({
    price: "",
    desc: "",
    second_name: "",
    deadline_date: "",
    is_transfer_return: false,
    from_firm: curData.id,
    report_date: date_firm
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name == "second_name" && value.length > 50) {
      return;
    }

    if (name == "price" && value.length > 9) {
      return;
    }

    if (name == "desc" && value.length > 300) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return firmIncomePostAction(cleanedData(formData), setShowModal);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("firms_incomes");
      }
    }
  );

  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });

  const handleSubmit = () => {
    if (!formData.second_name) {
      toast.warning(m(27));
      return;
    }

    if (formData.price < 100) {
      toast.warning(g(33));
      return;
    }

    if (
      formData.deadline_date == "" ||
      new Date(formData.deadline_date) < new Date(today)
    ) {
      toast.warning(g(38));
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
      title={curData.name}
    >
      <div className="modal-body">
        <div className="row">
          {/* NAME */}
          <div className="col-md-6">
            <TextInput
              name={"second_name"}
              value={formData.second_name}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Olingan mahsulot nomi"}
            />
          </div>

          {/* PRICE */}
          <div className="col-md-6">
            <NumberInput
              name={"price"}
              value={formData.price}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isRequired={true}
              placeholder={"Mahsulot summasi"}
            />
          </div>

          {/* DEADLINE DATE */}
          <div className="col-md-6">
            <div className="form-floating mb-3">
              <input
                type="date"
                placeholder="Qayatarish muddati"
                className="form-control"
                name="deadline_date"
                min={today}
                value={formData.deadline_date}
                onChange={handleInputChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <label>
                {g(38)} <b className="text-danger">*</b>
              </label>
            </div>
          </div>

          {/* HOW TO RETERN TRANSFER TYPE WITH MONEY OR WITHOUT MONEY */}
          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select mb-3"
                id="is_transfer_return"
                name="is_transfer_return"
                value={formData.is_transfer_return}
                onChange={handleInputChange}
              >
                <option value={false}>{m(34)}</option>
                <option value={true}>{m(35)}</option>
              </select>
              <label htmlFor="is_transfer_return">
                {g(37)} <b className="text-danger">*</b>
              </label>
            </div>
          </div>
        </div>

        {/* IZOH */}
        <Textarea
          value={formData.desc}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default AddFirmIncome;
