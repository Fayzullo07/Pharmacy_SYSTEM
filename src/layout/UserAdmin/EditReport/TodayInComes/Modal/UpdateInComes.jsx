import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Naqd, Naqd_siz, naxt, transfersWorker } from "../../../../../api";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { pharmacyInComesPatchAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";
import NumberInput from "../../../../../ui/NumberInput";
import { useTranslation } from "react-i18next";

const UpdateInComes = props => {
  const { showModal, setShowModal, deteils, data } = props;
  const [fromClick, setFromClick] = useState(
    data.transfer_type == naxt ? false : true
  );
  const [moveMoney, setMoveMoney] = useState(
    data.transfer_type == 3 && data.to_user ? true : false
  );
  const [input1, setInput1] = useState(
    data.transfer_type == naxt ? naxt : "naxt_siz"
  );
  const [formData, setFormData] = useState({
    price: data.price,
    desc: data.desc,
    transfer_type:
      data.transfer_type == 3 && data.to_user ? "c" : data.transfer_type,
    to_user: data.to_user
  });

  const handleInputChange = e => {
    const { name, value } = e.target;

    // Price validatsiyasi
    if (name === "price" && value.length > 9) {
      return; // Qiymat 999999999 dan katta bo'lsa funksiyadan chiqamiz
    }

    if (name === "desc" && value.length > 300) {
      return; // Qiymat 300 belgidan uzun bo'lsa funksiyadan chiqamiz
    }

    setFormData({ ...formData, [name]: value });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      return pharmacyInComesPatchAction(
        data.id,
        cleanedData({
          ...formData,
          to_user:
            formData.transfer_type != 3 || input1 == naxt
              ? null
              : formData.to_user,
          transfer_type: input1 == naxt ? naxt : formData.transfer_type
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("incomes"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("remeinder"); // Ma'lumotlarni yangilash
      }
    }
  );

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });

  const handleSubmit = () => {
    if (!input1) {
      toast.warning(g(107));
      return;
    }
    if (input1 == "naxt_siz" && formData.transfer_type == 1) {
      toast.warning(g(108));
      return;
    }

    if (
      (formData.transfer_type == 3 && formData.to_user == null) ||
      formData.to_user == ""
    ) {
      toast.warning(g(109));
      return;
    }

    if (formData.price < 100) {
      toast.warning(g(33));
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
      title={"O'zgartirish"}
    >
      <div className="modal-body">
        {/* TUSHUM TURINI TANLANG */}
        <div className="form-floating">
          <select
            className="form-select mb-3"
            id="transfer_typ"
            name="transfer_type"
            value={input1}
            disabled
          >
            <option value="">
              {g(107)} . . .
            </option>
            <option value={naxt}>
              {m(34)}
            </option>
            <option value="naxt_siz">
              {m(35)}
            </option>
          </select>
          <label htmlFor="transfer_typ">
            {g(107)} <b className="text-danger">*</b>
          </label>
        </div>

        <div className="row">
          <div className="col-md-6">
            {fromClick &&
              <div className="form-floating">
                {/* {" "}// TUSHUP TURINI TANLANG */}
                <select
                  className="form-select mb-3 bg-light"
                  id="transfer_type"
                  name="transfer_type"
                  value={formData.transfer_type}
                  onChange={e => {
                    if (e.target.value == 3) {
                      setMoveMoney(true);
                    } else {
                      setMoveMoney(false);
                    }
                    handleInputChange(e);
                  }}
                  disabled
                >
                  <option value="">{g(108)} . . .</option>
                  <option value="c">CLICK - {g(27)}</option>
                  {transfersWorker.map(transfer =>
                    <option key={transfer.id} value={transfer.id}>
                      {transfer.name}
                    </option>
                  )}
                  {deteils.transfer_types.map(type =>
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  )}
                </select>
                <label htmlFor="transfer_type">
                  {g(108)} <b className="text-danger">*</b>
                </label>
              </div>}
          </div>
          <div className="col-md-6">
            {fromClick &&
              <div className="form-floating">
                {/* {" "}// CLICK KIMGA TASHLANADI */}
                <select
                  className="form-select mb-3 bg-light"
                  id="to_user"
                  name="to_user"
                  value={formData.to_user}
                  onChange={handleInputChange}
                  disabled
                >
                  {moveMoney &&
                    <option value="">{g(109)} . . .</option>}
                  {!moveMoney &&
                    <option value="" selected={!moveMoney}>
                      {g(96)}
                    </option>}

                  {moveMoney &&
                    deteils.employees.map(user =>
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    )}
                </select>
                <label htmlFor="to_user">
                  {g(109)} <b className="text-danger">*</b>
                </label>
              </div>}
          </div>
        </div>

        {/* MONEY INCOMES*/}
        <NumberInput
          name={"price"}
          value={formData.price}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isRequired={true}
          placeholder={"Tushum summasi"}
        />

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

export default UpdateInComes;
