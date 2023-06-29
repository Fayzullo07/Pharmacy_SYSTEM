import { useState } from "react";
import * as ExcelAPI from "../api/ExcelRequests";

// -----------------------DOWNLOADS---------------------------

export const ReportsPharmacyExcelDownload = ({ pharmacy, year, month }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    try {
      const response = await ExcelAPI.reportsPharmacyExcelAPI({
        pharmacy,
        year,
        month,
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Xatolik yuz berdi: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-success mx-2"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <i className="fa fa-spinner fa-spin" />
        ) : (
          <i className="fa fa-download"></i>
        )}
      </button>
    </div>
  );
};

export const PharmaciesExpensesReportDayExcelGetDownload = ({
  year,
  month,
  pharmacy,
  expense_type,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    try {
      const response = await ExcelAPI.pharmaciesExpensesReportDayExcelGetAPI({
        year,
        month,
        pharmacy,
        expense_type,
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Xatolik yuz berdi: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-success mx-2"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <i className="fa fa-spinner fa-spin" />
        ) : (
          <i className="fa fa-download"></i>
        )}
      </button>
    </div>
  );
};

export const AccountReportDayExcelGetDownload = ({
  year,
  month,
  pharmacy,
  worker,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    try {
      const response = await ExcelAPI.accountReportDayExcelGetAPI({
        year,
        month,
        pharmacy,
        worker,
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Xatolik yuz berdi: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-success mx-2"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <i className="fa fa-spinner fa-spin" />
        ) : (
          <i className="fa fa-download"></i>
        )}
      </button>
    </div>
  );
};

export const AccountReportMonthExcelGetDownload = ({
  year,
  pharmacy,
  worker,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    try {
      const response = await ExcelAPI.accountReportMonthExcelGetAPI({
        year,
        pharmacy,
        worker,
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Xatolik yuz berdi: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-success mx-2"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <i className="fa fa-spinner fa-spin" />
        ) : (
          <i className="fa fa-download"></i>
        )}
      </button>
    </div>
  );
};

export const QR_CODE_ReportDayExcelGetDownload = ({
  year,
  month,
  pharmacy,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async () => {
    try {
      const response = await ExcelAPI.QR_CODE_ReportDayExcelGetAPI({
        year,
        month,
        pharmacy,
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Xatolik yuz berdi: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-success mx-2"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <i className="fa fa-spinner fa-spin" />
        ) : (
          <i className="fa fa-download"></i>
        )}
      </button>
    </div>
  );
};
