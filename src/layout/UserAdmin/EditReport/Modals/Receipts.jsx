import React, { useEffect, useState } from "react";
import {
  formatNumber,
} from "../../../../functions/NecessaryFunctions";
import { useQuery } from "react-query";
import { receiptGetAPI } from "../../../../api/GlobalRequest";
import AddQR from "./AddQR";

const Receipts = ({ getData, total }) => {
  const [qr_price, setQRPrice] = useState({ price: 0 });
  const [check_qr_price, setCheckQRPrice] = useState(false);
  const [qrModal, setQRModal] = useState(false);

  const {
    data: receipt,
    isLoading,
    error: errorReceipt,
  } = useQuery({
    queryKey: [
      "receipts",
      getData.report_date,
      getData.shift,
      getData.to_pharmacy,
    ],
    queryFn: async () => {
      return await receiptGetAPI({
        report_date: getData.report_date,
        shift: getData.shift,
        pharmacy: getData.to_pharmacy,
      });
    },
  });
  useEffect(() => {
    if (receipt && receipt.data) {
      if (receipt.data.results.length != 0) {
        setQRPrice(receipt.data.results[0]);
        setCheckQRPrice(true);
      }
    }
  }, [isLoading, receipt]);

 
  if (errorReceipt) return `Error: ${errorReceipt.message}`;

 
  return (
    <>
      {qrModal && (
        <AddQR
          showModal={qrModal}
          setShowModal={setQRModal}
          getData={getData}
          qr_price={qr_price}
          check_qr_price={check_qr_price}
          total={total}
        />
      )}
      <div className="d-flex align-items-center gap-2">
        <div>
          <p className="bg_c cursor_pointer" onClick={() => setQRModal(!qrModal)}>
            Chek berilmagan:{" "}
            <span>
              <b>{formatNumber(qr_price.price)}</b>.0
            </span>{" "}
            UZS
          </p>
          
        </div>
        <div>
          <p className="bg_c">
            Chek berilgan:{" "}
            <span>
              <b>{formatNumber(total - qr_price.price)}</b>.0
            </span>{" "}
            UZS
          </p>
         
        </div>
      </div>
    </>
  );
};

export default Receipts;
