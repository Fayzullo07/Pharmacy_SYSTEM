import axios from "axios";
const URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API = axios.create({ baseURL: URL });

const config = {
  headers: {
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.access,
  },
};

// ----------------------------------------FIRMS-----------------------------
// GET
export const firmReportGetAPI = async ({
  report_date__gte = "",
  report_date__lte = "",
  pharmacy_id = "",
  firm_id = "",
  page = 1,
  year = "",
  month = "",
}) =>
  API.get(
    `/firms/reports/?report_date__gte=${report_date__gte}&report_date__lte=${report_date__lte}&pharmacy=${pharmacy_id}&firm=${firm_id}&page=${page}&report_date__year=${year}&report_date__month=${month}`,
    config
  );

// DOWNLOAD
export const firmReportExcelGetAPI = async ({
  report_date__gte = "",
  report_date__lte = "",
  pharmacy_id = "",
  firm_id = "",
  page = 1,
  year = "",
  month = "",
}) =>
  API.get(
    `/firms/reports/?report_date__gte=${report_date__gte}&report_date__lte=${report_date__lte}&pharmacy=${pharmacy_id}&firm=${firm_id}&page=${page}&report_date__year=${year}&report_date__month=${month}`,
    config
  );

export const firmReportMonthAPI = async ({
  year = "",
  month = "",
  firm = "",
  pharmacy = "",
}) =>
  API.get(
    `/firms/reports/months/?year=${year}&month=${month}&firm=${firm}&pharmacy=${pharmacy}`,
    config
  );

// --------------------------------------REPORT QR CODE TRADE ------------------------------------
// GET BY MONTH
export const QR_CODE_ReportMonthGetAPI = async ({ year = "", pharmacy = "" }) =>
  API.get(
    `/pharmacies/incomes/reports/months/?year=${year}&pharmacy=${pharmacy}`,
    config
  );

// GET BY DAY
export const QR_CODE_ReportDayGetAPI = async ({
  year = "",
  month = "",
  pharmacy = "",
}) =>
  API.get(
    `/pharmacies/incomes/reports/days/?report_date__year=${year}&report_date__month=${month}&pharmacy=${pharmacy}`,
    config
  );

// --------------------------------------REPORT DISCOUNT ------------------------------------
// GET BY MONTH
export const discountReportMonthGetAPI = async ({ year = "", pharmacy = "" }) =>
  API.get(
    `/pharmacies/expenses/reports/discounts/months/?year=${year}&pharmacy=${pharmacy}`,
    config
  );

// GET BY DAY
export const discountReportDayGetAPI = async ({
  year = "",
  month = "",
  pharmacy = "",
}) =>
  API.get(
    `/pharmacies/expenses/reports/discounts/?report_date__year=${year}&report_date__month=${month}&from_pharmacy=${pharmacy}`,
    config
  );

// --------------------------------------REPORT DISCOUNT ------------------------------------
// GET BY MONTH
export const returnReportMonthGetAPI = async ({
  year = "",
  pharmacy = "",
  expense_type = "",
}) =>
  API.get(
    `/pharmacies/expenses/reports/months/?year=${year}&pharmacy=${pharmacy}&expense_type=${expense_type}`,
    config
  );

// GET BY DAY
export const returnReportDayGetAPI = async ({
  year = "",
  month = "",
  pharmacy = "",
  page = 1,
  expense_type = "",
}) =>
  API.get(
    `/pharmacies/expenses/reports/?report_date__year=${year}&report_date__month=${month}&from_pharmacy=${pharmacy}&page=${page}&expense_type=${expense_type}`,
    config
  );

// GET BY DAY
export const accountReportDayGetAPI = async ({
  year = "",
  month = "",
  pharmacy = "",
  page = 1,
  worker = "",
}) =>
  API.get(
    `/accounts/reports/?report_date__year=${year}&report_date__month=${month}&pharmacy=${pharmacy}&page=${page}&worker=${worker}`,
    config
  );

// GET BY MONTH
export const accountReportMonthGetAPI = async ({
  year = "",
  pharmacy = "",
  worker = "",
}) =>
  API.get(
    `/accounts/reports/months/?year=${year}&pharmacy=${pharmacy}&worker=${worker}`,
    config
  );

export const accountsGetAPI = async ({ role = "", pharmacy = "" }) =>
  API.get(`/accounts/?role=${role}&pharmacy=${pharmacy}`, config);
