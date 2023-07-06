import React, { useState } from "react";
import {
  receiptsPatchAction,
  receiptsPostAction
} from "../../../../functions/GlobalActions";
import { useMutation, useQueryClient } from "react-query";
import { cleanedData } from "../../../../functions/NecessaryFunctions";
import ModalSimple from "../../../../utils/ModalSimple";
import { toast } from "react-toastify";

const AddQR = ({
  showModal,
  setShowModal,
  getData,
  qr_price,
  total,
  check_qr_price
}) => {
  const [qr, setQR] = useState(qr_price.price);

  const queryClient = useQueryClient();
  const mutationPost = useMutation(
    async () => {
      return receiptsPostAction(
        cleanedData({
          price: qr,
          report_date: getData.report_date,
          shift: getData.shift,
          pharmacy: getData.to_pharmacy
        })
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("receipts");
        setShowModal(false);
      }
    }
  );

  const mutationPatch = useMutation(
    async () => {
      return receiptsPatchAction(
        qr_price.id,
        cleanedData({
          price: qr
        })
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("receipts");
        setShowModal(false);
      }
    }
  );

  const handleSubmit = () => {
    if (total < qr) {
      toast.warning("Tushumdan ko'p summa mumkunemas!");
      return;
    }
    if (check_qr_price == false) {
      mutationPost.mutate();
    } else {
      mutationPatch.mutate();
    }
  };
  return (
    <ModalSimple showModal={showModal} setShowModal={setShowModal}>
      <div className="col d-flex flex-column justify-content-center">
        <h6 className="my-2 text-white">Chek berilmagan</h6>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control back_a"
            placeholder="0 UZS"
            value={qr}
            onChange={e => {
              if (e.target.value.length > 9) {
                return;
              }
              setQR(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{ background: "var(--blue)" }}
            onClick={handleSubmit}
            disabled={mutationPatch.isLoading || mutationPost.isLoading}
          >
            {mutationPatch.isLoading || mutationPost.isLoading
              ? <i className="fa fa-spinner fa-spin" />
              : "Saqlash"}
          </button>
        </div>
      </div>
    </ModalSimple>
  );
};

export default AddQR;
