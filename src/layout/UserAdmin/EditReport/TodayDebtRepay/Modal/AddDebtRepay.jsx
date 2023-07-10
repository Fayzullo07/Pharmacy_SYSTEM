import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  Naqd,
  Naqd_siz,
  naxt,
  transfers,
  xisob_raqam
} from "../../../../../api";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { pharmacyDebtsRePayPostAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";
import TransferTypeSelect from "../../../../../ui/TransferTypeSelect";
import { useTranslation } from "react-i18next";

const AddDebtRepay = props => {
  const { showModal, setShowModal, deteils, curData, getData } = props;

  let director = null;
  deteils.employees.map(user => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });

  const [disabledInput, setDisabledInput] = useState(false);

  let [formData, setFormData] = useState({
    desc: "",
    from_user: null,
    price: "",
    to_debt: curData.id,
    transfer_type: naxt,
    report_date: getData.report_date,
    shift: getData.shift
  });

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "price" && Number(value) > curData.remaining_debt) {
      toast.warning(g(112));
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
      return pharmacyDebtsRePayPostAction(
        cleanedData({
          ...formData,
          price: disabledInput ? curData.remaining_debt : formData.price,
          from_user:
            formData.transfer_type == 2 ? director.id : formData.from_user
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("debts_repay"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("debts_list");
      }
    }
  );

  
  const handleSubmit = () => {
    if (!formData.transfer_type) {
      toast.warning(m(36));
      return;
    }

    if (formData.price < 100 && !disabledInput) {
      toast.warning(g(33));
      return;
    }
    if (formData.price > curData.remaining_debt) {
      toast.warning(g(112));
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
      title={"Olingan qarzni qaytarish"}
    >
      <div className="modal-body">
        {/* TAKE DEBT FROM WHO */}
        <div className="mb-3">
          <select
            className="form-select cursor_not"
            placeholder="Kimga qarz qaytarildi"
            name="to_debt"
            value={formData.to_debt}
            disabled
          >
            <option>
              {curData.from_who}
            </option>
          </select>
        </div>

        <div className="my-2">
          <p>
            {r(12)}: <b>{curData.price}</b> UZS
          </p>
          <p>
            {g(114)}: <b className="text-muted">{curData.remaining_debt}</b> UZS
          </p>
        </div>

        <div className="form-check form-switch d-flex  justify-content-between align-item-center p-0 my-2">
          <p>
            {g(113)}
          </p>
          <input
            className="form-check-input mx-lg-4"
            type="checkbox"
            id="flexSwitchCheckChecked"
            value={disabledInput}
            onClick={() => {
              setDisabledInput(!disabledInput);
              setFormData({ ...formData, price: curData.remaining_debt });
            }}
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            {/* TUSHUP TURINI TANLANG */}
            <TransferTypeSelect
              name={"transfer_type"}
              value={formData.transfer_type}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            {/* KIMDAN OLINDI */}
            <div className="form-floating">
              <select
                className={`form-select mb-3`}
                id="from_user"
                name="from_user"
                value={formData.from_user}
                onChange={handleInputChange}
                disabled={formData.transfer_type != naxt}
              >
                {formData.transfer_type == naxt &&
                  <option value={"k"}>
                    {g(61)}
                  </option>}
                <option value={director.id}>
                  {g(95)} - {director.first_name} {director.last_name}
                </option>
              </select>
              <label htmlFor="from_user">
                {g(94)}
              </label>
            </div>
          </div>
        </div>

        {/* MONEY DEBTS*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            placeholder={g(115)}
            min={1}
            id="price"
            name="price"
            value={disabledInput ? curData.remaining_debt : formData.price}
            onChange={handleInputChange}
            disabled={disabledInput}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label htmlFor="price">
            {g(115)} <b className="text-danger">*</b>
          </label>
        </div>

        {/* BIO */}
        <Textarea
          value={formData.desc}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default AddDebtRepay;
