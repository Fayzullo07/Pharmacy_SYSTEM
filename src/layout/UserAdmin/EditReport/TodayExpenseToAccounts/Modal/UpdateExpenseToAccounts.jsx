import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  naxt,
  transfers,
  transfersWorker,
  xisob_raqam,
} from "../../../../../api";
import {
  accountsExpensesPatchAction,
  pharmacyExpensesPatchAction,
} from "../../../../../functions/DirectorActions";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";

const UpdateExpenseToAccounts = (props) => {
  const { showModal, setShowModal, deteils, data } = props;
  let director = null;
  deteils.employees.map((user) => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });
  const [fromClick, setFromClick] = useState(
    data.transfer_type == naxt ? false : true
  );
  const [input1, setInput1] = useState(
    data.transfer_type == naxt ? naxt : "naxt_siz"
  );
  const [formData, setFormData] = useState({
    price: data.price,
    desc: data.desc,
    transfer_type: data.transfer_type,
    from_user: data.from_user ? data.from_user : null,
    to_user: data.to_user,
  });

  const [from_xisob, setFromXisob] = useState(
    data.transfer_type == xisob_raqam ? false : true
  );

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
      },
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
      },
    }
  );

  const handleSubmit = () => {
    if (
      formData.to_user == formData.from_user &&
      formData.transfer_type != xisob_raqam
    ) {
      toast.warning("O'zidan o'zidan mumkun emas !");
      return;
    }

    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
      return;
    }

    if (formData.from_user == null) {
      mutationFarm.mutate();
    } else {
      mutation.mutate();
    }
  };
  return (
    <div
      className="modal d-flex justify-content-center align-items-center"
      style={{ position: "absolute", zIndex: 555 }}
      onClick={() => setShowModal(false)}
    >
      {/* <!-- Modal content --> */}

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5 className="modal-title">O'zgartirish</h5>

          <span className="close">
            <i
              className="fa fa-xmark"
              onClick={() => setShowModal(!showModal)}
            />
          </span>
        </div>

        <div className="modal-body">
          {/* CHOOSE PAYMENT TYPE */}
          <div className="form-floating">
            <select
              className="form-select mb-3 cursor_not"
              id="transfer_type"
              name="transfer_type"
              value={input1}
              disabled
              onChange={(e) => {
                setInput1(e.target.value);
                if (e.target.value == "naxt_siz") {
                  setFromClick(true);
                } else {
                  setFromClick(false);
                }
              }}
            >
              <option value={naxt}>NAXT</option>
              <option value="naxt_siz">NAXT PULSIZ</option>
            </select>
            <label htmlFor="transfer_type">
              Pul turini tanlang <b className="text-danger">*</b>
            </label>
          </div>

          {/* CHOOSE TRANSFER TYPES */}
          {fromClick && (
            <div className="form-floating">
              <select
                className="form-select mb-3 cursor_not"
                id="transfer_type"
                name="transfer_type"
                value={formData.transfer_type}
                disabled
                onChange={(e) => {
                  handleInputChange(e);
                  if (e.target.value == xisob_raqam) {
                    setFromXisob(false);
                  } else {
                    setFromXisob(true);
                  }
                }}
              >
                <option value="">O'tkazma turini tanlang . . .</option>
                {transfers.map((transfer) => (
                  <option key={transfer.id} value={transfer.id}>
                    {transfer.name}
                  </option>
                ))}
                {deteils.transfer_types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <label htmlFor="transfer_type">
                O'tkazma turini tanlang <b className="text-danger">*</b>
              </label>
            </div>
          )}

          {/* TAKE EXPENSES FROM WHO */}
          {from_xisob && (
            <div className="form-floating">
              <select
                className={`form-select mb-3 cursor_not`}
                id="from_user"
                name="from_user"
                value={formData.from_user}
                onChange={handleInputChange}
                disabled
              >
                {input1 == naxt && <option value={"k"}>Kassadan</option>}
                <option value={director.id}>
                  Rahbar - {director.first_name} {director.last_name}
                </option>
              </select>
              <label htmlFor="from_user">
                Xarajat kimdan qilindi <b className="text-danger">*</b>
              </label>
            </div>
          )}

          {/* EXPENSE FOR WHO */}
          <div className="form-floating">
            <select
              className="form-select mb-3 "
              id="to_user"
              name="to_user"
              value={formData.to_user}
              onChange={handleInputChange}
            >
              {deteils.employees.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
            <label htmlFor="to_user">
              Xarajat kimga qilindi <b className="text-danger">*</b>
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
              disabled={mutation.isLoading || mutationFarm.isLoading}
            >
              {mutation.isLoading || mutationFarm.isLoading ? (
                <i className="fa fa-spinner fa-spin" />
              ) : (
                "Saqlash"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateExpenseToAccounts;
