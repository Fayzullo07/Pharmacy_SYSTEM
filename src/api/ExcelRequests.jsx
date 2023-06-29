import axios from "axios";
const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: URL });

const config = {
  responseType: "blob",
  headers: {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.access,
  },
};

// DOWNLOAD
export const reportsPharmacyExcelAPI = async ({
  pharmacy = "",
  year = "",
  month = "",
}) =>
  API.get(
    `/pharmacies/reports/downloads/excel/?pharmacy=${pharmacy}&report_date__year=${year}&report_date__month=${month}`,
    config
  );

// GET BY DAY DOWNLOAD EXCEL
export const pharmaciesExpensesReportDayExcelGetAPI = async ({
  year = "",
  month = "",
  pharmacy = "",
  expense_type = "",
}) =>
  API.get(
    `/pharmacies/expenses/reports/downloads/excel/?report_date__year=${year}&report_date__month=${month}&from_pharmacy=${pharmacy}&expense_type=${expense_type}`,
    config
  );

// // GET BY MONTH
// export const pharmaciesExpensesReportMonthExcelGetAPI = async ({ year = "", pharmacy = "", expense_type = "" }) =>
//     API.get(`/pharmacies/expenses/reports/months/downloads/excel/?year=${year}&pharmacy=${pharmacy}&expense_type=${expense_type}`, config)

// GET BY DAY
export const accountReportDayExcelGetAPI = async ({
  year = "",
  month = "",
  pharmacy = "",
  worker = "",
}) =>
  API.get(
    `/accounts/reports/downloads/excel/?report_date__year=${year}&report_date__month=${month}&pharmacy=${pharmacy}&worker=${worker}`,
    config
  );

// GET BY MONTH
export const accountReportMonthExcelGetAPI = async ({
  year = "",
  pharmacy = "",
  worker = "",
}) =>
  API.get(
    `/accounts/reports/months/downloads/excel/?year=${year}&pharmacy=${pharmacy}&worker=${worker}`,
    config
  );

// GET BY DAY
export const QR_CODE_ReportDayExcelGetAPI = async ({
  year = "",
  month = "",
  pharmacy = "",
}) =>
  API.get(
    `/pharmacies/incomes/reports/days/downloads/excel/?report_date__year=${year}&report_date__month=${month}&pharmacy=${pharmacy}`,
    config
  );
