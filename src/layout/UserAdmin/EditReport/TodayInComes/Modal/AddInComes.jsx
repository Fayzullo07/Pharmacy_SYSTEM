import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Naqd, Naqd_siz, naxt, transfersWorker } from "../../../../../api";
import { toast } from "react-toastify";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { pharmacyInComesPostAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";
import NumberInput from "../../../../../ui/NumberInput";
import Textarea from "../../../../../ui/Textarea";
import { useTranslation } from "react-i18next";

const AddInComes = props => {
  const { showModal, setShowModal, deteils, getData } = props;
  const [fromClick, setFromClick] = useState(false);
  const [moveMoney, setMoveMoney] = useState(false);
  const [input1, setInput1] = useState("");
  const [formData, setFormData] = useState({
    price: "",
    desc: "",
    transfer_type: naxt,
    to_user: null,
    to_pharmacy: getData.to_pharmacy,
    report_date: getData.report_date,
    shift: getData.shift
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
      return pharmacyInComesPostAction(
        cleanedData({
          ...formData,
          to_user:
            formData.transfer_type != "c" || input1 == naxt
              ? null
              : formData.to_user,
          transfer_type:
            input1 == naxt
              ? naxt
              : formData.transfer_type == "c" ? 3 : formData.transfer_type
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
      (formData.transfer_type == "c" && formData.to_user == null) ||
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
      title={"Tushumlar"}
    >
      <div className="modal-body">
        {/* TUSHUM TURINI TANLANG */}
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
            <option value="">{g(107)} . . .</option>
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
                    if (e.target.value == "c") {
                      setMoveMoney(true);
                    } else {
                      setMoveMoney(false);
                    }
                    handleInputChange(e);
                  }}
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
                  disabled={!moveMoney}
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

export default AddInComes;
