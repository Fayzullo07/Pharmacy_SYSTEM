import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  cleanedData,
  formatNumber
} from "../../../../../functions/NecessaryFunctions";
import { firmsExpenseVerifyPostAction } from "../../../../../functions/GlobalActions";
import ModalSimple from "../../../../../utils/ModalSimple";
import { accountsExpensesPostAction } from "../../../../../functions/DirectorActions";
import { naxt, xisob_raqam, xodim } from "../../../../../api";
import { useTranslation } from "react-i18next";

const ViewModal = ({
  showModal,
  setShowModal,
  firm_expense_id,
  getData,
  deteils,
  isLeader,
  setDataModal
}) => {
  let director = null;
  deteils.employees.map(user => {
    if (user.role == "d") {
      director = user;
      return;
    }
  });

  const [formData, setFormData] = useState({
    code: "",
    firm_expense_id: firm_expense_id.id
  });

  const queryClient = useQueryClient();
  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name == "code" && value.length > 5) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation(
    async () => {
      return firmsExpenseVerifyPostAction(
        cleanedData({
          ...formData,
          code: Number(formData.code)
        }),
        setShowModal,
        isLeader,
        mutationAccount,
        setDataModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("expenses_to_firm"); // Ma'lumotlarni yangilash
      }
    }
  );

  const mutationAccount = useMutation(async ({ price }) => {
    return accountsExpensesPostAction(
      cleanedData({
        ...formData,
        from_user: director.id,
        to_pharmacy: getData.to_pharmacy,
        shift: getData.shift,
        report_date: getData.report_date,
        transfer_type: naxt,
        expense_type: xodim,
        price
      }),
      setShowModal
    );
  });

  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  const { t: m } = useTranslation("translation", { keyPrefix: "Modal" });
  const { t: r } = useTranslation("translation", { keyPrefix: "Reports" });
  const handleSubmit = () => {
    if (!formData.code || formData.code.length < 5) {
      toast.warning(g(42));
      return;
    }
    mutation.mutate();
  };
  return (
    <ModalSimple
      showModal={showModal}
      setShowModal={setShowModal}
      title={r(15)}
    >
      <div className="modal-body">
        <h5>
          {g(5)}{" "}
          <span className="mx-2 text-muted">
            {firm_expense_id.verified_phone_number}
          </span>
        </h5>
        <hr />
        <h5>
          {m(18)}{" "}
          <span className="mx-2 text-muted">
            {firm_expense_id.verified_firm_worker_name}
          </span>
        </h5>
        <hr />
        <h5>
          {g(4)}{" "}
          <span className="mx-2 text-muted">
            {firm_expense_id.to_firm_name}
          </span>
        </h5>
        <hr />
        <h5>
          {g(80)}{" "}
          <span className="mx-2 text-muted">
            {formatNumber(firm_expense_id.price)}
          </span>
        </h5>
        <hr />

        <h5>
          {g(94)}{" "}
          <span className="mx-2 text-muted">
            {firm_expense_id.transfer_type == xisob_raqam
              ? g(96)
              : firm_expense_id.from_user_name != null
                ? g(95)
                : firm_expense_id.from_user_price != 0 ? g(121) : g(61)}
          </span>
        </h5>
        <hr />

        {/* CODE */}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control bg-light"
            placeholder={g(43)}
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <label htmlFor="code">
            {g(43)} <b className="text-danger">*</b>
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <div className="d-grid d-flex justify-content-evenly col-12 ">
          <button
            className="btn btn-primary rounded-3 col-5 col-md-4 py-2"
            style={{ background: "red" }}
            onClick={() => setShowModal(false)}
          >
            {g(44)}
          </button>
          <button
            className="btn btn-primary rounded-3 col-5 col-md-4 py-2"
            style={{ background: "var(--blue)" }}
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading
              ? <i className="fa fa-spinner fa-spin" />
              : r(15)}
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default ViewModal;
