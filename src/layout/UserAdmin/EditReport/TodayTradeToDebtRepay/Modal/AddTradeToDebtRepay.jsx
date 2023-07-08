import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Naqd, Naqd_siz, naxt, transfersWorker } from "../../../../../api";
import { toast } from "react-toastify";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { pharmacyToDebtsRePayPostAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";
import Textarea from "../../../../../ui/Textarea";

const AddTradeToDebtRepay = ({
  showModal,
  setShowModal,
  user,
  getData,
  deteils
}) => {
  const [disabledInput, setDisabledInput] = useState(false);
  const [input1, setInput1] = useState("");
  const [fromClick, setFromClick] = useState(false);
  let [formData, setFormData] = useState({
    price: null,
    desc: "",
    transfer_type: naxt,
    from_debt: user.id,
    report_date: getData.report_date,
    shift: getData.shift
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "price" && Number(value) > user.remaining_debt) {
      toast.warning(
        `Qarz summasidan ko'p bervossiz tekshirib ko'ring! Qarz: ${user.remaining_debt}`
      );
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
      return pharmacyToDebtsRePayPostAction(
        cleanedData({
          ...formData,
          price: disabledInput ? user.remaining_debt : formData.price,
          transfer_type: input1 == naxt ? naxt : formData.transfer_type
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("to_debts_trade_repay"); // Ma'lumotlarni yangilash
        queryClient.invalidateQueries("to_debts_trade_list");
        queryClient.invalidateQueries("to_debts_trade");
      }
    }
  );

  const handleSubmit = () => {
    if (formData.price < 100 && !disabledInput) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }
    if (formData.price > user.remaining_debt) {
      toast.warning("Qarz summasidan ko'p bervossiz tekshirib ko'ring!");
      return;
    }

    if (input1 == "naxt_siz" && formData.transfer_type == 1) {
      toast.warning("To'lov turini tanlang!");
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
      title={"Qarzga qilingan savdoni qaytarish"}
    >
      <div className="modal-body">
        {/* TAKE DEBT FROM WHO */}
        <div className="form-floating mb-3">
          <select
            className="form-select cursor_not"
            placeholder="Kimga qarz qaytarildi"
            name="from_debt"
            value={formData.from_debt}
            disabled
          >
            <option>
              {user.to_who}
            </option>
          </select>
          <label>
            Qarz <b className="text-danger">*</b>
          </label>
        </div>

        <div className="my-2">
          <p>
            Jami: <b>{user.price}</b> UZS
          </p>
          <p>
            Qolgan: <b className="text-muted">{user.remaining_debt}</b> UZS
          </p>
        </div>

        <div className="form-check form-switch d-flex  justify-content-between align-item-center p-0 my-2">
          <p>Qarzdi hammasini qaytardi</p>
          <input
            className="form-check-input mx-lg-4"
            type="checkbox"
            id="flexSwitchCheckChecked"
            value={disabledInput}
            onClick={() => {
              setDisabledInput(!disabledInput);
              setFormData({ ...formData, price: user.remaining_debt });
            }}
          />
        </div>

        <div className="form-floating">
          <select
            className="form-select mb-3"
            id="transfer_typ"
            name="transfer_type"
            value={input1}
            onChange={e => {
              setInput1(e.target.value);
              if (e.target.value == "naxt_siz") {
                setFromClick(true);
              } else {
                setFromClick(false);
              }
            }}
          >
            <option value={naxt}>
              {Naqd}
            </option>
            <option value="naxt_siz">
              {Naqd_siz}
            </option>
          </select>
          <label htmlFor="transfer_typ">
            Pul turini tanlang <b className="text-danger">*</b>
          </label>
        </div>

        {fromClick && // TUSHUP TURINI TANLANG
          <div className="form-floating">
            <select
              className="form-select mb-3 bg-light"
              id="transfer_type"
              name="transfer_type"
              value={formData.transfer_type}
              onChange={handleInputChange}
            >
              <option value="">To'lov turini tanlang . . .</option>
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
              To'lov turini tanlang <b className="text-danger">*</b>
            </label>
          </div>}

        {/* MONEY DEBTS*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Miqdor"
            min={1}
            id="price"
            name="price"
            value={disabledInput ? user.remaining_debt : formData.price}
            onChange={handleInputChange}
            disabled={disabledInput}
            onKeyDown={e => {
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
        <Textarea
          value={formData.desc}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
};

export default AddTradeToDebtRepay;
