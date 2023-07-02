import React, { useEffect, useState } from "react";
import {
  formatNumber,
  totalMoney,
} from "../../../../functions/NecessaryFunctions";
import { useQuery } from "react-query";
import { pharmaciesInComesGetAPI } from "../../../../api/DirectorRequest";
import { receiptGetAPI } from "../../../../api/GlobalRequest";
import AddQR from "./AddQR";

const Receipts = ({ getData }) => {
  const [qr_price, setQRPrice] = useState({ price: 0 });
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
      }
    }
  }, [isLoading, receipt]);

  const { data: incomes, error } = useQuery("incomes", async () => {
    return await pharmaciesInComesGetAPI({
      report_date: getData.report_date,
      shift: getData.shift,
      to_pharmacy: getData.to_pharmacy,
    });
  });
  if (errorReceipt) return `Error: ${errorReceipt.message}`;
  if (error) return `Error: ${error.message}`;

  let total = 0;

  if (incomes && incomes.data) {
    total = totalMoney(incomes.data.results);
  }
  return (
    <>
      {qrModal && (
        <AddQR
          showModal={qrModal}
          setShowModal={setQRModal}
          getData={getData}
          qr_price={qr_price}
          total={total}
        />
      )}
      <div className="d-flex align-items-center gap-2">
        <div>
          <p className="px-1 m-0" style={{ color: "var(--text_color_blue)" }}>
            Chek berilmagan
          </p>
          <p className="bg_c px-md-5 px-2 cursor_pointer" onClick={() => setQRModal(!qrModal)}>
            <span>
              <b>{formatNumber(qr_price.price)}</b>.0
            </span>{" "}
            UZS
          </p>
        </div>
        <div>
          <p className="px-1 m-0" style={{ color: "var(--text_color_blue)" }}>
            Chek berilgan
          </p>
          <p className="bg_c px-md-5 px-2">
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
