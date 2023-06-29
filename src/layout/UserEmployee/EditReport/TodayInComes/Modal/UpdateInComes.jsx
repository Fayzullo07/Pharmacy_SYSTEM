import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { naxt, transfersWorker } from "../../../../../api";
import { cleanedData } from "../../../../../functions/NecessaryFunctions";
import { pharmacyInComesPatchAction } from "../../../../../functions/DirectorActions";
import Modal from "../../../../../utils/Modal";

const UpdateInComes = (props) => {
  const { showModal, setShowModal, deteils, data } = props;
  const [fromClick, setFromClick] = useState(
    data.transfer_type == naxt ? false : true
  );
  const [moveMoney, setMoveMoney] = useState(
    data.transfer_type == 3 ? true : false
  );
  const [input1, setInput1] = useState(
    data.transfer_type == naxt ? naxt : "naxt_siz"
  );
  const [formData, setFormData] = useState({
    price: data.price,
    desc: data.desc,
    transfer_type: data.transfer_type,
    to_user: data.to_user,
  });

  const handleInputChange = (e) => {
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
          transfer_type: input1 == naxt ? naxt : formData.transfer_type,
        }),
        setShowModal
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("incomes"); // Ma'lumotlarni yangilash
      },
    }
  );

  const handleSubmit = () => {
    if (!input1) {
      toast.warning("Pul turini tanlang!");
      return;
    }
    if (input1 == "naxt_siz" && formData.transfer_type == 1) {
      toast.warning("O'tkazma turini tanlang!");
      return;
    }

    if (
      (formData.transfer_type == 3 && formData.to_user == null) ||
      formData.to_user == ""
    ) {
      toast.warning("Kimga o'tkazildi tanlang!");
      return;
    }

    if (formData.price < 100) {
      toast.warning("Eng kam summa 100 somdan ko'p bo'lish kerak!");
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
            onChange={(e) => {
              setInput1(e.target.value);
              if (e.target.value == "naxt_siz") {
                setFromClick(true);
              } else {
                setFromClick(false);
              }
            }}
            disabled
          >
            <option value="">Pul turini tanlang . . .</option>
            <option value={naxt}>NAXT</option>
            <option value="naxt_siz">NAXT PULSIZ</option>
          </select>
          <label htmlFor="transfer_typ">
            Pul turini tanlang <b className="text-danger">*</b>
          </label>
        </div>

        <div className="row">
          <div className="col-md-6">
            {fromClick && (
              // TUSHUP TURINI TANLANG
              <div className="form-floating">
                <select
                  className="form-select mb-3 bg-light"
                  id="transfer_type"
                  name="transfer_type"
                  value={formData.transfer_type}
                  onChange={(e) => {
                    if (e.target.value == 3) {
                      setMoveMoney(true);
                    } else {
                      setMoveMoney(false);
                    }
                    handleInputChange(e);
                  }}
                  disabled
                >
                  <option value="">O'tkazma turini tanlang . . .</option>
                  {transfersWorker.map((transfer) => (
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
          </div>
          <div className="col-md-6">
            {fromClick && (
              // CLICK KIMGA TASHLANADI
              <div className="form-floating">
                <select
                  className="form-select mb-3 bg-light"
                  id="to_user"
                  name="to_user"
                  value={formData.to_user}
                  onChange={handleInputChange}
                  disabled={!moveMoney}
                >
                  {moveMoney && (
                    <option value="">Kimga o'tkazildi . . .</option>
                  )}
                  {!moveMoney && (
                    <option value="" selected={!moveMoney}>
                      Xisob raqam
                    </option>
                  )}

                  {moveMoney &&
                    deteils.employees.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                </select>
                <label htmlFor="to_user">
                  Kimga o'tkazildi <b className="text-danger">*</b>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* MONEY INCOMES*/}
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Miqdor"
            id="price"
            name="price"
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
    </Modal>
  );
};

export default UpdateInComes;
